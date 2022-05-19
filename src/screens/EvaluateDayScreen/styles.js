import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    simpleMoodValueInfoContainer: {
        flexDirection: "row",
        marginBottom: 16,
        paddingHorizontal: 8,
    },
    simpleMoodValueInfoText: {
        flex: 1
    },
    bottomButton: {
        height: 64,
        backgroundColor: colors.COLOR_PRIMARY_2,
        width: "100%",
        justifyContent:"center",
        alignItems:"center"
    },
})

export default styles