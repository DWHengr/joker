import {Modal, TouchableOpacity, View, StyleSheet, Text} from "react-native";

export default function BottomModal({visible, onClose, children, title}) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalOverlay}
                activeOpacity={1}
                onPress={onClose}
            >
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.modalContainer}
                    onPress={(e) => e.stopPropagation()}
                >
                    <View>
                        <View style={
                            {
                                flexDirection: 'row',
                                justifyContent: 'center',
                                borderBottomWidth: 1,
                                borderBottomColor: "#efefef",
                                padding: 5,
                                marginBottom: 5
                            }
                        }>
                            <Text style={{fontSize: 16}}>{title}</Text>
                        </View>
                        {children}
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        height: 300,
        backgroundColor: 'white',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingHorizontal: 20,
        paddingBottom: 20,
    }
});
