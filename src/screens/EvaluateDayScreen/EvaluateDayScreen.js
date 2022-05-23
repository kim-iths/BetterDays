import { TouchableNativeFeedback, Text, View, ToastAndroid, Dimensions, ScrollView, Modal, Alert, Pressable, Button } from 'react-native'
import styles from './styles'
import React, { useEffect, useState } from 'react'
import images from '../../config/images'
import HorizontalSelectCircles from '../../components/HorizontalSelectCircles/HorizontalSelectCircles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AreaChart } from 'react-native-svg-charts'
import Line from '../../components/AreaChartAdds/Line'
import Dots from '../../components/AreaChartAdds/Dots'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import colors from '../../config/colors'
import { Grid, YAxis, XAxis } from 'react-native-svg-charts'
import ModalCustom from '../../components/ModalCustom/ModalCustom'
import { Picker } from '@react-native-picker/picker'

const EvaluateDayScreen = ({ navigation }) => {

  const [simpleMoodValue, setSimpleMoodValue] = useState(null)
  const [chartWidth, setChartWidth] = useState(0)
  const [data, setData] = useState([5, 5, 5, 5, 5, 5, 5, 5, 5,])
  const [showAddMoodPeriodModal, setShowAddMoodPeriodModal] = useState(false)

  const [selectedTimeFrom, setSelectedTimeFrom] = useState(0)
  const [selectedTimeTo, setSelectedTimeTo] = useState(0)

  const contentInset = { top: 16, bottom: 24, }
  const selectableTimeValues = [0, 3, 6, 9, 12, 15, 18, 21, 24]

  const pickerItems = () => (
    selectableTimeValues.map((t, i) => (
      <Picker.Item label={`${(t < 10 ? "0" : "") + t}:00`} value={i} />
    ))
  )

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
      <ScrollView style={styles.container}>
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
        <View style={{
          marginTop: 8,
          borderRadius: 16,
          paddingLeft: 8,
          overflow: "hidden",
          backgroundColor: "#515050",
          paddingVertical: 12,
        }} onLayout={(e) => {
          setChartWidth(e.nativeEvent.layout.width)
        }}>
          <View style={{ flexDirection: "row", paddingRight: 16 }}>
            <YAxis
              contentInset={contentInset}
              min={0}
              max={10}
              data={data}
              svg={{
                fill: 'white',
                fontSize: 14,
              }}
              numberOfTicks={5}
            />
            <AreaChart
              style={{ flex: 1, marginLeft: 8, height: 256 }}
              data={data}
              gridMin={0}
              gridMax={10}
              start={0}
              contentInset={contentInset}
              svg={{ fill: 'url(#gradient)' }}
            >
              <Line color={colors.COLOR_PRIMARY_1_DARK_2} />
              <Grid />
              <Dots color={colors.COLOR_PRIMARY_1_DARK_2}
                onDotPress={i => {
                  console.log(i + " pressed")
                  setShowAddMoodPeriodModal(true)
                }} />
              <Defs>
                <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                  <Stop offset={'0%'} stopColor={colors.COLOR_PRIMARY_1} stopOpacity={1} />
                  <Stop offset={'100%'} stopColor={colors.COLOR_PRIMARY_1} stopOpacity={0.1} />
                </LinearGradient>
              </Defs>
            </AreaChart>
          </View>

          <XAxis
            contentInset={{ left: 24, right: 20 }}
            min={0}
            max={8}
            data={data}
            svg={{
              fill: 'white',
              fontSize: 14,
            }}
            formatLabel={(value, index) => (
              index * 6 < 10 ? `0${index * 6}:00` : `${index * 6}:00`
            )}
            numberOfTicks={5} />
          {/* </View> */}
          {/* <LineChart
            formatYLabel={(value) => parseInt(value)}
            fromZero
            bezier
            yLabelsOffset={16}
            xLabelsOffset={6}
            segments={5}
            width={chartWidth * 1.0}
            height={256}
            chartConfig={chartConfig}
            data={{
              labels: ["00:00", "06:00", "12:00", "18:00", "24:00"],
              datasets: [
                {
                  data: [5,5,5,5,5],
                  color: (opacity = 1) => `rgba(164, 189, 245, ${opacity})`,
                },
                // {
                //   data: [5,5,5,5,5,],
                //   color: (opacity = 1) => `rgba(164, 189, 245, ${opacity})`,
                //   withDots: false
                // },
                {
                  data: [10],
                  withDots: false
                }
              ]
            }}
          /> */}
        </View>
        <View style={{ height: 1000 }} />
      </ScrollView>
      <TouchableNativeFeedback
        onPress={() => {
          ToastAndroid.show("You've evaluated [date]!", ToastAndroid.SHORT)
          storeData().then(navigation.goBack())
        }}>
        <View style={styles.bottomButton} pointerEvents="box-only">
          <Text style={[{ color: "white", fontSize: 20, fontWeight: "bold" }]}>Done</Text>
        </View>
      </TouchableNativeFeedback>

      <ModalCustom
        title="Add a mood"
        visible={showAddMoodPeriodModal}
        onPressOutside={() => { setShowAddMoodPeriodModal(false) }}
        modalContent={
          <View>

            <Picker selectedValue={selectedTimeFrom} onValueChange={item => setSelectedTimeFrom(item)}>
              {pickerItems()}
            </Picker>
            <Picker selectedValue={selectedTimeTo} onValueChange={item => setSelectedTimeTo(item)}>
              {pickerItems()}
            </Picker>


            <View style={{ flexDirection: "row", marginTop: "auto", justifyContent: "flex-end" }}>
              <Button title='cancel' onPress={() => setShowAddMoodPeriodModal(false)} />
              <Button title='save' />
            </View>
          </View>
        }
      />
    </View >
  )
}

export default EvaluateDayScreen