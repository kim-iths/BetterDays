import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import images from './src/config/images'
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HomeScreen from './src/screens/HomeScreen/HomeScreen';
import HistoryScreen from './src/screens/HistoryScreen/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import colors from './src/config/colors';

const Tab = createBottomTabNavigator()
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let icon

          switch (route.name) {
            case "Home":
              icon = focused ? images.homeFilled : images.home
              break
            case "History":
              icon = images.history
              break
            case "Profile":
              icon = focused ? images.personFilled : images.person
              break
          }

          return <Image source={icon}
            style={{
              width: size, 
              height: size,
              tintColor: focused ? colors.COLOR_PRIMARY_1_DARK_2 : colors.COLOR_PRIMARY_1_DARK }} />
        },
        tabBarActiveTintColor: colors.COLOR_PRIMARY_1_DARK_2,
        tabBarInactiveTintColor: colors.COLOR_PRIMARY_1_DARK,

      })}>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>

    // <View style={styles.container}>
    //   {/* <Text>Open up App.js to start working on your app!</Text> */}
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
