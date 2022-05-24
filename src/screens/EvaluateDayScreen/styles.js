import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor:"white",
    },
    scrollView: {
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
    chartContainer: {
        marginTop: 8,
        borderRadius: 16,
        paddingLeft: 8,
        overflow: "hidden",
        backgroundColor: "white",
        paddingVertical: 12,
    },
    bottomButton: {
        height: 64,
        backgroundColor: colors.COLOR_PRIMARY_2,
        width: "100%",
        justifyContent: "center",
        // alignItems: "center"
    },
    subtitleText: {
        fontWeight:"bold",
        color: colors.COLOR_DARK_GRAY
    },
    sliderText: {
        fontSize: 18,
        borderRadius: 8,
        padding: 4,
        marginLeft: 8,
        borderWidth: 1,
        borderColor: "#515050",
        flex: 0.1,
        textAlign: "center"
    }
})

export default styles