import React from 'react'
import { Modal, Text, TouchableWithoutFeedback, View } from 'react-native'
import styles from './styles'

const ModalCustom = ({ title, modalContent, visible, onPressOutside, style }) => {

    return (
        <View style={[styles.container, style]}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={() => { onPressOutside() }}>

                <TouchableWithoutFeedback onPress={onPressOutside}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>

                <View style={{ flex: 1, justifyContent: "center" }}>
                    <View style={styles.modalView}>
                        {title ? <Text style={styles.title}>{title}</Text> : null}
                        {modalContent}
                    </View>
                </View>

            </Modal>
        </View>
    )
}

export default ModalCustom