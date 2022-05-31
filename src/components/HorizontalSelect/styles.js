import { StyleSheet } from 'react-native'
import colors from '../../config/colors'

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flex: 1,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: colors.COLOR_PRIMARY_1_DARK_2,
        overflow: "hidden",
        backgroundColor: "white",
    },
    selected: {
        backgroundColor: colors.COLOR_PRIMARY_1_DARK_2,
    },
    textSelected: {
        color: "white",
    },
    buttonText: {
        color: colors.COLOR_DARK_GRAY,
        textAlign: "center",
        textAlignVertical: "center",
    },
})

export default styles