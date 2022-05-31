import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    info: {
        backgroundColor: "white",
        padding: 8,
        borderRadius: 8,
    },
    infoContainer: {
        marginLeft: 8,
        marginTop: 8,
        flexDirection: "row",
        alignItems: "center"

    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },
    infoText: {
        marginLeft: 8,
    },
    modalNotificationEnabled: {
        backgroundColor: colors.COLOR_PRIMARY_1
    },
    modalNotificationDisabled: {
        backgroundColor: "transparent"
    },
    reminderSubHeader: {
        marginTop: 12,
        marginBottom: 8,
    },
    textInput: {
        borderWidth: 1,
        borderColor: "lightgray",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16
    },
    time: {
        fontWeight: "bold",
        fontSize: 18,
    }

})

export default styles