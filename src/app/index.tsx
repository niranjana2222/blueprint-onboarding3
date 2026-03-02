import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CommentsIcon from '../../assets/comments-icon.svg';
import HeartIcon from '../../assets/heart-icon.svg';
import ShareIcon from '../../assets/messenger-icon.svg';
import ProfilePlaceholder from '../../assets/profile-placeholder-icon.svg';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView>
          <ProfilePlaceholder width={24} height={24} />
          <Text>etam3 at Mission Bit</Text>
          <Text>San Francisco, CA</Text>

          <Text>
            Image Link:
            https://cdn.britannica.com/51/178051-050-3B786A55/San-Francisco.jpg
          </Text>

          <Text>
            This past weekend, I taught at Mission Bit. I was working with a
            group of high school students who were building their first web
            pages. I really enjoyed being able to help guide 10 students on
            learning CS fundamentals through a project! They were all really
            eager to learn, and I'm glad I signed up. Highly recommend to any
            other software engineers interested in volunteering! Sign-up here:
            https://missionbit.org/get-involved/volunteer-with-us/
          </Text>

          <Text>3 Likes</Text>
          <Text>View 2 Comments</Text>
          <HeartIcon width={24} height={24} />
          <CommentsIcon width={24} height={24} />
          <ShareIcon width={24} height={24} />

          <Text>February 1</Text>

          <ProfilePlaceholder width={24} height={24} />
          <Text>carolyn123 at Boys and Girls Club</Text>
          <Text>Oakland, CA</Text>
          <Text>I recently volunteered at my local Boys and Girls Club!</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
  },
  content: {
    width: '100%',
    height: '100%',
    backgroundColor: '#ffffff',
    position: 'relative',
    borderWidth: 1,
    borderColor: 'black',
  },
});
