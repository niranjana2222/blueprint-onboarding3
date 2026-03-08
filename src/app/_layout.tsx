import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import BpIcon from '../../assets/bp-icon.svg';

function HeaderTitle() {
  return (
    <View style={styles.headerContainer}>
      <BpIcon width={22} height={22} />
      <Text style={styles.headerText}>
        <Text style={styles.blueprint}>blueprint</Text> volunteers
      </Text>
    </View>
  );
}

export default function StackLayout() {
  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerTitle: () => <HeaderTitle />,
            headerStyle: {
              backgroundColor: '#ffffff',
            },
            headerShadowVisible: false,
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
    gap: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#262626',
  },
  blueprint: {
    color: '#0078e8',
  },
});
