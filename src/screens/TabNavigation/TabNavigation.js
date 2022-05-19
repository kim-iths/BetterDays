import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../HomeScreen/HomeScreen'
import HistoryScreen from '../HistoryScreen/HistoryScreen'
import ProfileScreen from '../ProfileScreen/ProfileScreen'
import colors from '../../config/colors'
import images from '../../config/images'
import EvaluateDayScreen from '../EvaluateDayScreen/EvaluateDayScreen'

const Tab = createBottomTabNavigator()
const TabNavigation = () => {
    return (
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
                        tintColor: focused ? colors.COLOR_PRIMARY_1_DARK_2 : colors.COLOR_PRIMARY_1_DARK
                    }} />
            },
            tabBarActiveTintColor: colors.COLOR_PRIMARY_1_DARK_2,
            tabBarInactiveTintColor: colors.COLOR_PRIMARY_1_DARK,

        })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />

        </Tab.Navigator>
    )
}

export default TabNavigation