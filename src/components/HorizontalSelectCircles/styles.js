import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        // padding: 12,
        // height: 48,
        // width: 48,
        flexDirection: "row",
        justifyContent:"space-between",
    },
    circle: {
        // backgroundColor: colors.COLOR_PRIMARY_1_DARK_2,
        // flex: 1,
        height: 48,
        width: 48,
        borderRadius: 100,
        borderWidth: 4,
        borderColor: colors.COLOR_PRIMARY_1_DARK_2,
    },
    selected: {
        backgroundColor: colors.COLOR_PRIMARY_1_DARK_2
    }
})

export default styles