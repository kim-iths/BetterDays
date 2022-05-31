import { Button, FlatList, Image, Text, View } from 'react-native'
import styles from './styles'
import React, { useEffect, useState } from 'react'
import images from '../../config/images'
import AsyncStorage from '@react-native-async-storage/async-storage'
import HistoryListItem from '../../components/HistoryListItem/HistoryListItem'

const HistoryScreen = () => {

  const [days, setDays] = useState([])

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      keys.splice(keys.indexOf("@userInfo"),1)
      console.log(keys)

      let newDays = []
      await AsyncStorage.multiGet(keys)
        .then(res => {
          console.log(res);
          if (res) {

            res.forEach(day => {
              let info = JSON.parse(day[1])

              let totalScore = 0
              info.points.forEach(p => totalScore += p)
              let averageScore = totalScore / info.points.length

              newDays.push({ date: day[0], info: info, average: averageScore })
            })

            setDays(newDays)
          }
        })

    } catch (error) {
      console.log(error);
    }
  }

  const renderItem = ({ item }) => {
    return <HistoryListItem date={item.date} note={item.info.note} average={item.average} />
  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Button title='get' onPress={getData} />
        <Button title='clear' onPress={async () => {
          try {
            await AsyncStorage.clear()
          } catch (e) {
            console.log(error)
          }
        }} />
      </View>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 12 }}
        renderItem={renderItem}
        data={days.reverse()}
        keyExtractor={item => item.date}

      />
    </View>
  )
}

export default HistoryScreen