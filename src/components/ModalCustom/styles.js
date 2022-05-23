import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    title: {
        fontSize: 18, 
        fontWeight: "bold",
        marginBottom: 16
    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.3)'
      },    
    modalView: {
        margin: 16,
        backgroundColor: "white",
        borderRadius: 16,
        paddingVertical: 16,
        paddingHorizontal: 16,
        elevation: 5
    },
})

export default styles