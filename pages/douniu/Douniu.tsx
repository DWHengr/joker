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

export default function Douniu() {
    const [pokerVisible, setPokerVisible] = useState(false);
    const [currentSelectionCardIndex, setCurrentSelectionCardIndex] = useState(0);
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
            <View style={{backgroundColor: '#ffffff'}}>
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
                                flexDirection: 'colum',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{width: 200}}>
                                    <Button
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
                            <View style={{
                                flexDirection: 'colum',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text>牛2</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{height: '100%'}}>
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
