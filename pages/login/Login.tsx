import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity
} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../Main";
import {LinearGradient} from "expo-linear-gradient";
import {theme} from "../common/Theme";
import GradualButton from "../../component/GradualButton";
import {useState} from "react";
import {login} from "../../api/user";
import {toastError, toastInfo} from "../../utils/toast";
import {setLoginInfo} from "../../storage/user";
import CustomTextInput from "../../component/CustomTextInput";
import {useLoading} from "../../component/CustomLoadingProvider";

export default function Login() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const loading = useLoading()

    const onLogin = () => {
        if (!username) {
            toastError("用户名不能为空");
            return;
        }
        if (!password) {
            toastError("密码不能为空");
            return;
        }
        loading.showLoading("登录中...");
        login({account: username, password}).then(res => {
            if (res.code == 0) {
                setLoginInfo(res.data);
                navigation.reset({
                    index: 0,
                    routes: [{name: 'Tab'}],
                })
            } else {
                toastError(res.msg);
            }
        }).finally(() => loading.hideLoading())
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={[theme.secondary, theme.primary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[styles.container]}
            >
                <View style={{height: 200, width: '100%', justifyContent: 'flex-end', marginTop: -40}}>
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#ffffff'
                    }}>
                        <Image
                            style={{height: "100%", width: "100%"}}
                            source={require('../../assets/bg.png')}/>
                    </View>
                </View>
                <SafeAreaView style={{flexDirection: 'column', alignItems: 'center'}}>
                    <View style={[styles.loginContainer]}>
                        <View style={{width: '100%', alignItems: 'center'}}>
                            <View style={{width: '90%', flexDirection: 'row', marginBottom: 20}}>
                                <View>
                                    <Image
                                        style={{height: 60, width: 60, borderRadius: 5}}
                                        source={require('../../assets/icon.png')}/>
                                </View>
                                <View style={{paddingLeft: 10}}>
                                    <Text style={{fontSize: 10, color: theme.secondary}}>Hi! 欢迎使用</Text>
                                    <View style={{alignItems: 'flex-end'}}>
                                        <Text style={{
                                            fontSize: 24,
                                            color: theme.primary,
                                            textShadowOffset: {width: 0.8, height: 0.8},
                                            textShadowRadius: 5,
                                            textShadowColor: theme.secondary,
                                            fontWeight: 600
                                        }}>博弈计分</Text>
                                        <Text style={{fontSize: 10, color: theme.secondary}}>博弈精彩人生!</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={{width: '90%', marginTop: 10}}>
                                <CustomTextInput
                                    placeholder="手机号或邮箱"
                                    value={username}
                                    onChangeText={(value) => setUsername(value)}
                                />
                                <CustomTextInput
                                    placeholder="密码"
                                    type="password"
                                    value={password}
                                    onChangeText={(value) => setPassword(value)}
                                />
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}><Text
                                    style={{color: theme.secondary}}>忘记密码?</Text></View>
                            </View>
                            <View style={{width: '70%', margin: 20}}>
                                <GradualButton
                                    disabled={username && password ? false : true}
                                    size='lg'
                                    buttonStyle={{
                                        borderRadius: 20,
                                    }}
                                    text='登 录'
                                    onPress={onLogin}
                                />
                            </View>
                            <View style={{
                                width: "30%",
                                marginTop: 50,
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center'
                            }}>
                                <View style={{width: '100%', height: 1, backgroundColor: "#d0d0d0"}}></View>
                                <Text
                                    style={{marginLeft: 10, marginRight: 10, color: theme.secondary}}>第三方登录</Text>
                                <View style={{width: '100%', height: 1, backgroundColor: "#d0d0d0"}}></View>
                            </View>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => toastInfo('功能暂未上线~')}
                                >
                                    <Image style={[styles.thirdPartyIcon]}
                                           source={require("../../assets/wechat.png")}/>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => toastInfo('功能暂未上线~')}
                                >
                                    <Image style={[styles.thirdPartyIcon]}
                                           source={require("../../assets/qq.png")}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </LinearGradient>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginContainer: {
        height: '100%',
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 30,
        marginTop: -60,
        flexDirection: 'column',
    },
    loginTextInputBox: {
        flexDirection: 'row',
        borderRadius: 5,
        padding: 8,
        marginTop: 12,
        backgroundColor: theme.primary,
        alignItems: 'center'
    },
    loginTextInput: {
        flex: 1,
        color: "#b2b2b2",
        fontSize: 16,
    },
    thirdPartyIcon: {
        width: 50,
        height: 50,
        margin: 15
    }
});
