import { View, Text, TouchableNativeFeedback, Image } from 'react-native'
import React from 'react'
import styles from './styles'

const Button = ({ buttonText, onPress, color, icon, style, innerStyle, iconStyle, textStyle, disabled, filled, flex }) => {
    return (
        <View style={[styles.container, style, { flex: flex ? 1 : 0 }]}>
            <TouchableNativeFeedback
                disabled={disabled}
                background={TouchableNativeFeedback.Ripple(null, true)}
                onPress={onPress}
            >
                <View style={[innerStyle, styles.innerContainer, { backgroundColor: filled ? (color ? color : "gray") : "transparent" }]}
                    pointerEvents="box-only">
                    <Text style={[
                        { color: filled ? "white" : (color ? color : null), flex: flex ? 1 : 0 },
                        textStyle,
                        styles.text,
                        icon ? styles.textWithIcon : null]
                    }>{buttonText}</Text>
                    {icon ?
                        <Image source={icon} style={[{ height: 24, width: 24, tintColor: color ? (filled ? "white" : color) : (filled ? "white" : "black") }, iconStyle]} />
                        : null}
                </View>
            </TouchableNativeFeedback>
        </View>
    )
}

export default Button