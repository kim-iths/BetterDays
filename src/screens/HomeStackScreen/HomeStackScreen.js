import { TouchableNativeFeedback, Text, View, Image } from 'react-native'
import styles from './styles'
import React from 'react'
import images from '../../config/images'
import colors from '../../config/colors'
import HomeScreen from '../HomeScreen/HomeScreen'
import EvaluateDayScreen from '../EvaluateDayScreen/EvaluateDayScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="Evaluate day" component={EvaluateDayScreen} />
    </HomeStack.Navigator>
  )
}

export default HomeStackScreen