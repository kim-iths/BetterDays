import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useState, useEffect, useRef } from 'react'
import styles from './styles'

const HorizontalSelectCircles = (props, ref) => {

    const { onPressItem, amount, style } = props

    const [buttons, setButtons] = useState([])
    const [selected, setSelected] = useState(null)

    useEffect(() => {
        if (amount > 0) {
            let buttonsArray = []
            for (let i = 0; i < amount; i++) {
                buttonsArray.push(
                    <View key={i} style={[styles.circle, style, selected == i ? styles.selected : null]}>
                        <TouchableOpacity
                            style={{ width: "100%", height: "100%", justifyContent: "center" }}
                            onPress={() => {
                                // Only for testing
                                // setSelected(i)
                                setSelected(i !== selected ? i : null)
                                onPressItem ? onPressItem(i) : null
                            }}>
                        </TouchableOpacity>
                    </View>
                )
            }
            setButtons(buttonsArray)
        }
    }, [selected])
    
    return (
        <View style={styles.container}>
            {buttons}
        </View>
    )
}

export default HorizontalSelectCircles