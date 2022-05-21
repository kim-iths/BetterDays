import { Button, FlatList, Image, Text, View } from 'react-native'
import styles from './styles'
import React, { useEffect, useState } from 'react'
import images from '../../config/images'
import AsyncStorage from '@react-native-async-storage/async-storage'

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
              // console.log(day)

              let totalScore = 0
              dayContent.points.forEach(p => {
                totalScore += parseFloat(Object.values(p))
              })
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
    console.log(item);
    return (<View style={{ backgroundColor: "white", padding: 16, borderRadius: 8, elevation: 4, marginTop: 8 }}>
      <Text>{item.date}</Text>
      <Text>{item.info.note}</Text>
      <Text>{item.average}</Text>
    </View>)
  }

  return (
    <View style={{flex: 1}}>
      <View style={styles.container}>
        <Button title='get' onPress={getData} />
        <Button title='clear' onPress={() => AsyncStorage.clear()} />
        {/* {days} */}
        {console.log(days)}
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