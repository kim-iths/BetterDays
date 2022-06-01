import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
        borderRadius: 8,
        // flex: 1,
    },
    innerContainer: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    innerContainerWithIcon: {

    },
    text: {
        fontWeight: "bold",
        fontSize: 16,
        // flex: 1,
        textAlign: "center",
        fontFamily: 'Roboto',
    },
    textWithIcon:{
        textAlign:"left"
    }

})

export default styles