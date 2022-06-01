import { FlatList, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, ToastAndroid, Touchable, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import images from '../../config/images'
import colors from '../../config/colors'
import Button from '../../components/Button/Button'
import ModalCustom from '../../components/ModalCustom/ModalCustom'
import DatePicker from 'react-native-date-picker'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({ navigation }) => {

  //Reminders
  const [reminders, setReminders] = useState([])

  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState(null)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [selectedReminderDate, setSelectedReminderDate] = useState(new Date())
  const [selectedReminderTitle, setSelectedReminderTitle] = useState("")
  const [isSelectedReminderEnabled, setIsSelectedReminderEnabled] = useState(true)

  //Info
  const [info, setInfo] = useState({})
  const [name, setName] = useState("Kim")
  const [birthday, setBirthday] = useState(new Date("2000-01-01"))
  const [phone, setPhone] = useState("073 268 73 75")
  const [address, setAddress] = useState("Svetsarvägen 3")

  const [showInfoModal, setShowInfoModal] = useState(false)
  const [showBirthdayPicker, setShowBirthdayPicker] = useState(false)


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
    getData("@userInfo")
    getData("@reminders")
  }, [])

  const storeData = (info, key) => {
    try {
      let data = JSON.stringify(info)
      AsyncStorage.setItem(key, data).then(() => {
        getData("@userInfo")
        getData("@reminders")

        if (key == "@userInfo") ToastAndroid.show("Profile updated", ToastAndroid.SHORT)
      })
    } catch (error) {

    }
  }
  const getData = (key) => {
    try {
      AsyncStorage.getItem(key).then(res => {
        if (res != null) {
          let data = JSON.parse(res)
          if (key == "@userInfo") {
            data.birthday = data.birthday ? new Date(data.birthday) : ""
            setInfo(data)
          } else if (key == "@reminders") {
            setReminders(data)
          }
        }
      })
    } catch (error) {

    }
  }

  const InfoText = ({ text, icon }) => {
    return (
      <View style={styles.infoContainer}>
        <Image source={icon} style={{ width: 24, height: 24, tintColor: colors.COLOR_PRIMARY_1_DARK }} />
        <Text style={styles.infoText}>{text}</Text>
      </View>
    )
  }

  const dismissModal = () => {
    setShowReminderModal(false)
    setShowInfoModal(false)
    setSelectedReminder(null)
    setSelectedReminderTitle("")
    setSelectedReminderDate(new Date())
    setIsSelectedReminderEnabled(true)
  }

  const reminderModal = () => (
    <ModalCustom
      visible={showReminderModal}
      title={selectedReminder != null ? "Edit reminder" : "Create reminder"}
      onPressOutside={() => dismissModal()}
      modalContent={
        <View>
          <Text style={styles.reminderSubHeader}>Title</Text>
          <TextInput
            value={selectedReminderTitle}
            style={styles.textInput}
            placeholder='Required'
            onChangeText={setSelectedReminderTitle} />
          <Text style={styles.reminderSubHeader}>Time</Text>
          <View style={styles.row}>
            <Button buttonText={selectedReminderDate.toLocaleTimeString().slice(0, 5)} onPress={() => setShowDatePicker(true)} flex filled color={colors.COLOR_PRIMARY_1} />
          </View>
          <DatePicker
            is24hourSource='locale'
            locale='sv-se'
            mode='time'
            modal
            open={showDatePicker}
            date={selectedReminderDate}
            onConfirm={(date) => {
              setShowDatePicker(false)
              setSelectedReminderDate(date)
            }}
            onCancel={() => setShowDatePicker(false)} />
          <View style={[styles.row, { marginTop: 24 }]}>
            <Text>Enabled</Text>
            <Pressable onPress={() => setIsSelectedReminderEnabled(!isSelectedReminderEnabled)}>
              <View
                style={[{
                  width: 32,
                  height: 32,
                  borderColor: "lightgray",
                  borderWidth: 2,
                  borderRadius: 8
                },
                isSelectedReminderEnabled ? styles.modalNotificationEnabled : styles.modalNotificationDisabled]} />
            </Pressable>
          </View>
          <View style={styles.buttonRow}>
            {selectedReminder != null
              ? <Button icon={images.delete}
                color={colors.COLOR_CANCEL}
                innerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
                style={{ marginRight: "auto" }}
                onPress={() => {

                  let newReminders = reminders
                  newReminders.splice(selectedReminder, 1)
                  storeData(newReminders, "@reminders")
                  dismissModal()
                  ToastAndroid.show(selectedReminderTitle + " deleted", ToastAndroid.SHORT)
                }} />
              : null}
            <Button buttonText={"Cancel"} color={colors.COLOR_CANCEL} onPress={() => dismissModal()} />
            <Button buttonText={selectedReminder == null ? "Add" : "Save"}
              color={selectedReminderTitle ? colors.COLOR_PRIMARY_1_DARK_2 : colors.COLOR_PRIMARY_1_DARK}
              disabled={!selectedReminderTitle}
              onPress={() => {

                let newReminders = reminders
                let time = selectedReminderDate.toLocaleTimeString().slice(0, 3) + selectedReminderDate.toLocaleTimeString().slice(3, 5)

                if (selectedReminder == null) { //New reminder
                  newReminders.push({ title: selectedReminderTitle, time: time, enabled: isSelectedReminderEnabled })
                } else { //Editing reminder
                  newReminders[selectedReminder] = { title: selectedReminderTitle, time: time, enabled: isSelectedReminderEnabled }
                }

                storeData(newReminders, "@reminders")

                dismissModal()
                ToastAndroid.show(selectedReminderTitle + (selectedReminder ? " saved!" : " added!"), ToastAndroid.SHORT)
              }} />

          </View>
        </View>
      }
    />
  )

  const infoModal = () => (
    <ModalCustom
      visible={showInfoModal}
      title="Edit info"
      onPressOutside={() => dismissModal()}
      modalContent={
        <View>
          <Text style={styles.reminderSubHeader}>Name</Text>
          <TextInput style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Optional" />
          <Text style={styles.reminderSubHeader}>Birthday</Text>
          <View style={{ flexDirection: "row" }}>
            <Button buttonText={birthday.toDateString()} flex filled color={colors.COLOR_PRIMARY_2}
              onPress={() => setShowBirthdayPicker(true)} />
          </View>
          <DatePicker
            modal
            mode='date'
            open={showBirthdayPicker}
            date={birthday}
            onCancel={() => setShowBirthdayPicker(false)}
            onConfirm={(date) => {
              setBirthday(date)
              setShowBirthdayPicker(false)
            }}
          />

          <Text style={styles.reminderSubHeader}>Phone</Text>
          <TextInput style={styles.textInput}
            maxLength={15}
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            placeholder="Optional" />
          <Text style={styles.reminderSubHeader}>Address</Text>
          <TextInput style={styles.textInput}
            value={address}
            onChangeText={setAddress}
            placeholder="Optional" />

          <View style={styles.buttonRow}>
            <Button buttonText={"Cancel"} color={colors.COLOR_CANCEL} onPress={() => dismissModal()} />
            <Button buttonText={"Save"}
              color={name ? colors.COLOR_PRIMARY_1_DARK_2 : colors.COLOR_PRIMARY_1_DARK}
              onPress={() => {
                storeData({ name: name, birthday: birthday, phone: phone, address: address }, "@userInfo")
                dismissModal()
              }} />

          </View>
        </View>
      }
    />
  )

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.info, { paddingBottom: Object.keys(info).length != 0 ? 16 : null }]}>
        <View style={[styles.row, { marginLeft: 8 }]}>
          <Text style={styles.nameText}>
            {info.name ? info.name : "New user"}
            {info.birthday ? (", " + moment().diff(info.birthday.toISOString(), "years")) : ""}
          </Text>
          <Button icon={images.edit} innerStyle={{ paddingHorizontal: 8, paddingVertical: 8 }}
            onPress={() => {
              setName(info.name)
              setPhone(info.phone)
              setAddress(info.address)
              setShowInfoModal(true)
            }} />
        </View>
        {info.birthday ? <InfoText text={info.birthday.toDateString().slice(4)} icon={images.cake} /> : null}
        {info.phone ? <InfoText text={info.phone} icon={images.phone} /> : null}
        {info.address ? <InfoText text={info.address} icon={images.address} /> : null}

      </View>
      <View style={{ backgroundColor: "white", padding: 8, borderRadius: 8, marginTop: 8 }}>
        {/* Creates list of reminders */}
        {reminders.map((r, i) => (
          <Button key={i}
            buttonText={`${r.title} - ${r.time}`}
            icon={r.enabled ? images.notifications : images.notificationsOff}
            color={colors.COLOR_PRIMARY_2}
            style={{ marginBottom: 8 }}
            onPress={() => {
              let reminderTime = new Date()
              reminderTime.setHours(parseInt(r.time.slice(0, 3)))
              reminderTime.setMinutes(parseInt(r.time.slice(3, 5)))

              setShowReminderModal(true)
              setSelectedReminder(i)

              setIsSelectedReminderEnabled(r.enabled)
              setSelectedReminderTitle(r.title)
              setSelectedReminderDate(reminderTime)

            }} />
        ))}

        {reminders.length > 0 ?
          <View style={{ height: 1, backgroundColor: "lightgray", marginHorizontal: 8, }} />
          : null}
        <Button buttonText={"Add reminder"}
          icon={images.add}
          color={colors.COLOR_PRIMARY_1_DARK_2} 
          style={{ marginTop: reminders.length > 0 ? 8 : 0 }}
          onPress={() => setShowReminderModal(true)} />
      </View>

      {reminderModal()}
      {infoModal()}

    </ScrollView>
  )
}

export default ProfileScreen