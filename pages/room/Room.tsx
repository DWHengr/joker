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
import {useEffect, useState} from "react";
import PokerSegmentPicker from "../../component/PokerSegmentPicker";
import GradualButton from "../../component/GradualButton";
import BottomModal from "../../component/BottomModal";
import IconTextButton from "../../component/IconTextButton";
import CustomSwitch from "../../component/CustomSwitch";
import IconSelectMenu from "../../component/IconSelectMenu";
import {userRoomInfo} from "../../api/userRoom";
import {getUserPortrait} from "../../api/user";
import {getWsToken, removeRoomInfo} from "../../storage/user";
import {useNavigation} from "@react-navigation/native";

const cardsImg =
    {
        heart: require('../../assets/poker-heart.png'),
        diamond: require('../../assets/poker-diamond.png'),
        club: require('../../assets/poker-club.png'),
        spade: require('../../assets/poker-spade.png')
    }

const CardValues = {
    'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10
};

export default function Room() {
    const [pokerVisible, setPokerVisible] = useState(false);
    const [currentSelectionCardIndex, setCurrentSelectionCardIndex] = useState(0);
    const [niuResult, setNiuResult] = useState(-1);
    const [scoreResult, setScoreResult] = useState("0");
    const [userInfos, setUserInfos] = useState([]);
    const [roomInfo, serRoomInfo] = useState({number: "", round: "", id: "", name: ""});
    const [portraitCache, serPortraitCache] = useState({});
    const defaultPortraitImg = require("../../assets/icon.png")
    const navigation = useNavigation();

    let reconnectAttempts = 0;
    const maxReconnectAttempts = 10;
    const reconnectInterval = 6000;
    let ws = null;

    const [cards, setCards] = useState([
        {num: "A", suit: "heart"},
        {num: "K", suit: "club"},
        {num: "J", suit: "diamond"},
        {num: "Q", suit: "spade"},
        {num: "8", suit: "heart"},
    ])

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
                ws.send('open');
                reconnectAttempts = 0;
            };
            ws.onmessage = res => {
                let parse = JSON.parse(res.data);
                serRoomInfo(parse.room)
                setUserInfos(parse.userRooms)
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

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
        return () => {
            backHandler.remove();
        }
    }, [])

    useEffect(() => {
        userRoomInfo().then(res => {
            if (res.code == 0) {
                setUserInfos(res.data.userRooms)
                serRoomInfo(res.data.room)
                onWb(res.data.room);
            }
        })
        return () => {
            if (ws) ws.close();
        }
    }, [])

    const [userOpeModalVisible, setUserOpeModalVisible] = useState(false);
    const [cardsVisible, setCardsVisible] = useState(false);


    const onSelectCardAndNum = async (cardIndex) => {
        await setCurrentSelectionCardIndex(cardIndex);
        setPokerVisible(true);
    }

    const stringToNumber = (str) => {
        const parsedNumber = parseInt(str, 10);
        return isNaN(parsedNumber) ? 0 : parsedNumber;
    }

    const onCalculateNiu = () => {
        const n = cards.length;
        let niu = 0;
        for (let i = 0; i < n - 2; i++) {
            for (let j = i + 1; j < n - 1; j++) {
                for (let k = j + 1; k < n; k++) {
                    const sum = CardValues[cards[i].num] + CardValues[cards[j].num] + CardValues[cards[k].num];
                    if (sum % 10 === 0) {
                        let remainingSum = 0;
                        for (let l = 0; l < n; l++) {
                            if (l !== i && l !== j && l !== k) {
                                remainingSum += CardValues[cards[l].num];
                            }
                        }
                        niu = remainingSum % 10 === 0 ? 10 : remainingSum % 10;
                    }
                }
            }
        }
        setNiuResult(niu)
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

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={[styles.container]}>
                <PokerSegmentPicker
                    visible={pokerVisible}
                    onCancel={() => setPokerVisible(false)}
                    onConfirm={(value) => {
                        cards[currentSelectionCardIndex].suit = value.suit;
                        cards[currentSelectionCardIndex].num = value.num;
                        setCards(cards)
                        setPokerVisible(false)
                    }}
                    defaultSelections={cards[currentSelectionCardIndex]}
                />
                <View style={{backgroundColor: '#ffffff', height: '100%'}}>
                    <CustomHeaderReturn title={roomInfo.name} isReturn={true} returnPage="Tab"></CustomHeaderReturn>
                    <CustomSwitch
                        text={cardsVisible ? "关闭辅助" : "开启辅助"}
                        enabled={cardsVisible}
                        onValueChange={(value) => setCardsVisible(value)}
                    />
                    {cardsVisible &&
                        <View style={{flexDirection: 'row', justifyContent: 'center', marginBottom: 10}}>
                            <View style={{height: 130, width: '100%', flexDirection: 'colum',}}>
                                <View style={{flex: 1, flexDirection: 'colum'}}>
                                    <View style={{
                                        flex: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        paddingRight: 20,
                                        paddingLeft: 20
                                    }}>
                                        {cards?.map((card, index) => (
                                            <TouchableOpacity key={index} onPress={() => onSelectCardAndNum(index)}>
                                                <View style={[styles.cardsContainer]}>
                                                    <Image
                                                        style={[StyleSheet.absoluteFill, styles.cardsImg]}
                                                        source={cardsImg[card.suit]}
                                                    />
                                                    <View style={[styles.cardsTextContainer]}>
                                                        <Text style={{fontSize: 16}}>{card.num}</Text>
                                                    </View>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginBottom: 8
                                    }}>
                                        {niuResult == 0 && <Text>没</Text>}
                                        <Image style={{width: 20, height: 20}}
                                               source={require('../../assets/niu.png')}/>
                                        {niuResult == 10 && <Image style={{width: 20, height: 20}}
                                                                   source={require('../../assets/niu.png')}/>}
                                        {niuResult > 0 && niuResult < 10 && <Text>{niuResult}</Text>}

                                    </View>
                                    <View style={{
                                        flexDirection: 'colum',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <View style={{width: 200}}>
                                            <GradualButton radius={15} text='计算牛牛' onPress={onCalculateNiu}/>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                    }
                    <View style={[styles.userInfoListContainer]}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <View>
                                <Text style={{color: theme.secondary, fontSize: 12}}>房间号：{roomInfo.number}</Text>
                                <Text style={{color: theme.primary, fontSize: 12}}>第{roomInfo.round}轮</Text>
                            </View>
                            <IconSelectMenu
                                type="dots-three-horizontal"
                                options={[{
                                    title: '退出房间', onPress: () => {
                                        removeRoomInfo();
                                        backAction();
                                    }
                                }]}/>
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
                                        <TouchableOpacity key={info.id}
                                                          activeOpacity={0.6}
                                                          onLongPress={() => setUserOpeModalVisible(true)}>
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
                                onPress={() => setUserOpeModalVisible(false)}
                            />
                            <IconTextButton
                                style={{margin: 8}}
                                text='转让房主'
                                source={require('../../assets/owner.png')}
                                onPress={() => setUserOpeModalVisible(false)}
                            />
                            <IconTextButton
                                style={{margin: 8}}
                                text='积分+1'
                                source={require('../../assets/increase.png')}
                                onPress={() => setUserOpeModalVisible(false)}
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
                                onPress={() => setUserOpeModalVisible(false)}
                            />
                        </View>
                    </BottomModal>
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
