import {Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "../common/Theme";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import CustomTextInput from "../../component/CustomTextInput";
import {useState} from "react";
import GradualButton from "../../component/GradualButton";
import {useNavigation} from "@react-navigation/native";
import {userJoinRoom} from "../../api/userRoom";
import {setCreatedRoomInfo} from "../../storage/user";
import {toastError} from "../../utils/toast";

export default function JoinRoom() {
    const [roomNumber, setRoomNumber] = useState("");
    const [roomPassword, setRoomPassword] = useState("");

    const navigation = useNavigation();

    const onNavigate = (page: string) => {
        navigation.navigate(page);
    };

    const onJoinRoom = () => {
        userJoinRoom({roomNumber, roomPassword}).then(res => {
            if (res.code == 0) {
                setCreatedRoomInfo(res.data)
                onNavigate("Room")
            } else {
                toastError(res.msg ? res.msg : "加入房间失败")
            }
        })
    }

    const onQrScan = () => {
        navigation.navigate("QrScan");
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.container]}>
                <View style={{backgroundColor: '#ffffff', height: '100%'}}>
                    <CustomHeaderReturn title='加入房间' isReturn={true}/>
                    <View style={{flexDirection: "column", justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <View style={{width: '100%'}}>
                            <Text style={[styles.textLabel]}>房间编号：</Text>
                            <CustomTextInput
                                value={roomNumber}
                                onChangeText={(value) => setRoomNumber(value)}
                                limit={10}
                                placeholder="编号"
                            />
                        </View>
                        <View style={{marginTop: 20, width: '100%'}}>
                            <Text style={[styles.textLabel]}>房间密码：</Text>
                            <CustomTextInput
                                value={roomPassword}
                                limit={16}
                                onChangeText={(value) => setRoomPassword(value)}
                                placeholder="密码"
                            />
                        </View>
                        <View style={{marginTop: 50, width: '70%'}}>
                            <GradualButton
                                size='lg'
                                disabled={roomNumber && roomPassword ? false : true}
                                buttonStyle={{
                                    borderRadius: 20,
                                }}
                                text='加入房间'
                                onPress={onJoinRoom}
                            />
                        </View>
                        <View style={{marginTop: 10, width: '70%'}}>
                            <GradualButton
                                size='lg'
                                buttonStyle={{
                                    borderRadius: 20,
                                }}
                                text='扫码加入'
                                onPress={onQrScan}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.containerBackgroundColor,
        flex: 1,
    },
    textLabel: {
        fontSize: 16,
        color: theme.primary,
        marginBottom: -10
    }
})
