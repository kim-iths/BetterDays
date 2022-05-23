import { TouchableNativeFeedback, Text, View, ToastAndroid, Dimensions } from 'react-native'
import styles from './styles'
import React, { useState } from 'react'
import images from '../../config/images'
import HorizontalSelectCircles from '../../components/HorizontalSelectCircles/HorizontalSelectCircles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { LineChart } from 'react-native-chart-kit'

const EvaluateDayScreen = ({ navigation }) => {

  const [simpleMoodValue, setSimpleMoodValue] = useState(null)
  const [chartWidth, setChartWidth] = useState(0)

  const chartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    fillShadowGradientFrom: "#a4bef3",
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(164, 189, 245, ${opacity})`,
    // strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false
  }

  const storeData = async () => {
    try {
      let date = "2022-05-22"
      let note = "Jag åt en äcklig smörgås med kaviar på. Usch för i helvete vad äckligt det var, rekommenderas ej."
      let points = []
      if (simpleMoodValue) {
        points.push({ "00:00": simpleMoodValue * 2.5 })
        console.log(points);
      } else {
        points.push({ "12:00": 5 }, { "13:00": 5 }, { "15:00": 5 }, { "20:00": 10 })
        console.log(points);
      }
      let obj = { note: note, points: points }

      AsyncStorage.setItem("2022-05-21", JSON.stringify(obj)).then(console.log("saved " + date))
      AsyncStorage.setItem("2022-05-22", JSON.stringify(obj)).then(console.log("saved " + date))
      AsyncStorage.setItem("2022-05-23", JSON.stringify(obj)).then(console.log("saved " + date))
      AsyncStorage.setItem("2022-05-24", JSON.stringify(obj)).then(console.log("saved " + date))
      AsyncStorage.setItem("2022-05-25", JSON.stringify(obj)).then(console.log("saved " + date))
    } catch (e) {

    }
  }

  return (
    <View style={{ justifyContent: "space-between", flex: 1 }}>
      <View style={styles.container}>
        <Text>Choose a generalized mood for today -</Text>
        <HorizontalSelectCircles amount={5}
          onPressItem={(i) => {
            setSimpleMoodValue(i !== simpleMoodValue ? i : null)
          }}
          style={{ marginVertical: 12 }} />
        <View style={styles.simpleMoodValueInfoContainer}>
          <Text style={styles.simpleMoodValueInfoText}>Bad</Text>
          <Text style={[styles.simpleMoodValueInfoText, { textAlign: "center" }]}>Alright</Text>
          <Text style={[styles.simpleMoodValueInfoText, { textAlign: "right" }]}>Good</Text>
        </View>
        <Text>- or select moments from your day that stood out</Text>
        <Text>{simpleMoodValue}</Text>
        <View style={{ borderWidth: 0, borderRadius: 16, overflow: "hidden", paddingTop: 12, backgroundColor: "#515050" }} onLayout={(e) => {
          setChartWidth(e.nativeEvent.layout.width)
        }}>
          <LineChart
          withOuterLines={false}
            fromZero
            bezier
            yLabelsOffset={16}
            xLabelsOffset={6}
            segments={4}
            width={chartWidth * 1.1}
            height={256}
            chartConfig={chartConfig}
            data={{
              labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
              datasets: [
                {
                  data: [5,5,6,4,6.5],
                  color: (opacity = 1) => `rgba(164, 189, 245, ${opacity})`,

                },
                {
                  data: [10],
                  withDots: false
                }
              ]
            }}
          />

        </View>
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