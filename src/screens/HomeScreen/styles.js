import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
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
})

export default styles