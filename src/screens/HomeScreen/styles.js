import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    button: {
        marginTop: 8,
        elevation: 4,
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.COLOR_PRIMARY_2,
        justifyContent: "space-between"
    },
    buttonClear: {
        borderRadius: 8,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    buttonClearText: {
        color: colors.COLOR_PRIMARY_1_DARK_2,
        fontWeight:"bold",
        fontSize:16,
        flex: 1,
    },
    selectDateModal:{
        margin: 10,
        backgroundColor:"red"
    }
})

export default styles