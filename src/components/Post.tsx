import { Image, StyleSheet, Text, View } from 'react-native';
import CommentsIcon from '../../assets/comments-icon.svg';
import HeartIcon from '../../assets/heart-icon.svg';
import ShareIcon from '../../assets/messenger-icon.svg';
import ProfilePlaceholder from '../../assets/profile-placeholder-icon.svg';

export interface PostProps {
  username: string;
  npo: string;
  city: string;
  state: string;
  text: string;
  image: string | null;
  likeCount: number;
}

export default function Post({
  username,
  npo,
  city,
  state,
  text,
  image,
  likeCount,
}: PostProps) {
  const location = `${city}, ${state}`;

  return (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <ProfilePlaceholder width={36} height={36} />
        <View style={styles.userInfo}>
          <Text style={styles.username}>
            {username} at {npo}
          </Text>
          <Text style={styles.location}>{location}</Text>
        </View>
      </View>

      {image ? (
        <Image source={{ uri: image }} style={styles.postImage} />
      ) : null}

      <Text style={styles.caption}>{text}</Text>

      <View style={styles.statsRow}>
        <Text style={styles.statsText}>{likeCount} likes</Text>
        <Text style={styles.statsText}>View comments</Text>
      </View>

      <View style={styles.iconRow}>
        <HeartIcon width={24} height={24} />
        <CommentsIcon width={24} height={24} />
        <ShareIcon width={24} height={24} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  postCard: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  userInfo: {
    marginLeft: 12,
  },
  username: {
    fontWeight: '600',
    fontSize: 14,
    color: '#262626',
  },
  location: {
    fontSize: 12,
    color: '#8e8e8e',
    marginTop: 2,
  },
  postImage: {
    width: '100%',
    height: 220,
  },
  caption: {
    paddingHorizontal: 16,
    paddingTop: 12,
    fontSize: 14,
    color: '#262626',
    lineHeight: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginTop: 12,
  },
  statsText: {
    fontSize: 13,
    color: '#8e8e8e',
  },
  iconRow: {
    flexDirection: 'row',
    gap: 20,
    paddingHorizontal: 16,
    marginTop: 12,
  },
});
