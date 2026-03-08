import supabase from '../client';

export interface Post {
  id: number | string;
  user_name: string;
  npo_name: string;
  post_text: string;
  image_ink?: string | null;
  image_link?: string | null;
  location_id?: number | string;
  num_ike?: number;
  num_likes?: number;
  created_at?: string;
}

export interface Location {
  id: number | string;
  city_name: string;
  state_abbr: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase.from('Posts').select('*');

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return data ?? [];
}

export async function getAllLocations(): Promise<Location[]> {
  const { data, error } = await supabase.from('Locations').select('*');

  if (error) {
    throw error;
  }

  return data ?? [];
}

export interface PostComment {
  post_id: number | string;
  user_name: string;
  comment_text: string;
  num_likes: number;
}

export async function getAllComments(): Promise<PostComment[]> {
  const { data, error } = await supabase.from('comments').select('*');

  if (error) {
    throw new Error(`Error fetching comments: ${error.message}`);
  }

  return data ?? [];
}

export interface PostProps {
  key: number | string;
  username: string;
  npo: string;
  city: string;
  state: string;
  text: string;
  image: string | null;
  likeCount: number;
  postDate?: string;
  comments?: Array<{ username: string; text: string; likeCount: number }>;
}

export async function getAllPostsWithDetails(): Promise<PostProps[]> {
  try {
    const [posts, locations, comments] = await Promise.all([
      getAllPosts(),
      getAllLocations().catch(() => []),
      getAllComments().catch(() => []),
    ]);

    const locationMap = new Map(locations.map(loc => [loc.id, loc]));

    const commentsByPostId = comments.reduce(
      (postIdToCommentsMap, comment) => {
        const id = comment.post_id;
        if (!postIdToCommentsMap[id]) postIdToCommentsMap[id] = [];
        postIdToCommentsMap[id].push(comment);
        return postIdToCommentsMap;
      },
      {} as Record<number | string, PostComment[]>,
    );

    return posts.map(post => {
      const postTyped = post as Post & {
        location_id?: number;
        created_at?: string;
      };
      const location = locationMap.get(
        postTyped.location_id as number | string,
      );
      const postComments = commentsByPostId[post.id] || [];
      const dateInput = postTyped.created_at;

      const date = new Date(dateInput ?? 0);

      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
      });

      return {
        key: post.id,
        username: post.user_name,
        npo: post.npo_name,
        city: location?.city_name ?? 'Unknown City',
        state: location?.state_abbr ?? 'Unknown State',
        text: post.post_text,
        image: post.image_link ?? null,
        likeCount: post.num_likes ?? post.num_ike ?? 0,
        postDate: formattedDate,
        comments: postComments.map(c => ({
          username: c.user_name,
          text: c.comment_text,
          likeCount: c.num_likes,
        })),
      };
    });
  } catch (error) {
    console.error('Failed to fetch data:', error);
    return [];
  }
}
