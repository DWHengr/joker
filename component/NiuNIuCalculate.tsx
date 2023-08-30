import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import GradualButton from "./GradualButton";
import PokerSegmentPicker from "./PokerSegmentPicker";
import {useState} from "react";


export default function NiuNIuCalculate() {

    const [cards, setCards] = useState([
        {num: "A", suit: "heart"},
        {num: "K", suit: "club"},
        {num: "J", suit: "diamond"},
        {num: "Q", suit: "spade"},
        {num: "8", suit: "heart"},
    ])

    const cardsImg =
        {
            heart: require('../assets/poker-heart.png'),
            diamond: require('../assets/poker-diamond.png'),
            club: require('../assets/poker-club.png'),
            spade: require('../assets/poker-spade.png')
        }

    const CardValues = {
        'A': 1, '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, '10': 10, 'J': 10, 'Q': 10, 'K': 10
    };

    const [pokerVisible, setPokerVisible] = useState(false);
    const [currentSelectionCardIndex, setCurrentSelectionCardIndex] = useState(0);
    const [niuResult, setNiuResult] = useState(-1);

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
        <View>
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
                                   source={require('../assets/niu.png')}/>
                            {niuResult == 10 && <Image style={{width: 20, height: 20}}
                                                       source={require('../assets/niu.png')}/>}
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
        </View>
    )
}

const styles = StyleSheet.create({
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
});

