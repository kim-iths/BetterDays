import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import images from '../../config/images'
import colors from '../../config/colors'
import Button from '../../components/Button/Button'
import ModalCustom from '../../components/ModalCustom/ModalCustom'

const ProfileScreen = ({ navigation }) => {

  const [showReminderModal, setShowReminderModal] = useState(false)
  const [selectedReminder, setSelectedReminder] = useState(null)

  const [infoTextViews, setInfoTextViews] = useState([])
  const [reminders, setReminders] = useState([])

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
    populateInfoTexts()
    setMockReminders()

  }, [])

  const populateInfoTexts = () => {
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
        <Image source={icon} style={{ width: 24, height: 24, tintColor: colors.COLOR_PRIMARY_1_DARK }} />
        <Text style={styles.infoText}>{text}</Text>
      </View>)
    }
    setInfoTextViews(views)
  }

  const setMockReminders = () => {
    let reminders = [
      { title: "Utvärdera dagen!!", time: "23:00", enabled: true },
      { title: "Ta Fluoxetin 2st", time: "22:00", enabled: true },
      { title: "Ta Atarax 1st", time: "07:30", enabled: false },
    ]
    setReminders(reminders)
  }

  const dismissModal = () => {
    setShowReminderModal(false)
    setSelectedReminder(null)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={{ backgroundColor: "white", padding: 12, borderRadius: 8, }}>
        <Text style={styles.nameText}>Kim, 23</Text>
        {infoTextViews}
      </View>
      <View style={{ backgroundColor: "white", padding: 12, borderRadius: 8, marginTop: 16 }}>
        {reminders.map((r, i) => (
          <Button key={i}
            buttonText={`${r.title} - ${r.time}`}
            icon={r.enabled ? images.notifications : images.notificationsOff}
            color={colors.COLOR_PRIMARY_2}
            style={{ marginBottom: 8 }}
            onPress={() => {
              setShowReminderModal(true)
              setSelectedReminder(i)
            }} />
        ))}

        {reminders ?
          <View style={{ height: 1, backgroundColor: "lightgray", marginHorizontal: 8, }} />
          : null}
        <Button buttonText={"Add reminder"} icon={images.add} color={colors.COLOR_PRIMARY_1_DARK_2} style={{ marginTop: 8 }}
          onPress={() => setShowReminderModal(true)} />
      </View>

      <ModalCustom
        visible={showReminderModal}
        title={selectedReminder != null ? "Edit reminder" : "Create reminder"}
        onPressOutside={() => dismissModal()}
        modalContent={
          <View>

          </View>
        }
      />
    </ScrollView>
  )
}

export default ProfileScreen