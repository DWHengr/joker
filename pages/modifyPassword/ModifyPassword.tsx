import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, Text, View} from "react-native";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";
import CustomTextInput from "../../component/CustomTextInput";
import GradualButton from "../../component/GradualButton";
import {useState} from "react";
import {modifyPassword} from "../../api/user";
import {toastError, toastInfo} from "../../utils/toast";
import {removeLoginInfo} from "../../storage/user";
import {useGlobalContext} from "../../component/GlobalContextProvider";

export default function ModifyPassword() {

    const globalContext = useGlobalContext();
    let [oldPassword, setOldPassword] = useState("")
    let [newPassword, setNewPassword] = useState("")
    let [confirmPassword, setConfirmPassword] = useState("")

    const onModifyPassword = () => {
        if (newPassword != confirmPassword) {
            toastError("新密码与确认密码不一致~")
            return
        }
        modifyPassword({oldPassword, newPassword}).then(res => {
            if (res.code == 0) {
                toastInfo("修改成功~")
                removeLoginInfo()
                globalContext.setIsLogin(false)
            } else {
                toastError(res.msg ? res.msg : "名称修改失败~")
            }
        })
    }


    return (

        <SafeAreaView style={[styles.container]}>
            <View style={{height: "100%"}}>
                <CustomHeaderReturn title='修改密码' isReturn={true}/>
                <View style={{alignItems: 'center', padding: 20, backgroundColor: '#fff', height: '100%'}}>
                    <CustomTextInput
                        value={oldPassword}
                        type="password"
                        onChangeText={(value) => setOldPassword(value)}
                        placeholder="原密码"
                        limit={16}
                    />
                    <CustomTextInput
                        value={newPassword}
                        type="password"
                        onChangeText={(value) => setNewPassword(value)}
                        placeholder="新密码"
                        limit={16}
                    />
                    <CustomTextInput
                        value={confirmPassword}
                        type="password"
                        onChangeText={(value) => setConfirmPassword(value)}
                        placeholder="确认密码"
                        limit={16}
                    />

                    <View style={{width: '50%', marginTop: 30}}>
                        <GradualButton
                            disabled={oldPassword && newPassword && confirmPassword ? false : true}
                            size='lg'
                            buttonStyle={{
                                borderRadius: 20,
                            }}
                            onPress={onModifyPassword}
                            text='确 定'
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    },
});
