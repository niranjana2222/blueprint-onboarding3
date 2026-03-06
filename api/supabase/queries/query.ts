import supabase from '../client';

export interface Post {
  id: number | string;
  user_name: string;
  npo_name: string;
  post_text: string;
  image_ink?: string | null;
  image_link?: string | null;
  num_ike: number;
}

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase.from('Posts').select('*');

  if (error) {
    throw new Error(`Error fetching data: ${error.message}`);
  }

  return data ?? [];
}
