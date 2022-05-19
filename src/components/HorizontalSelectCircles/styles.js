import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        // padding: 12,
        // height: 48,
        // width: 48,
        flexDirection: "row",
        justifyContent:"space-between"
    },
    circle: {
        backgroundColor: "gray",
        // flex: 1,
        height: 48,
        width: 48,
        borderRadius: 100
    },
    selected: {
        backgroundColor: colors.COLOR_PRIMARY_2
    }
})

export default styles