import { Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import images from '../../config/images'
import colors from '../../config/colors'

const ProfileScreen = ({ navigation }) => {

  const [infoTextViews, setInfoTextViews] = useState([])

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

  useEffect(() => {
    let views = []
    for (let i = 0; i < 3; i++) {
      let icon, text
      switch (i) {
        case 0:
          icon = images.cake
          text = "25 May 1999"
          break
        case 1:
          icon = images.phone
          text = "073 268 73 75"
          break
        case 2:
          icon = images.home
          text = "Svetsarvägen 3"
          break
      }
      views.push(<View style={styles.infoContainer} key={i}>
        <Image source={icon} style={{ width: 24, height: 24 }} />
        <Text style={styles.infoText}>{text}</Text>
      </View>)
    }
    setInfoTextViews(views)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.nameText}>Kim, 23</Text>
      {infoTextViews}
    </ScrollView>
  )
}

export default ProfileScreen