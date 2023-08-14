import {StyleSheet, ScrollView, Text, View, TouchableOpacity, Image, TextInput} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";
import {Button} from "@rneui/themed";
import {useState} from "react";
import PokerSegmentPicker from "../../component/PokerSegmentPicker";
import {LinearGradient} from 'expo-linear-gradient';


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

const userInfos = [
    {
        id: '1',
        name: 'Heath',
        score: 100,
        portrait: '',
        status: '正在结算中...',
        isDealers: true,
        isOwner: true,
    },
    {
        id: '2',
        name: 'Heath2',
        score: 100,
        portrait: '',
        status: '牛2',
        isDealers: false,
        isOwner: false,
    },
    {
        id: '3',
        name: 'Heath3',
        score: -20,
        portrait: '',
        status: '正在结算中...',
        isDealers: false,
        isOwner: false,
    },
    {
        id: '4',
        name: 'Heath4',
        score: 100,
        portrait: '',
        status: '没牛',
        isDealers: false,
        isOwner: false,
    },
    {
        id: '5',
        name: 'Heath5',
        score: 100,
        portrait: '',
        status: '正在结算中...',
        isDealers: false,
        isOwner: false,
    },
    {
        id: '6',
        name: 'Heath5',
        score: 100,
        portrait: '',
        status: '正在结算中...',
        isDealers: false,
        isOwner: false,
    },
    {
        id: '7',
        name: 'Heath5',
        score: 100,
        portrait: '',
        status: '正在结算中...',
        isDealers: false,
        isOwner: false,
    },
    {
        id: '8',
        name: 'Heath5',
        score: 100,
        portrait: '',
        status: '正在结算中...',
        isDealers: false,
        isOwner: false,
    },
];


export default function Douniu() {
    const [pokerVisible, setPokerVisible] = useState(false);
    const [currentSelectionCardIndex, setCurrentSelectionCardIndex] = useState(0);
    const [niuResult, setNiuResult] = useState(-1);
    const [scoreResult, setScoreResult] = useState(-1);
    const [cards, setCards] = useState([
        {num: "A", suit: "heart"},
        {num: "K", suit: "club"},
        {num: "J", suit: "diamond"},
        {num: "Q", suit: "spade"},
        {num: "8", suit: "heart"},
    ])

    const onSelectCardAndNum = async (cardIndex) => {
        await setCurrentSelectionCardIndex(cardIndex);
        setPokerVisible(true);
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
    return (
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
            <CustomHeaderReturn title='斗牛' isReturn={true}></CustomHeaderReturn>
            <View style={{backgroundColor: '#ffffff', height: '100%'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 15}}>
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
                                    <Button
                                        onPress={onCalculateNiu}
                                        ViewComponent={LinearGradient}
                                        linearGradientProps={{
                                            colors: [theme.secondary, theme.minor],
                                            start: {x: 0, y: 0.5},
                                            end: {x: 1, y: 0.5},
                                        }}
                                        buttonStyle={{
                                            borderRadius: 15,
                                            backgroundColor: theme.minor,
                                        }}
                                    >
                                        <Text style={{color: '#ffffff'}}>计算牛牛</Text>
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={[styles.userInfoListContainer]}>
                    <View>
                        <Text>房间号：10888</Text>
                    </View>
                    <View style={{flexDirection: 'row', height: 50, justifyContent: 'center', alignItems: 'center'}}>
                        <Button
                            size='sm'
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: [theme.secondary, theme.minor],
                                start: {x: 0, y: 0.5},
                                end: {x: 1, y: 0.5},
                            }}
                            buttonStyle={{
                                width: 30,
                                borderRadius: 5,
                                backgroundColor: theme.minor,
                            }}
                        >
                            <Text style={{color: '#ffffff'}}>-</Text>
                        </Button>
                        <View style={{
                            width: 40
                        }}>
                            <TextInput
                                style={{
                                    color: theme.secondary,
                                    borderRadius: 4,
                                    paddingLeft: 2,
                                    paddingRight: 2,
                                    backgroundColor: theme.minor,
                                }}
                                keyboardType="numeric"
                                value={scoreResult}
                                placeholder="得分"
                                placeholderTextColor={theme.secondary}
                                onChangeText={(text) => setScoreResult(text.replace(/[^-0-9]/g, ''))}
                            ></TextInput>
                        </View>
                        <Button
                            size='sm'
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: [theme.secondary, theme.minor],
                                end: {x: 0, y: 0.5},
                                start: {x: 1, y: 0.5},
                            }}
                            buttonStyle={{
                                width: 30,
                                borderRadius: 5,
                                backgroundColor: theme.minor,
                            }}
                        >
                            <Text style={{color: '#ffffff'}}>+</Text>
                        </Button>
                        <Button
                            size='sm'
                            onPress={onCalculateNiu}
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: [theme.secondary, theme.minor],
                                start: {x: 0, y: 0.5},
                                end: {x: 1, y: 0.5},
                            }}
                            buttonStyle={{
                                width: 90,
                                borderRadius: 5,
                                marginLeft: 2,
                                backgroundColor: theme.minor,
                            }}
                        >
                            <Text style={{color: '#ffffff'}}>提交</Text>
                        </Button>
                        <Button
                            size='sm'
                            onPress={onCalculateNiu}
                            ViewComponent={LinearGradient}
                            linearGradientProps={{
                                colors: [theme.secondary, theme.minor],
                                end: {x: 0, y: 0.5},
                                start: {x: 1, y: 0.5},
                            }}
                            buttonStyle={{
                                width: 90,
                                borderRadius: 5,
                                marginLeft: 2,
                                backgroundColor: theme.minor,
                            }}
                        >
                            <Text style={{color: '#ffffff'}}>准备</Text>
                        </Button>
                    </View>
                    <ScrollView style={{height: '70%', width: '100%',}}>
                        <View>
                            {
                                userInfos?.map(info => (
                                    <View
                                        key={info.id}
                                        style={[styles.userInfoContainer]}>
                                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                            <View style={{width: 50, height: 50, borderRadius: 10}}>
                                                <Image style={{width: 50, height: 50, borderRadius: 10}}
                                                       source={{
                                                           uri: 'http://pic.imeitou.com/uploads/allimg/211216/3-21121609215O03.jpg'
                                                       }}>
                                                </Image>
                                            </View>
                                            <View style={{marginLeft: 6}}>
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text style={{color: theme.secondary}}>{info.name}</Text>
                                                    {
                                                        info.isOwner ? <Image
                                                            style={{
                                                                height: 20,
                                                                width: 20
                                                            }}
                                                            source={require('../../assets/owner.png')}
                                                        /> : <></>
                                                    }
                                                    {
                                                        info.isDealers ? <Image
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
                                                    color: info.score > 0 ? '#63ad4f' : theme.minor,
                                                    fontWeight: 600
                                                }}>{info.score}</Text>
                                            </View>
                                        </View>
                                        <View
                                            style={{width: 100, alignItems: 'center'}}><Text>{info.status}</Text></View>
                                    </View>
                                ))
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        </SafeAreaView>
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
        margin: 10,
        marginTop: 20,
        padding: 20,
        height: '70%',
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
