import { TouchableNativeFeedback, Text, View, ToastAndroid, ScrollView, TextInput, Keyboard, Image } from 'react-native'
import styles from './styles'
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react'
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
import Button from '../../components/Button/Button'
import HorizontalSelect from '../../components/HorizontalSelect/HorizontalSelect'
import { EvaluatedDaysContext } from '../../config/EvaluatedDaysContext'
import moment from 'moment'

const EvaluateDayScreen = ({ route, navigation }) => {

  const [data, setData] = useState([5, 5, 5, 5, 5, 5, 5, 5, 5,])
  const [simpleMoodValue, setSimpleMoodValue] = useState(null)

  const [currentDate, setCurrentDate] = useState()
  const [selectedMode, setSelectedMode] = useState("simple")
  const selectedDate = route.params.selectedDate
  const isToday = !route.params.selectedDate
  const [datePoints, setDatePoints] = useState(route.params.points)
  const dateNote = route.params.note

  const [showAddMoodPeriodModal, setShowAddMoodPeriodModal] = useState(false)
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  const [viewingMode, setViewingMode] = useState(route.params.points ? "Viewing" : "Evaluating")
  const [selectedTimeFrom, setSelectedTimeFrom] = useState(0)
  const [selectedTimeTo, setSelectedTimeTo] = useState(0)
  const [selectedMoodValue, setSelectedMoodValue] = useState(5)
  const [moodValues, setMoodValues] = useState([])
  const [note, setNote] = useState("")

  const daysContext = useContext(EvaluatedDaysContext)

  const contentInset = { top: 16, bottom: 24, }
  const selectableTimeValues = [0, 3, 6, 9, 12, 15, 18, 21, 24]

  const TextInputRef = useRef()
  const scrollViewRef = useRef()

  const pickerItems = () => (
    selectableTimeValues.map((t, i) => (
      <Picker.Item key={i} label={`${(t < 10 ? "0" : "") + t}:00`} value={t} />
    ))
  )

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        viewingMode == "Evaluating" ?
          null

          : <TouchableNativeFeedback
            useForeground
            background={TouchableNativeFeedback.Ripple(null, true, 24)}
            onPress={() => {
              if (viewingMode == "Editing") {
                setViewingMode("Viewing")
              } else {
                console.log(viewingMode);
                setViewingMode("Editing")
                setSelectedMode("simple")
                setNote(dateNote)
              }
            }}
          >
            <View pointerEvents="box-only">
              <Image source={viewingMode == "Viewing" ? images.edit : images.eye} style={{ width: 24, height: 24 }} />
            </View>
          </TouchableNativeFeedback>
      )
    })
  })

  useEffect(() => {
    setCurrentDate(getShortDate(new Date()))
    console.log("is today? " + isToday);



    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => setKeyboardVisible(true))
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => setKeyboardVisible(false))

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, [])

  useEffect(() => {
    //Checks if you're viewing or evaluating a day
    if (viewingMode == "Viewing") {
      setSelectedMode("advanced")
      if (datePoints.length == 1) {
        let expandedPoints = data.map(() => (datePoints[0]))
        setData(expandedPoints)
      } else {
        setData(route.params.points)
      }
    } else {
      setSelectedMode("simple")
    }
  }, [viewingMode])

  useEffect(() => {
    if (moodValues.length > 0) {
      let newData = [...data]
      moodValues.forEach((m, i) => {
        newData[m.timeIndex] = m.value
      })
      setData(newData)
    }
  }, [moodValues])


  //Unfocuses the TextInput when the user presses the back button
  useEffect(() => {
    if (viewingMode == "Evaluating" || viewingMode == "Editing") {
      if (TextInputRef.current.isFocused() && !keyboardVisible) Keyboard.dismiss()
    }
  }, [keyboardVisible])

  const storeData = async () => {
    try {
      let date = isToday ? currentDate : selectedDate
      console.log(date);
      let points = []
      if (selectedMode == "simple") { //Simple
        points.push(simpleMoodValue * 2.5)
        console.log(points);
      } else { //Advanced
        points = data
        console.log(points);
      }
      let obj = { note: note, points: points }
      console.log(obj);

      try {
        await AsyncStorage.setItem(date, JSON.stringify(obj)).then(console.log("saved " + date))
      } catch (error) {
        console.log(error);
      }

    } catch (e) { }
  }

  const getShortDate = (date) => date.toISOString().slice(0, 10)

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} ref={scrollViewRef}>
        <Text style={[styles.subtitleText, styles.evaluatingDayCard]}>
          {viewingMode} {isToday ? `today - ${moment(currentDate).format("D MMMM")}`
            : new Date(selectedDate).toDateString()}
        </Text>
        {viewingMode == "Viewing"
          ? null
          : <View>
            <HorizontalSelect values={["Simple", "Advanced"]} style={{ paddingVertical: 6 }}
              onPressItem={(i) => {
                setSelectedMode(i == 0 ? "simple" : "advanced")
              }} />
            <View style={selectedMode == "advanced" ? { height: 0, overflow: "hidden" } : null}>
              <Text style={styles.subtitleText}>Choose a generalized mood for {isToday ? "today" : "this day"}</Text>
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
            </View>
          </View>
        }
        <View style={selectedMode == "simple" ? { height: 0, overflow: "hidden" } : null}>
          {viewingMode == "Viewing" ? null : <Text style={styles.subtitleText}>Select moments from your day that stood out</Text>}
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
                svg={{ fill: 'url(#gradient)' }}>
                <Line color={colors.COLOR_PRIMARY_1_DARK_2} size={viewingMode == "Viewing" ? 4 : 2} />
                <Grid />
                {viewingMode == "Viewing" ? null
                  : <Dots color={colors.COLOR_PRIMARY_1_DARK_2}
                    onDotPress={i => {
                      setSelectedTimeFrom(selectableTimeValues[i])
                      setSelectedTimeTo(selectableTimeValues[selectableTimeValues.length > i + 1 ? i + 1 : i])
                      setSelectedMoodValue(5)
                      setShowAddMoodPeriodModal(true)
                    }} />
                }
                <Defs>
                  <LinearGradient id={'gradient'} x1={'0%'} y1={'0%'} x2={'0%'} y2={'100%'}>
                    <Stop offset={'0%'} stopColor={colors.COLOR_PRIMARY_1} stopOpacity={1} />
                    <Stop offset={'100%'} stopColor={colors.COLOR_PRIMARY_1} stopOpacity={0.1} />
                  </LinearGradient>
                </Defs>
              </AreaChart>
            </View>

            <XAxis
              style={{ paddingVertical: 2 }}
              contentInset={{ left: 24, right: 28, }}
              min={0}
              max={8}
              data={selectedMode == "advanced" ? data : []}
              svg={{
                fill: colors.COLOR_PRIMARY_1_DARK_2,
                fontSize: 14,
              }}
              formatLabel={(value, index) => (
                index * 6 < 10 ? `0${index * 6}:00` : `${index * 6}:00`
              )}
              numberOfTicks={5} />
          </View>
        </View>

        {viewingMode == "Viewing"
          ? <View style={{ backgroundColor: "white", flex: 1, borderRadius: 16, padding: 16, marginTop: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Note</Text>
            <Text style={{ marginTop: 8 }}>{dateNote ? `"${dateNote}"` : "No note for this day"}</Text>
          </View>
          : <View>
            <Text style={styles.subtitleText}>Write a note about {isToday ? "today" : "this day"}</Text>
            <TextInput
              value={note}
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
          </View>}

      </ScrollView>
      {!keyboardVisible ?
        <TouchableNativeFeedback
          onPress={() => {
            if (viewingMode != "Viewing") {
              let toastMessagePrefix = viewingMode == "Editing" ? "Edited" : "You've evaluated"
              if (viewingMode == "") { }
              ToastAndroid.show(`${toastMessagePrefix} ${selectedDate ? selectedDate : currentDate}!`, ToastAndroid.SHORT)
              storeData().then(() => {
                navigation.goBack()
                daysContext.setAmount(daysContext.amount + 1)
              })
            } else {
              navigation.goBack()
            }
          }}>
          <View style={[styles.bottomButton, {
            opacity: selectedMode == "simple" && simpleMoodValue != null ? 1 :
              (selectedMode == "advanced" ? 1 : 0.6)
          }]} pointerEvents="box-only">
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
            <Picker mode='dropdown' selectedValue={selectedTimeFrom} onValueChange={item => setSelectedTimeFrom(item)}>
              {pickerItems()}
            </Picker>
            <Text>To:</Text>
            <Picker mode='dropdown' selectedValue={selectedTimeTo} onValueChange={item => setSelectedTimeTo(item)}>
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
              <Button buttonText={"Cancel"} onPress={() => setShowAddMoodPeriodModal(false)} color={colors.COLOR_CANCEL} />
              <Button buttonText={"Save"}
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