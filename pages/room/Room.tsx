import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TouchableOpacity,
    Image,
    TextInput,
    Keyboard,
    TouchableWithoutFeedback, BackHandler
} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";
import {useCallback, useEffect, useState} from "react";
import GradualButton from "../../component/GradualButton";
import BottomModal from "../../component/BottomModal";
import IconTextButton from "../../component/IconTextButton";
import CustomSwitch from "../../component/CustomSwitch";
import IconSelectMenu from "../../component/IconSelectMenu";
import {
    userKickOut,
    userQuitRoom,
    userRoomInfo,
    userScoreAdd1,
    userScoreSubtract1,
    userSetDealers,
    userSetOwner
} from "../../api/userRoom";
import {getUserPortrait} from "../../api/user";
import {getUserId, getWsToken, removeRoomInfo} from "../../storage/user";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import NiuNIuCalculate from "../../component/NiuNIuCalculate";
import {RoomType} from "../common/RoomType";

export default function Room() {
    const [scoreResult, setScoreResult] = useState("0");
    const [userInfos, setUserInfos] = useState([]);
    const [roomInfo, serRoomInfo] = useState({number: "", round: "", id: "", name: "", type: ""});
    const [roomOwnerUserId, setRoomOwnerUserId] = useState("userid");
    const [userId, setUserId] = useState("");
    const [portraitCache, serPortraitCache] = useState({});
    const defaultPortraitImg = require("../../assets/icon.png")
    const navigation = useNavigation();
    const loading = useLoading();
    const [currentSelectedUser, setCurrentSelectedUser] = useState(null);


    let reconnectAttempts = 0;
    const maxReconnectAttempts = 10;
    const reconnectInterval = 6000;
    let ws = null;

    const setCurrentRoomInfo = (data) => {
        serRoomInfo(data.room)
        setUserInfos(data.userRooms)
        setRoomOwnerUserId(data.roomOwnerUserId)
    }

    const onMsg = (msg) => {
        switch (msg.type) {
            case "Info":
                setCurrentRoomInfo(msg.data);
                break
            case "Quit":
                removeRoomInfo();
                if (ws) ws.close();
                backAction();
                toastInfo("房主已解散房间~")
                break
            case "Kick":
                removeRoomInfo();
                if (ws) ws.close();
                backAction();
                toastInfo("您已被房主请出房间~")
                break
        }

    }


    const onKickOut = () => {
        if (!currentSelectedUser) {
            toastError("请先选择成员~")
            return;
        }
        userKickOut({userId: currentSelectedUser.userId, roomId: roomInfo.id}).then(res => {
            if (res.code != 0) {
                toastError(res.msg)
            }
        }).finally(() => setUserOpeModalVisible(false))
    }

    const onUserSetOwner = () => {
        if (!currentSelectedUser) {
            toastError("请先选择成员~")
            return;
        }
        userSetOwner({userId: currentSelectedUser.userId, roomId: roomInfo.id}).then(res => {
            if (res.code != 0) {
                toastError(res.msg)
            }
        }).finally(() => setUserOpeModalVisible(false))
    }


    const onUserSetDealers = () => {
        if (!currentSelectedUser) {
            toastError("请先选择成员~")
            return;
        }
        userSetDealers({userId: currentSelectedUser.userId, roomId: roomInfo.id}).then(res => {
            if (res.code != 0) {
                toastError(res.msg)
            }
        }).finally(() => setUserOpeModalVisible(false))
    }

    const onUserScoreAdd1 = () => {
        if (!currentSelectedUser) {
            toastError("请先选择成员~")
            return;
        }
        userScoreAdd1({userId: currentSelectedUser.userId, roomId: roomInfo.id}).then(res => {
            if (res.code != 0) {
                toastError(res.msg)
            }
        }).finally(() => setUserOpeModalVisible(false))
    }

    const onUserScoreSubtract1 = () => {
        if (!currentSelectedUser) {
            toastError("请先选择成员~")
            return;
        }
        userScoreSubtract1({userId: currentSelectedUser.userId, roomId: roomInfo.id}).then(res => {
            if (res.code != 0) {
                toastError(res.msg)
            }
        }).finally(() => setUserOpeModalVisible(false))
    }

    const onWb = async () => {
        if (reconnectAttempts < maxReconnectAttempts) {
            let token;
            await getWsToken().then(res =>
                token = res
            )
            if (!token)
                return
            ws = new WebSocket(`ws://114.67.242.151:18088/ws/room/${token}`);
            ws.onopen = () => {
                loading.showLoading("加载中...")
                userRoomInfo().then(res => {
                    if (res.code == 0) {
                        setCurrentRoomInfo(res.data)
                    }
                }).finally(() => loading.hideLoading())
                ws.send('open');
                reconnectAttempts = 0;
            };
            ws.onmessage = res => {
                let msg = JSON.parse(res.data);
                onMsg(msg);
            };
            ws.onclose = e => {
                console.log("连接失败:", e.code, e.reason);
                if (e.code != "1000") {
                    ws = null;
                    reconnectAttempts++;
                    setTimeout(onWb, reconnectInterval);
                }
            };
        }
    }

    const backAction = () => {
        navigation.reset({
            index: 0,
            routes: [
                {name: 'Tab'},
            ],
        })
        return true;
    };

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
            return () => {
                backHandler.remove();
            };
        }, [])
    )


    useEffect(() => {
        loading.showLoading("加载中...")
        getUserId().then(res => setUserId(res))
        onWb();
        return () => {
            if (ws) ws.close();
        }
    }, [])

    const [userOpeModalVisible, setUserOpeModalVisible] = useState(false);
    const [cardsVisible, setCardsVisible] = useState(false);


    const stringToNumber = (str) => {
        const parsedNumber = parseInt(str, 10);
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    }

    const getUserPortraitUrl = (userid) => {
        getUserPortrait({userid}).then(res => {
            if (res.code == 0) {
                let url = res.data
                serPortraitCache((prev) => ({
                    ...prev,
                    [userid]: url,
                }))
            }
        })
        return defaultPortraitImg;
    }

    const getAssistComponent = (type) => {
        switch (type) {
            case RoomType.Niuniu:
                return <NiuNIuCalculate/>
        }
    }

    const onQuitRoom = () => {
        userQuitRoom({roomId: roomInfo.id}).then(res => {
            if (res.code == 0) {
                removeRoomInfo();
                backAction();
            } else {
                toastError("房间退出失败")
            }
        })
    }

    const onSelectUser = (user) => {
        setCurrentSelectedUser(user);
        setUserOpeModalVisible(true);
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.container]}>
                <View style={{backgroundColor: '#ffffff', height: '100%'}}>
                    <CustomHeaderReturn title={roomInfo.name} isReturn={true} returnPage="Tab"></CustomHeaderReturn>
                    {roomInfo.type != RoomType.Other ?
                        <CustomSwitch
                            text={cardsVisible ? "关闭辅助" : "开启辅助"}
                            enabled={cardsVisible}
                            onValueChange={(value) => setCardsVisible(value)}
                        /> :
                        <View style={{marginTop: 15}}/>
                    }
                    {cardsVisible &&
                        getAssistComponent(roomInfo.type)
                    }
                    <View style={[styles.userInfoListContainer]}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text style={{color: theme.secondary, fontSize: 12}}>房间号：{roomInfo.number}</Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("QrCreate")}>
                                        <Image style={{width: 20, height: 20, marginLeft: 5}}
                                               source={require("../../assets/qr-icon.png")}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{color: theme.primary, fontSize: 12}}>第{roomInfo.round}轮</Text>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                {roomOwnerUserId != userId &&
                                    <IconSelectMenu
                                        type="dots-three-horizontal"
                                        options={[{
                                            title: '退出房间',
                                            onPress: onQuitRoom
                                        }]}/>
                                }
                                {roomOwnerUserId == userId &&
                                    <IconSelectMenu
                                        type="dots-three-horizontal"
                                        options={[{
                                            title: '解散房间',
                                            onPress: onQuitRoom
                                        }]}/>
                                }
                            </View>
                        </View>
                        <View
                            style={{flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center'}}>
                            <GradualButton
                                size='sm' buttonStyle={{width: 30, borderRadius: 5}} text="-"
                                onPress={() => {
                                    setScoreResult((stringToNumber(scoreResult) - 1) + "")
                                }}
                            />
                            <View style={{
                                width: 40,
                            }}>
                                <TextInput
                                    style={{
                                        color: theme.secondary,
                                        borderRadius: 4,
                                        paddingLeft: 2,
                                        paddingRight: 2,
                                        backgroundColor: theme.primary,
                                    }}
                                    keyboardType="numeric"
                                    value={scoreResult}
                                    placeholder="得分"
                                    placeholderTextColor={theme.secondary}
                                    onChangeText={(text) => setScoreResult(text.replace(/[^-0-9]/g, ''))}
                                ></TextInput>
                            </View>
                            <GradualButton
                                size='sm' buttonStyle={{width: 30, borderRadius: 5}} isPros={true} text="+"
                                onPress={
                                    () => setScoreResult((stringToNumber(scoreResult) + 1) + "")
                                }
                            />
                            <GradualButton
                                size='sm'
                                buttonStyle={{width: 90, borderRadius: 5, marginLeft: 2}}
                                text="提交"
                            />
                            <GradualButton
                                size='sm'
                                buttonStyle={{width: 90, borderRadius: 5, marginLeft: 2}}
                                isPros={true}
                                text="准备"
                            />
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
                            <View>
                                {
                                    userInfos?.map(info => (
                                        <TouchableOpacity key={info.userId}
                                                          activeOpacity={roomOwnerUserId == userId ? 0.6 : 1}
                                                          onLongPress={roomOwnerUserId == userId ?
                                                              () => onSelectUser(info) :
                                                              () => {
                                                              }}>
                                            <View style={[styles.userInfoContainer]}>
                                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                    <View style={{width: 50, height: 50, borderRadius: 10}}>
                                                        <Image style={{width: 50, height: 50, borderRadius: 10}}
                                                               source={(portraitCache[info.userId] ? {
                                                                   uri: portraitCache[info.userId]
                                                               } : getUserPortraitUrl(info.userId))}>
                                                        </Image>
                                                    </View>
                                                    <View style={{marginLeft: 6}}>
                                                        <View style={{flexDirection: 'row'}}>
                                                            <Text
                                                                style={{color: theme.secondary}}>{info.username}</Text>
                                                            {
                                                                info.isOwner == 1 ? <Image
                                                                    style={{
                                                                        height: 20,
                                                                        width: 20
                                                                    }}
                                                                    source={require('../../assets/owner.png')}
                                                                /> : <></>
                                                            }
                                                            {
                                                                info.isDealers == 1 ? <Image
                                                                    style={{
                                                                        height: 20,
                                                                        width: 20
                                                                    }}
                                                                    source={require('../../assets/crown.png')}
                                                                /> : <></>
                                                            }
                                                        </View>
                                                        <Text style={{
                                                            fontSize: 16,
                                                            marginTop: 5,
                                                            color: info.score > 0 ? '#63ad4f' : theme.primary,
                                                            fontWeight: 600
                                                        }}>{info.score}</Text>
                                                    </View>
                                                </View>
                                                <View
                                                    style={{
                                                        width: 100,
                                                        alignItems: 'center'
                                                    }}><Text>{info.status}</Text></View>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>
                        </ScrollView>
                    </View>
                </View>
                <View>
                    <BottomModal
                        title="成员操作"
                        visible={userOpeModalVisible}
                        onClose={() => setUserOpeModalVisible(false)}
                    >
                        <View style={{flexDirection: 'row', alignItems: 'flex-start', flexWrap: 'wrap'}}>
                            <IconTextButton
                                style={{margin: 8}}
                                text='设置庄家'
                                source={require('../../assets/crown.png')}
                                onPress={onUserSetDealers}
                            />
                            <IconTextButton
                                style={{margin: 8}}
                                text='转让房主'
                                source={require('../../assets/owner.png')}
                                onPress={onUserSetOwner}
                            />
                            <IconTextButton
                                style={{margin: 8}}
                                text='积分+1'
                                source={require('../../assets/increase.png')}
                                onPress={onUserScoreAdd1}
                            />
                            <IconTextButton
                                style={{margin: 8}}
                                text='积分-1'
                                source={require('../../assets/decrease.png')}
                                onPress={() => setUserOpeModalVisible(false)}
                            />
                            <IconTextButton
                                style={{margin: 8}}
                                text='请出房间'
                                source={require('../../assets/leave.png')}
                                onPress={onKickOut}
                            />
                        </View>
                    </BottomModal>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

import {toastError, toastInfo} from "../../utils/toast";
import {useLoading} from "../../component/CustomLoadingProvider";

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.containerBackgroundColor,
        flex: 1,
    },
    cardsContainer: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    cardsImg: {
        width: 60,
        height: 60
    },
    cardsTextContainer: {
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
    },
    userInfoListContainer: {
        backgroundColor: '#efefef',
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        padding: 20,
        flex: 1,
        borderRadius: 20
    },
    userInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 80,
        borderBottomWidth: 1,
        borderBottomColor: theme.containerBackgroundColor,
        padding: 6,
        borderRadius: 12,
        backgroundColor: "#ffffff"
    },
});
