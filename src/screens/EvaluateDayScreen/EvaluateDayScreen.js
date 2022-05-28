import { TouchableNativeFeedback, Text, View, ToastAndroid, ScrollView, Button, TextInput, Keyboard } from 'react-native'
import styles from './styles'
import React, { useEffect, useRef, useState } from 'react'
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
import { Slider } from '@miblanchard/react-native-slider'
import * as shape from 'd3-shape'

const EvaluateDayScreen = ({ route, navigation }) => {

  const [data, setData] = useState([5, 5, 5, 5, 5, 5, 5, 5, 5,])
  const [simpleMoodValue, setSimpleMoodValue] = useState(null)

  const [currentDate, setCurrentDate] = useState()
  const selectedDate = route.params.selectedDate
  const isToday = !route.params.selectedDate

  const [showAddMoodPeriodModal, setShowAddMoodPeriodModal] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [selectedTimeFrom, setSelectedTimeFrom] = useState(0)
  const [selectedTimeTo, setSelectedTimeTo] = useState(0)
  const [selectedMoodValue, setSelectedMoodValue] = useState(5)
  const [moodValues, setMoodValues] = useState([])
  const [note, setNote] = useState("")

  const contentInset = { top: 16, bottom: 24, }
  const selectableTimeValues = [0, 3, 6, 9, 12, 15, 18, 21, 24]

  const TextInputRef = useRef()
  const scrollViewRef = useRef()

  const pickerItems = () => (
    selectableTimeValues.map((t, i) => (
      <Picker.Item key={i} label={`${(t < 10 ? "0" : "") + t}:00`} value={t} />
    ))
  )

  useEffect(() => {
    if (moodValues.length > 0) {
      let newData = [...data]
      moodValues.forEach((m, i) => {
        newData[m.timeIndex] = m.value
      })
      setData(newData)
    }
  }, [moodValues])

  useEffect(() => {
    setCurrentDate(getShortDate(new Date()))
    console.log("is today? " + isToday);

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true))
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false))

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  //Unfocuses the TextInput when the user presses the back button
  useEffect(() => {
    if (TextInputRef.current.isFocused() && !keyboardVisible) Keyboard.dismiss()
  }, [keyboardVisible])

  const storeData = async () => {
    try {
      let date = isToday ? currentDate : selectedDate
      console.log(date);
      let points = []
      if (simpleMoodValue != null) {
        points.push(simpleMoodValue * 2.5)
        console.log(points);
      } else {
        points = data
        console.log(points);
      }
      let obj = { note: note, points: points }
      console.log(obj);

      await AsyncStorage.setItem(date, JSON.stringify(obj)).then(console.log("saved " + date))
    } catch (e) { }
  }

  const getShortDate = (date) => date.toISOString().slice(0, 10)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Text style={[styles.subtitleText, { backgroundColor: "white", paddingVertical: 8, textAlign: "center", borderRadius: 8, marginBottom: 0 }]}>
          Evaluating {isToday ? "today" : new Date(selectedDate).toDateString()}
        </Text>
        <Text style={styles.subtitleText}>Choose a generalized mood for {isToday ? "today" : "this day"} -</Text>
        <View style={{ backgroundColor: "white", paddingHorizontal: 12, borderRadius: 16, }}>
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
        </View>
        <Text style={styles.subtitleText}>- or select moments from your day that stood out</Text>
        <View style={styles.chartContainer}>
          <View style={{ flexDirection: "row", paddingRight: 24 }}>
            <YAxis
              contentInset={contentInset}
              min={0}
              max={10}
              data={data}
              svg={{
                fill: colors.COLOR_PRIMARY_1_DARK_2,
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
              curve={shape.curveBumpX}
              svg={{ fill: 'url(#gradient)' }}
            >
              <Line color={colors.COLOR_PRIMARY_1_DARK_2} />
              <Grid />
              <Dots color={colors.COLOR_PRIMARY_1_DARK_2}
                onDotPress={i => {
                  setSelectedTimeFrom(selectableTimeValues[i])
                  setSelectedTimeTo(selectableTimeValues[selectableTimeValues.length > i + 1 ? i + 1 : i])
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
            contentInset={{ left: 24, right: 28 }}
            min={0}
            max={8}
            data={data}
            svg={{
              fill: colors.COLOR_PRIMARY_1_DARK_2,
              fontSize: 14,
            }}
            formatLabel={(value, index) => (
              index * 6 < 10 ? `0${index * 6}:00` : `${index * 6}:00`
            )}
            numberOfTicks={5} />

        </View>

        <Text style={styles.subtitleText}>Write a note about {isToday ? "today" : "this day"}</Text>
        <TextInput
          placeholder='Optional'
          ref={TextInputRef}
          onFocus={() => { setKeyboardVisible(true) }}
          style={{
            borderRadius: 16,
            borderWidth: 1,
            borderColor: colors.COLOR_DARK_GRAY,
            width: "100%",
            flex: 1,
            paddingHorizontal: 16,
            paddingVertical: 12,
            marginBottom: 16,
            height: 100,
            textAlignVertical: "top"
          }}
          onChangeText={setNote}
        />
      </ScrollView>
      {!keyboardVisible ?
        <TouchableNativeFeedback
          onPress={() => {
            ToastAndroid.show(`You've evaluated ${selectedDate ? selectedDate : currentDate}!`, ToastAndroid.SHORT)
            storeData().then(navigation.goBack())
          }}>
          <View style={styles.bottomButton} pointerEvents="box-only">
            <Text style={{ color: "white", fontSize: 20, fontWeight: "bold", textAlign: "center" }}>Done</Text>
          </View>
        </TouchableNativeFeedback>
        : null}

      <ModalCustom
        title="Add a mood"
        visible={showAddMoodPeriodModal}
        onPressOutside={() => { setShowAddMoodPeriodModal(false) }}
        modalContent={
          <View>
            <Text>From:</Text>
            <Picker selectedValue={selectedTimeFrom} onValueChange={item => setSelectedTimeFrom(item)}>
              {pickerItems()}
            </Picker>
            <Text>To:</Text>
            <Picker selectedValue={selectedTimeTo} onValueChange={item => setSelectedTimeTo(item)}>
              {pickerItems()}
            </Picker>
            <Text>How did you feel from 0-10?</Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>

              <View style={{ flex: 1, }}>
                <Slider
                  minimumTrackTintColor={colors.COLOR_PRIMARY_1_DARK_2}
                  thumbTintColor={colors.COLOR_PRIMARY_1_DARK_2}
                  maximumValue={10}
                  step={1}
                  value={selectedMoodValue}
                  onValueChange={value => setSelectedMoodValue(value)} />
              </View>
              <Text style={styles.sliderText}>{selectedMoodValue}</Text>
            </View>

            <View style={{ flexDirection: "row", marginTop: 16, justifyContent: "flex-end" }}>
              <Button title='cancel' onPress={() => setShowAddMoodPeriodModal(false)} />
              <Button title='save'
                onPress={() => {
                  let newMoodValues = []
                  selectableTimeValues.forEach((t, i) => {
                    if (t >= selectedTimeFrom && t <= selectedTimeTo) {
                      newMoodValues.push({ timeIndex: i, value: parseInt(selectedMoodValue) })
                    }
                  })

                  setMoodValues(newMoodValues)
                  setShowAddMoodPeriodModal(false)
                }} />
            </View>
          </View>
        }
      />
    </View >
  )
}

export default EvaluateDayScreen