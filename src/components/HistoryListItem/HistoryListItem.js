import { View, Text, TouchableNativeFeedback } from 'react-native'
import React from 'react'
import styles from './styles'

const HistoryListItem = ({ date, note, average, onPress }) => {
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                background={TouchableNativeFeedback.Ripple(null, true)}

                onPress={onPress}>
                <View style={styles.innerContainer} pointerEvents="box-only">
                    <Text style={styles.dateText}>{date}</Text>
                    <Text style={styles.noteText}>{note}</Text>
                    <Text style={styles.averageValueText}>{average.toFixed(average < 10 && average > 0.1 ? 1 : 0)}</Text>
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default HistoryListItem