import supabase from '../client';

export interface Post {
  id?: number | string;
  username: string;
  npo: string;
  city: string;
  state: string;
  text: string;
  image: string | null;
  likeCount: number;
}

type DbRow = Record<string, unknown>;

function firstNonEmptyString(row: DbRow, keys: string[]): string | null {
  for (const key of keys) {
    const val = row[key];
    if (typeof val === 'string' && val.trim() !== '') return val;
  }
  return null;
}

function firstNumber(row: DbRow, keys: string[]): number | null {
  for (const key of keys) {
    const val = row[key];
    if (typeof val === 'number' && Number.isFinite(val)) return val;
    if (typeof val === 'bigint') return Number(val);
  }
  return null;
}

function firstNullableString(row: DbRow, keys: string[]): string | null {
  for (const key of keys) {
    const val = row[key];
    if (val === null) return null;
    if (typeof val === 'string') return val;
  }
  return null;
}

function normalizePost(row: DbRow): Post {
  const username =
    firstNonEmptyString(row, ['username', 'user_name', 'userName', 'user']) ??
    '';
  const npo =
    firstNonEmptyString(row, [
      'npo',
      'npo_name',
      'npoName',
      'organization',
      'org',
      'nonprofit',
    ]) ?? '';

  // Some schemas store location separately (e.g. via location_id). Allow blank.
  const city =
    firstNonEmptyString(row, ['city', 'location_city', 'locationCity']) ?? '';
  const state =
    firstNonEmptyString(row, ['state', 'location_state', 'locationState']) ??
    '';
  const text =
    firstNonEmptyString(row, [
      'text',
      'post_text',
      'postText',
      'caption',
      'content',
      'body',
    ]) ?? '';
  const image = firstNullableString(row, [
    'image',
    'image_url',
    'imageUrl',
    'image_link',
    'imageLink',
    'image_ink', // seen in some schemas / typos
  ]);
  const likeCount =
    firstNumber(row, [
      'like_count',
      'likeCount',
      'likes',
      'likecount',
      'num_like',
      'numLike',
      'num_ike', // seen in some schemas / typos
    ]) ?? 0;

  // If core fields are missing, fail loudly with helpful schema info.
  // Location is optional (it may live in another table).
  if (!username || !npo || !text) {
    const keys = Object.keys(row).sort().join(', ');
    throw new Error(
      `Posts table columns don't match expected schema. ` +
        `Missing one of: username, npo, text. ` +
        `Found columns: ${keys}`,
    );
  }

  const id = (row.id as Post['id']) ?? (row.post_id as Post['id']) ?? undefined;

  return { id, username, npo, city, state, text, image, likeCount };
}

export async function getAllPosts(): Promise<Post[]> {
  // Different projects sometimes name the table `Posts` vs `posts`.
  // Try both so the app works without you having to rename DB tables.
  const attempt1 = await supabase.from('Posts').select('*');
  if (!attempt1.error) {
    const rows = (attempt1.data ?? []) as DbRow[];
    return rows.map(normalizePost);
  }

  const attempt2 = await supabase.from('posts').select('*');
  const { data, error } = attempt2;

  if (error) {
    throw new Error(
      `Error fetching data: ${error.message} (tried tables: Posts, posts)`,
    );
  }

  const rows = ((data ?? []) as DbRow[]).map(normalizePost);
  return rows;
}
