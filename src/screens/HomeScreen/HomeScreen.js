import { TouchableNativeFeedback, Text, View, Image, TextInput, ScrollView } from 'react-native'
import styles from './styles'
import React, { useState } from 'react'
import images from '../../config/images'
import colors from '../../config/colors'
import ModalCustom from '../../components/ModalCustom/ModalCustom'
import CalendarPicker from 'react-native-calendar-picker';
import ButtonClear from '../../components/ButtonClear/ButtonClear'

const HomeScreen = ({ navigation }) => {
  const [dateInput, setDateInput] = useState("")
  const [showSelectDateModal, setShowSelectDateModal] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")

  const dismissModal = () => {
    setShowSelectDateModal(false)
    setSelectedDate("")
  }

  return (
    <ScrollView style={styles.container}>
      <Text>Hi Kim, how was your day?</Text>
      <View style={{ justifyContent: "center", alignItems: "center", height: 200, borderWidth: 2, borderRadius: 16, marginTop: 8 }}>
        <Text style={{ fontSize: 24 }}>GRAPH</Text>
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

      <View style={{ marginTop: 16, borderRadius: 8, backgroundColor: "transparent" }}>
        <TouchableNativeFeedback

          background={TouchableNativeFeedback.Ripple(null, true)}
          onPress={() => setShowSelectDateModal(true)}>

          <View style={styles.buttonClear} pointerEvents="box-only">
            <Text style={styles.buttonClearText}>Choose other date to evaluate</Text>
            <Image source={images.add} style={{ width: 24, height: 24, tintColor: colors.COLOR_PRIMARY_1_DARK_2 }} />
          </View>

        </TouchableNativeFeedback>
      </View>

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

      {/* <Text style={{ marginTop: 16 }}>TEST; format with YYYY-MM-DD</Text>
      <TextInput
        onChangeText={setDateInput}
        style={{ width: "100%", paddingHorizontal: 16, paddingVertical: 8, borderRadius: 8, borderWidth: 1, borderColor: colors.COLOR_DARK_GRAY, marginTop: 8 }}
      />
      <TouchableNativeFeedback
        disabled={dateInput.length == 0}
        onPress={() => {
          navigation.navigate("Evaluate day", {
            selectedDate: dateInput
          })
        }}>
        <View style={[styles.button, { width: "50%" }, dateInput.length == 0 ? { backgroundColor: colors.COLOR_DARK_GRAY } : null]} pointerEvents="box-only">
          <Text style={{ color: "white", fontSize: 18 }}>Evaluate {dateInput}</Text>
          <Image source={images.arrow}
            style={{ width: 36, height: 36, tintColor: "white" }} />
        </View>
      </TouchableNativeFeedback> */}
    </ScrollView>
  )
}

export default HomeScreen