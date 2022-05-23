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

      let newDays = []
      await AsyncStorage.multiGet(keys)
        .then(res => {
          if (res) {

            res.forEach(day => {
              let dayContent = JSON.parse(day[1])

              let totalScore = 0
              dayContent.points.forEach(p => totalScore += p)
              let averageScore = totalScore / dayContent.points.length

              newDays.push({ date: day[0], info: dayContent, average: averageScore })
            })

            setDays(newDays)
          }
        })

    } catch (error) {

    }
  }

  const renderItem = ({ item }) => {
    return <HistoryListItem date={item.date} note={item.info.note} average={item.average} />
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Button title='get' onPress={getData} />
        <Button title='clear' onPress={() => AsyncStorage.clear()} />
      </View>
      <FlatList
      contentContainerStyle={{paddingHorizontal: 12, paddingBottom: 12}}
        renderItem={renderItem}
        data={days}
        keyExtractor={item => item.date}

      />
    </View>
  )
}

export default HistoryScreen