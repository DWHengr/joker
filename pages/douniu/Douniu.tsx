import {StyleSheet, ScrollView, Text, View, TouchableOpacity, Image} from 'react-native'
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


export default function Douniu() {
    const [pokerVisible, setPokerVisible] = useState(false);
    const [currentSelectionCardIndex, setCurrentSelectionCardIndex] = useState(0);
    const [niuResult, setNiuResult] = useState(-1);
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
                <View style={{
                    backgroundColor: '#efefef',
                    margin: 10,
                    marginTop: 20,
                    padding: 20,
                    height: '70%',
                    borderRadius: 20
                }}>
                    <View>
                        <Text>房间号：112</Text>
                    </View>
                    <ScrollView style={{height: '70%', width: '100%',}}>
                        <View>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
                            <Text>222</Text>
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
    }

});
