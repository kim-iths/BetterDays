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
    selectDateModal:{
        margin: 10,
        backgroundColor:"red"
    },
    chartContainer: {
        borderRadius: 16,
        marginTop:8,
        paddingLeft: 8,
        overflow: "hidden",
        backgroundColor: "white",
        paddingVertical: 12,
    },
})

export default styles