import {Image, ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import {theme} from "../common/Theme";
import OperationList from "../../component/OperationList";
import {removeLoginInfo} from "../../storage/user";
import {useGlobalContext} from "../../component/GlobalContextProvider";
import {useCallback, useState} from "react";
import {getUserProfile} from "../../api/user";
import {toastError} from "../../utils/toast";
import {useFocusEffect, useNavigation} from "@react-navigation/native";
import {useLoading} from "../../component/CustomLoadingProvider";

export default function Mine() {
    const globalContext = useGlobalContext();
    const [userProfileInfo, setUserProfileInfo] = useState({name: "", portrait: "", phone: ""});
    const navigation = useNavigation();
    const loading = useLoading()

    const onLogout = () => {
        removeLoginInfo()
        globalContext.setIsLogin(false);
    }

    useFocusEffect(
        useCallback(() => {
            loading.showLoading("加载中...")
            getUserProfile().then(res => {
                if (res.code == 0) {
                    setUserProfileInfo(res.data)
                } else {
                    toastError(res.msg ? res.msg : "个人信息查询失败")
                }
            }).finally(() => {
                loading.hideLoading()
            })
        }, [])
    );

    return (
        <View style={[styles.container]}>
            <View style={{width: '100%', height: 160}}>
                <Image style={[styles.bgContainer]}
                       source={require('../../assets/bg2.png')}/>
            </View>
            <View style={[styles.userInfoContainer]}>
                <View>
                    <Image style={{width: 60, height: 60, borderRadius: 30, marginTop: -30}}
                           source={(userProfileInfo.portrait ? {uri: userProfileInfo.portrait} : require("../../assets/icon.png"))}>
                    </Image>
                </View>
                <Text style={{marginTop: 5, color: theme.primary, fontSize: 18}}>{userProfileInfo.name}</Text>
                <View style={{marginTop: 5, flexDirection: 'row'}}>
                    <Text style={{color: theme.secondary, fontSize: 14}}>{userProfileInfo.phone}</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("ModifyUserName")}>
                        <Text style={{color: theme.secondary, fontSize: 14, marginLeft: 5}}>去修改 >></Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={[styles.contentContainer]}>
                <ScrollView style={{flexDirection: 'column', width: '100%'}}>
                    <View style={{alignItems: 'center'}}>
                        <View style={[styles.operationListContainer]}>
                            <OperationList
                                operations={[
                                    {
                                        title: "个人信息",
                                        onPress: () => console.log(1),
                                        icon: require('../../assets/personal.png'),
                                    },
                                    {
                                        title: "我的记录",
                                        onPress: () => console.log(1),
                                        icon: require('../../assets/record.png'),
                                    }
                                ]}
                            />
                        </View>
                        <View style={[styles.operationListContainer]}>
                            <OperationList
                                operations={[
                                    {
                                        title: "关于我们",
                                        onPress: () => console.log(1),
                                        icon: require('../../assets/aboutus.png'),
                                    }
                                ]}
                            />
                        </View>
                        <View style={[styles.operationListContainer]}>
                            <OperationList
                                operations={[
                                    {
                                        title: "退出登录",
                                        onPress: onLogout,
                                        icon: require('../../assets/logout.png'),
                                    }
                                ]}
                            />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        height: '100%',
        flex: 1,
        backgroundColor: '#ffffff'
    },
    bgContainer: {
        width: '100%',
        height: 160,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    userInfoContainer: {
        width: '90%',
        height: 100,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: -50,
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: theme.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    contentContainer: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        marginTop: 10
    },
    operationListContainer: {
        width: '90%',
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        shadowColor: theme.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        margin: 10,
        borderRadius: 10,
        paddingLeft: 10,
        paddingRight: 10,
    }
});
