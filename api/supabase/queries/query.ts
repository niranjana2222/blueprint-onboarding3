import supabase from '../client';

export interface Post {
  id?: number;
  username: string;
  npo: string;
  city: string;
  state: string;
  text: string;
  image: string | null;
  like_count: number;
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase.from('Posts').select('*');

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return data as Post[];
}
