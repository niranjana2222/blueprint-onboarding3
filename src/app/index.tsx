import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { getAllPostsWithDetails } from '~/api/supabase/queries/query';
import Post from '../components/Post';

export default function App() {
  const [postData, setPostData] = useState<Awaited<
    ReturnType<typeof getAllPostsWithDetails>
  > | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPostData() {
      try {
        const data = await getAllPostsWithDetails();
        setPostData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch posts');
      }
    }

    fetchPostData();
  }, []);

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (postData === null) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (postData.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>No posts yet</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {postData.map((post, index) => (
        <View key={post.key ?? index}>
          <Post
            username={post.username}
            npo={post.npo}
            city={post.city}
            state={post.state}
            text={post.text}
            image={post.image}
            likeCount={post.likeCount}
          />
          {index < postData.length - 1 && <View style={styles.divider} />}
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fafafa',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fafafa',
  },
  loadingText: {
    fontSize: 16,
    color: '#8e8e8e',
  },
  errorText: {
    fontSize: 16,
    color: '#e74c3c',
    paddingHorizontal: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e6e6e6',
  },
});
