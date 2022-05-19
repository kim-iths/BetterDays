import { TouchableNativeFeedback, Text, View, ToastAndroid } from 'react-native'
import styles from './styles'
import React, { useState } from 'react'
import images from '../../config/images'
import HorizontalSelectCircles from '../../components/HorizontalSelectCircles/HorizontalSelectCircles'

const EvaluateDayScreen = ({navigation}) => {

  const [simpleMoodValue, setSimpleMoodValue] = useState(null)

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
          navigation.goBack()
          }}>
        <View style={styles.bottomButton} pointerEvents="box-only">
          <Text style={[{ color: "white", fontSize: 20, fontWeight: "bold" }]}>Done</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default EvaluateDayScreen