import { View, Text, TouchableNativeFeedback, Image } from 'react-native'
import React from 'react'
import styles from './styles'

const ButtonClear = ({ buttonText, onPress, color, icon, style, iconStyle, textStyle, disabled }) => {
    return (
        <View style={styles.container}>
            <TouchableNativeFeedback
                disabled={disabled}
                background={TouchableNativeFeedback.Ripple(null, true)}
                onPress={onPress}
            >
                <View style={[style, styles.innerContainer]} pointerEvents="box-only">
                    <Text style={[
                        { color: color ? color : null }, textStyle, styles.text, icon ? styles.textWithIcon : null]
                    }>{buttonText}</Text>
                    {icon ?
                        <Image source={icon} style={[{ height: 24, width: 24, tintColor: color ? color : "black" }, iconStyle]} />
                        : null}
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default ButtonClear