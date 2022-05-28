import { TouchableNativeFeedback, Text, View, Image, TextInput, ScrollView } from 'react-native'
import styles from './styles'
import React, { useState } from 'react'
import images from '../../config/images'
import colors from '../../config/colors'
import ModalCustom from '../../components/ModalCustom/ModalCustom'
import CalendarPicker from 'react-native-calendar-picker';
import ButtonClear from '../../components/ButtonClear/ButtonClear'
import { YAxis } from 'react-native-svg-charts'
import { LineChart } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Dots from '../../components/AreaChartAdds/Dots'
import Line from '../../components/AreaChartAdds/Line'
import { Grid } from 'react-native-svg-charts'


const HomeScreen = ({ navigation }) => {
  const [dateInput, setDateInput] = useState("")
  const [showSelectDateModal, setShowSelectDateModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")

  const [data, setData] = useState([5, 3, 7, 4, 8, 5, 6])
  const contentInset = { top: 16, bottom: 24, }

  const dismissModal = () => {
    setShowSelectDateModal(false)
    setSelectedDate("")
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Hi Kim, how was your day?</Text>
      {/* Graph */}
      <View style={styles.chartContainer}>
        <Text style={{ fontWeight: "bold", marginLeft: 32, color: colors.COLOR_PRIMARY_1_DARK_2 }}>Past week</Text>
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
            numberOfTicks={2}
          />
          <LineChart
            style={{ flex: 1, marginLeft: 8, height: 256 }}
            data={data}
            gridMin={0}
            gridMax={10}
            start={0}
            contentInset={contentInset}
            curve={shape.curveBumpX}
            svg={{ stroke: colors.COLOR_PRIMARY_1_DARK_2, strokeWidth: 10 }}
          >
            <Grid />
          </LineChart>
        </View>

      </View>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate("Evaluate day", {})
        }}>
        <View style={styles.button} pointerEvents="box-only">
          <Text style={{ color: "white", fontSize: 18 }}>Evaluate your day</Text>
          <Image source={images.arrow}
            style={{ width: 36, height: 36, tintColor: "white" }} />
        </View>
      </TouchableNativeFeedback>

      <ButtonClear buttonText={"Choose other date to evaluate"} icon={images.add} color={colors.COLOR_PRIMARY_1_DARK_2}
        style={{ marginTop: 16 }}
        onPress={() => setShowSelectDateModal(true)} />

      <ModalCustom
        visible={showSelectDateModal}
        title="Select date"
        onPressOutside={() => dismissModal()}
        modalContent={
          <View>
            <CalendarPicker
              selectedDayColor={colors.COLOR_PRIMARY_1_DARK}
              selectedDayTextColor={"white"}
              width={380}
              startFromMonday={true}
              onDateChange={setSelectedDate}>

            </CalendarPicker>

            <View style={{ flexDirection: "row", justifyContent: "flex-end", marginTop: 16 }}>

              <ButtonClear buttonText={"Cancel"} color={colors.COLOR_CANCEL}
                onPress={() => dismissModal()} />

              <ButtonClear buttonText={"Continue"}
                color={selectedDate != "" ? colors.COLOR_PRIMARY_1_DARK_2 : colors.COLOR_PRIMARY_1_DARK}
                disabled={selectedDate == ""}
                onPress={() => {
                  navigation.navigate("Evaluate day", { selectedDate: selectedDate.toISOString().slice(0, 10) })
                  dismissModal()
                }} />
            </View>
          </View>
        }
      />
    </ScrollView>
  )
}

export default HomeScreen