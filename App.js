import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import images from './src/config/images'
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './src/screens/TabNavigation/TabNavigation';
import EvaluateDayScreen from './src/screens/EvaluateDayScreen/EvaluateDayScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator()

export default function App() {

  useEffect(() => {

    // AsyncStorage.getAllKeys((keys) => {
    //   if(keys) console.log(keys)

    // })

    let date = "2022-05-21"
    let note = "Jag åt en äcklig smörgås med kaviar på. Usch för i helvete vad äckligt det var, rekommenderas ej."
    let points = { "12:00": 5, "13:00": 5, "15:00": 5, "20:00": 10 }
    let obj = { note: note, points: points }

    AsyncStorage.setItem(date, JSON.stringify(obj))



  }, [])

  return (
    <NavigationContainer >
      <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="Tab" component={TabNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Evaluate day" component={EvaluateDayScreen} />
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
