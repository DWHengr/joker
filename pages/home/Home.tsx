import {
    ScrollView,
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity,
    BackHandler,
    TouchableWithoutFeedback
} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useCallback, useEffect, useState} from "react";
import {toastError, toastInfo} from "../../utils/toast";
import {getRoomNumber, removeRoomInfo} from "../../storage/user";
import {roomInfoByCurrentUser} from "../../api/room";

export default function Home() {

    const navigation = useNavigation();
    const [roomNumber, setRoomNumber] = useState("");
    let backClickCount = 0;

    const onNavigate = (page: string) => {
        navigation.navigate(page);
    };

    const handleBackPress = () => {
        console.log(backClickCount)
        if (backClickCount < 1) {
            backClickCount++;
            toastInfo("再按一次退出")
            return true;
        }
        BackHandler.exitApp();
        return false;
    };

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
            return () => {
                backHandler.remove();
            };
        }, [])
    );

    useEffect(() => {
        getRoomNumber().then(res => {
            setRoomNumber(res);
        })
    }, []);

    const enterRoom = () => {
        roomInfoByCurrentUser().then(res => {
            if (res.code == 0 && res.data) {
                onNavigate('Room')
            } else {
                setRoomNumber(null);
                if (res.msg)
                    toastError(res.msg)
                removeRoomInfo();
            }
        })
    }

    return (
        <TouchableWithoutFeedback onPress={() => backClickCount = 0}>
            <SafeAreaView style={[styles.container]}>
                <CustomHeaderReturn title='首页' isReturn={false}></CustomHeaderReturn>
                <ScrollView style={{backgroundColor: '#ffffff'}}>
                    {roomNumber ?
                        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                            <View style={[styles.optionContainer]}>
                                <Image style={[StyleSheet.absoluteFill, styles.optionImg]}
                                       source={require('../../assets/bg.png')}/>
                                <TouchableOpacity onPress={enterRoom}>
                                    <View style={[styles.optionCard]}>
                                        <Text style={[styles.titleText]}>进入房间</Text>
                                        <View style={[styles.roomTitleText]}>
                                            <Text
                                                style={{color: '#f1f1f1', fontSize: 12,}}>房间号: {roomNumber}</Text>
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View> :
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={[styles.optionContainer]}>
                                    <Image style={[StyleSheet.absoluteFill, styles.optionImg]}
                                           source={require('../../assets/bg.png')}/>
                                    <TouchableOpacity onPress={() => onNavigate('CreateRoom')}>
                                        <View style={[styles.optionCard]}>
                                            <Text style={[styles.titleText]}>创建房间</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                                <View style={[styles.optionContainer]}>
                                    <Image style={[StyleSheet.absoluteFill, styles.optionImg]}
                                           source={require('../../assets/bg.png')}/>
                                    <TouchableOpacity onPress={() => onNavigate('JoinRoom')}>
                                        <View style={[styles.optionCard]}>
                                            <Text style={[styles.titleText]}>加入房间</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    }
                </ScrollView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.containerBackgroundColor,
        flex: 1
    },
    optionContainer: {
        height: 80,
        width: '90%',
        marginTop: 10,
        borderRadius: 20
    },
    optionImg: {
        width: '100%',
        height: 80,
        borderRadius: 20,
        opacity: 0.6
    },
    optionCard: {
        borderRadius: 20,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleText: {
        fontSize: 30,
        color: theme.primary,
        textShadowOffset: {width: 2, height: 2},
        textShadowRadius: 10,
        textShadowColor: theme.secondary,
    },
    roomTitleText: {
        marginTop: 1,
        marginLeft: 10,
        marginBottom: 10,
        marginRight: 10,
        borderRadius: 5,
        backgroundColor: "#173757b0",
        padding: 2,
        position: 'absolute',
        top: 0,
        left: 0,
    }
});
