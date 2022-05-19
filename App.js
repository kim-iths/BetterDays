import { BottomTabView, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import images from './src/config/images'
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import HistoryScreen from './src/screens/HistoryScreen/HistoryScreen';
import ProfileScreen from './src/screens/ProfileScreen/ProfileScreen';
import colors from './src/config/colors';
import HomeStackScreen from './src/screens/HomeStackScreen/HomeStackScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './src/screens/TabNavigation/TabNavigation';
import EvaluateDayScreen from './src/screens/EvaluateDayScreen/EvaluateDayScreen';

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Tab" component={TabNavigation} options={{ headerShown: false }}/>
        <Stack.Screen name="Evaluate day" component={EvaluateDayScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
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
