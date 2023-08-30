import {Keyboard, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "../common/Theme";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import CustomTextInput from "../../component/CustomTextInput";
import {useState} from "react";
import CustomCheckBox from "../../component/CustomCheckBox";
import GradualButton from "../../component/GradualButton";
import {createRoom} from "../../api/room";
import {setCreatedRoomInfo} from "../../storage/user";
import {useNavigation} from "@react-navigation/native";
import {RoomType} from "../common/RoomType";

export default function CreateRoom() {
    const [roomName, setRoomName] = useState("");
    const [roomPassword, setRoomPassword] = useState("");
    const [roomType, setRoomType] = useState(RoomType.Other);

    const navigation = useNavigation();

    const onNavigate = (page: string) => {
        navigation.navigate(page);
    };

    const onCreateRoom = () => {
        createRoom({roomName, roomPassword, roomType}).then(res => {
            if (res.code == 0) {
                setCreatedRoomInfo(res.data)
                onNavigate("Room")
            }
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.container]}>
                <View style={{backgroundColor: '#ffffff', height: '100%'}}>
                    <CustomHeaderReturn title='创建房间' isReturn={true}/>
                    <View style={{flexDirection: "column", justifyContent: 'center', alignItems: 'center', margin: 20}}>
                        <View style={{width: '100%'}}>
                            <Text style={[styles.textLabel]}>房间名称：</Text>
                            <CustomTextInput
                                value={roomName}
                                onChangeText={(value) => setRoomName(value)}
                                limit={10}
                                placeholder="名称"
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
                        <View style={{marginTop: 20, width: '100%'}}>
                            <Text style={[styles.textLabel]}>房间类型：</Text>
                            <ScrollView style={{marginTop: 16, height: 90}}>
                                <CustomCheckBox
                                    value={roomType}
                                    checks={[
                                        {key: '斗牛', value: RoomType.Niuniu},
                                        {key: '其他', value: RoomType.Other}
                                    ]}
                                    onChecked={(value) => {
                                        setRoomType(value)
                                    }}
                                />
                            </ScrollView>
                        </View>
                        <View style={{marginTop: 50, width: '70%'}}>
                            <GradualButton
                                size='lg'
                                disabled={roomName && roomPassword && roomType ? false : true}
                                buttonStyle={{
                                    borderRadius: 20,
                                }}
                                text='创建房间'
                                onPress={onCreateRoom}
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
