import { Circle } from 'react-native-svg'

const Dots = ({ x, y, data, color, onDotPress }) => {
    return (
        <>
            {data?.map((value, index) => {
                return (<Circle
                    key={index}
                    cx={x(index)}
                    cy={y(value)}
                    r={5}
                    onPress={() => { onDotPress(index) }}
                    stroke={'rgb(0, 0, 0, 0)'}
                    strokeWidth={20}
                    fill={value != null ? (color ? color : "white") : "transparent"}

                />
                )
            })}
        </>
    )
}
export default Dots