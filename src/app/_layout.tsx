import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import BpIcon from '../../assets/bp-icon.svg';

function HeaderTitle() {
  return (
    <View style={styles.headerContainer}>
      <BpIcon style={styles.logo} />
      <Text style={styles.headerText}>
        <Text style={styles.blueprint}>blueprint</Text> volunteers
      </Text>
    </View>
  );
}

function StackLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: true,
            headerTitle: () => <HeaderTitle />,
            headerStyle: {
              backgroundColor: '#fafafa',
            },
            headerShadowVisible: true,
          }}
        />
      </Stack>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 25,
    height: 26,
    marginRight: 16,
  },
  headerText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: -0.07,
    color: '#262626',
    lineHeight: 18,
  },
  blueprint: {
    color: '#0078e8',
  },
});

export default StackLayout;
