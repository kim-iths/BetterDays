import { TouchableNativeFeedback, Text, View, ToastAndroid } from 'react-native'
import styles from './styles'
import React, { useState } from 'react'
import images from '../../config/images'
import HorizontalSelectCircles from '../../components/HorizontalSelectCircles/HorizontalSelectCircles'
import AsyncStorage from '@react-native-async-storage/async-storage'

const EvaluateDayScreen = ({ navigation }) => {

  const [simpleMoodValue, setSimpleMoodValue] = useState(null)

  const storeData = async () => {
    try {
      let date = "2022-05-22"
      let note = "Jag åt en äcklig smörgås med kaviar på. Usch för i helvete vad äckligt det var, rekommenderas ej."
      let points = { "12:00": 5, "13:00": 5, "15:00": 5, "20:00": 10 }
      let obj = { note: note, points: points }

      AsyncStorage.setItem(date, JSON.stringify(obj)).then(console.log("saved " + date))
    } catch (e) {

    }
  }

  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <View style={styles.container}>
        <Text>Choose a generalized mood for today -</Text>
        <HorizontalSelectCircles amount={5}
          onPressItem={(i) => {

          }}
          style={{ marginVertical: 12 }} />
        <View style={styles.simpleMoodValueInfoContainer}>
          <Text style={styles.simpleMoodValueInfoText}>Bad</Text>
          <Text style={[styles.simpleMoodValueInfoText, { textAlign: "center" }]}>Alright</Text>
          <Text style={[styles.simpleMoodValueInfoText, { textAlign: "right" }]}>Good</Text>
        </View>
        <Text>- or select moments from your day that stood out</Text>

      </View>
      <TouchableNativeFeedback
        onPress={() => {
          ToastAndroid.show("You've evaluated [date]!", ToastAndroid.SHORT)
          storeData().then(navigation.goBack())
        }}>
        <View style={styles.bottomButton} pointerEvents="box-only">
          <Text style={[{ color: "white", fontSize: 20, fontWeight: "bold" }]}>Done</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default EvaluateDayScreen