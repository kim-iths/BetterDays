import { FlatList, Text, View } from 'react-native'
import styles from './styles'
import React, { useContext, useEffect, useState } from 'react'
import images from '../../config/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HistoryListItem from '../../components/HistoryListItem/HistoryListItem'
import Button from '../../components/Button/Button'
import colors from '../../config/colors'
import { EvaluatedDaysContext } from '../../config/EvaluatedDaysContext'

const HistoryScreen = ({ navigation }) => {

  const [days, setDays] = useState([])
  let monthTextsRendered = []
  const daysContext = useContext(EvaluatedDaysContext)
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"]

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (daysContext.amount != days.length) {
      getData()
    }
  }, [daysContext])

  const getData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()

      //Prevents trying to load user info and reminders in the history list
      let userInfoPos = keys.indexOf("@userInfo")
      if (userInfoPos != -1) keys.splice(userInfoPos, 1)
      let remindersPos = keys.indexOf("@reminders")
      if (remindersPos != -1) keys.splice(remindersPos, 1)

      console.log(keys)

      let newDays = []
      await AsyncStorage.multiGet(keys)
        .then(res => {
          console.log(res);
          if (res) {

            res.forEach((day, i) => {
              let info = JSON.parse(day[1])

              let totalScore = 0
              info.points.forEach(p => totalScore += p)
              let averageScore = totalScore / info.points.length

              newDays.push({ index: i, date: day[0], info: info, average: averageScore })
            })

            daysContext.setAmount(res.length)
            setDays(newDays.reverse())
          }
        })

    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = ({ item }) => {
    // let isTop = item.index == days.length - 1
    // let month = parseInt(item.date.slice(5, 7)) - 1
    // let renderMonthText = false
    return <HistoryListItem date={item.date} note={item.info.note} average={item.average} onPress={() => {
      navigation.navigate("Evaluate day", { selectedDate: item.date, points: item.info.points, note: item.info.note })
    }} />
    // <View>
    {/* {renderMonthText ? <Text style={{ flex: 1, marginTop: isTop ? 8 : 16 }}>{months[month]}</Text> :
        null
      } */}
    // </View>
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
        renderItem={renderItem}
        data={days}
        keyExtractor={item => item.date}
        ListEmptyComponent={<Text style={{ flex: 1, textAlign: "center", marginTop: 12, fontSize: 16 }}>No items yet</Text>}
      />
    </View>
  )
}

export default HistoryScreen