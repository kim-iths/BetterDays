import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        borderRadius: 8,
        elevation: 4,
        marginTop: 8,
    },
    innerContainer: {
        padding: 16,
    },
    dateText: {
        fontWeight: "bold",
        fontSize: 16,
    },
    noteText: {
        marginTop: 8,
        // fontStyle: "italic",
    },
    averageValueText: {
        fontSize: 18,
        color: colors.COLOR_PRIMARY_1_DARK_2
    }
})

export default styles