import { Button, Image, Text, View } from 'react-native'
import styles from './styles'
import React, { useEffect } from 'react'
import images from '../../config/images'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HistoryScreen = () => {

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    try {
      let keys = await AsyncStorage.getAllKeys()
      await AsyncStorage.multiGet(keys)
        .then(res => {
          console.log(res);
        })

    } catch (error) {

    }
  }

  return (
    <View style={styles.container}>
      <Text>HistoryScreen</Text>
      <Button title='get' onPress={getData} />
    </View>
  )
}

export default HistoryScreen