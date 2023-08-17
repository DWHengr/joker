import {Text, StyleSheet, View, Image, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../Main";
import {LinearGradient} from "expo-linear-gradient";
import {theme} from "../common/Theme";
import GradualButton from "../../component/GradualButton";
import {Ionicons, AntDesign} from '@expo/vector-icons';
import {useState} from "react";

export default function Login() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(false)

    const onLogin = () => {
        navigation.navigate("Tab")
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <LinearGradient
                colors={[theme.secondary, theme.primary]}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 1}}
                style={[styles.container]}
            >
                <View style={{height: 260, width: '100%', justifyContent: 'flex-end', marginTop: -40}}>
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
                            <View style={{width: '90%'}}>
                                <TouchableWithoutFeedback>
                                    <View style={[styles.loginTextInputBox]}>
                                        <TextInput
                                            style={[styles.loginTextInput]}
                                            placeholder="手机号或邮箱"
                                            placeholderTextColor="#b2b2b2"
                                            value={username}
                                            onChangeText={(value) => setUsername(value)}
                                        />
                                        {username &&
                                            <AntDesign
                                                style={{marginLeft: 4, marginRight: 4}}
                                                onPress={() => setUsername("")}
                                                name="closecircle" size={16}
                                                color="#b2b2b2"
                                            />
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                                <View style={[styles.loginTextInputBox]}>
                                    <TextInput
                                        style={[styles.loginTextInput]}
                                        secureTextEntry={!isShowPassword}
                                        placeholder="密码"
                                        placeholderTextColor="#b2b2b2"
                                        value={password}
                                        onChangeText={(value) => setPassword(value)}
                                    />
                                    {password &&
                                        <AntDesign
                                            style={{marginLeft: 4, marginRight: 4}}
                                            onPress={() => setPassword("")}
                                            name="closecircle" size={16}
                                            color="#b2b2b2"
                                        />
                                    }
                                    {isShowPassword ?
                                        <Ionicons
                                            onPress={() => setIsShowPassword(false)}
                                            style={{marginLeft: 4, marginRight: 4}}
                                            name="md-eye-outline" size={20}
                                            color="#b2b2b2"/> :
                                        <Ionicons
                                            onPress={() => setIsShowPassword(true)}
                                            style={{marginLeft: 4, marginRight: 4}}
                                            name="md-eye-off-outline" size={20}
                                            color="#b2b2b2"/>
                                    }
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 5}}><Text
                                    style={{color: theme.secondary}}>忘记密码?</Text></View>
                            </View>
                            <View style={{width: '70%', margin: 20}}>
                                <GradualButton
                                    size='lg'
                                    buttonStyle={{
                                        borderRadius: 20,
                                    }}
                                    text='登 录'
                                    onPress={onLogin}
                                />
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
        padding: 30,
        marginTop: -40,
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
    }
});
