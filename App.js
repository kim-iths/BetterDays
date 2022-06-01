import { NavigationContainer } from '@react-navigation/native';
import images from './src/config/images'
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigation from './src/screens/TabNavigation/TabNavigation';
import EvaluateDayScreen from './src/screens/EvaluateDayScreen/EvaluateDayScreen';
import SettingsScreen from './src/screens/SettingsScreen/SettingsScreen.js';
import { EvaluatedDaysContextProvider } from './src/config/EvaluatedDaysContext';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <EvaluatedDaysContextProvider>
        <Stack.Navigator>
          <Stack.Screen name="Tab" component={TabNavigation} options={{ headerShown: false }} />
          <Stack.Screen name="Evaluate day" component={EvaluateDayScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </EvaluatedDaysContextProvider>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
