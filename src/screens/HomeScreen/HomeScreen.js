import { TouchableNativeFeedback, Text, View, Image, TextInput, ScrollView } from 'react-native'
import styles from './styles'
import React, { useState } from 'react'
import images from '../../config/images'
import colors from '../../config/colors'


const HomeScreen = ({ navigation }) => {
  const [dateInput, setDateInput] = useState()
  return (
    <ScrollView style={styles.container}>
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

      <Text style={{ marginTop: 16 }}>TEST; format with YYYY-MM-DD</Text>
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
      </TouchableNativeFeedback>
    </ScrollView>
  )
}

export default HomeScreen