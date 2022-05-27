import { TouchableNativeFeedback, Text, View, Image } from 'react-native'
import styles from './styles'
import React from 'react'
import images from '../../config/images'
import colors from '../../config/colors'


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Hi Kim, how was your day?</Text>
      <View style={{ justifyContent: "center", alignItems: "center", height: 200, borderWidth: 2, borderRadius: 16, marginTop: 8 }}>
        <Text style={{ fontSize: 24 }}>GRAPH</Text>
      </View>
      <TouchableNativeFeedback
        onPress={() => {
          navigation.navigate("Evaluate day", {
            //  selectedDate: "2022-05-20"
          })
        }}>
        <View style={styles.button} pointerEvents="box-only">
          <Text style={{ color: "white", fontSize: 18 }}>Evaluate your day</Text>
          <Image source={images.arrow}
            style={{ width: 36, height: 36, tintColor: "white" }} />
        </View>
      </TouchableNativeFeedback>
    </View>
  )
}

export default HomeScreen