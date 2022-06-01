import { View, Text, TouchableNativeFeedback, Image } from 'react-native'
import React from 'react'
import styles from './styles'
import images from '../../config/images'
import colors from '../../config/colors'

const HistoryListItem = ({ date, note, average, onPress }) => {

    let icon = images.moodHappy

    if (average >= 7.5) {
        icon = images.moodVeryHappy
    } else if (average < 5 && average > 3) {
        icon = images.moodNeutral
    } else if (average <= 3) {
        icon = images.moodUnhappy
    }

    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(null, true)}

                onPress={onPress}>
                <View style={styles.innerContainer} pointerEvents="box-only">
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.noteText}>{note != "" ? `"${note}"` : "No note for this day"}</Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: 12 }}>
                        <Image source={icon}  style={{width:32, height:32, tintColor:colors.COLOR_PRIMARY_1_DARK_2}}/>
                        <Text style={[styles.averageValueText, { marginLeft: 8 }]}>{average.toFixed(average < 10 && average > 0.1 ? 1 : 0)}</Text>
                    </View>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default HistoryListItem