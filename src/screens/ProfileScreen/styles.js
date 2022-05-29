import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const styles = StyleSheet.create({
    container: {
        padding: 12,
    },
    infoContainer: {
        marginLeft: 8,
        marginTop: 8,
        flexDirection: "row",
        alignItems:"center"

    },
    nameText: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 4,
    },
    infoText: {
        marginLeft:8,
        
    },
    modalNotificationEnabled: {
        
    },
    modalNotificationDisabled: {
        backgroundColor:colors.COLOR_PRIMARY_1
    }

})

export default styles