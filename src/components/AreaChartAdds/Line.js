import { View, Text } from 'react-native'
import React from 'react'
import { Path } from 'react-native-svg'

const Line = ({ line, color, size }) => {
    return <Path key={'line'} d={line} stroke={color ? color : '#0000BF'} fill={'none'} strokeWidth={size ? size : 2}/>
}

export default Line