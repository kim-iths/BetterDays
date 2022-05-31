import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'

const HorizontalSelect = ({ onPressItem, values, style }) => {

    const [buttons, setButtons] = useState([])
    const [selected, setSelected] = useState(0)

    useEffect(() => {
        if (values) {
            setButtons(values.map((value, i) => {
                return (
                    <View key={i} style={[{ flex: 1 }, selected == i ? styles.selected : null]}>
                        <TouchableOpacity
                            onPress={() => {
                                setSelected(i)
                                onPressItem ? onPressItem(i) : null
                            }}>
                            <View style={[{ flex: 1, paddingVertical: 8 }, style]}>
                                <Text style={[styles.buttonText, selected == i ? styles.textSelected : null]}>{value}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                )
            }))
        }
    }, [selected])

    return (
        <View style={styles.container}>
            {buttons}
        </View>
    )
}

export default HorizontalSelect