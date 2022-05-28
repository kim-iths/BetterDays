import { Image, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import React, { useLayoutEffect } from 'react'
import images from '../../config/images'
import colors from '../../config/colors'

const ProfileScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableNativeFeedback
          useForeground
          background={TouchableNativeFeedback.Ripple(null, true, 24)}
          onPress={() => navigation.navigate("Settings")}
        >
          <View style={{ marginRight: 8, padding: 8 }} pointerEvents="box-only">
            <Image source={images.settings} style={{ width: 24, height: 24 }} />
          </View>
        </TouchableNativeFeedback>
      )
    })
  })
  return (
    <View>
      <Text>ProfileScreen</Text>
    </View>
  )
}

export default ProfileScreen