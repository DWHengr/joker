import {StyleSheet, View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "../common/Theme";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import CustomTextInput from "../../component/CustomTextInput";
import GradualButton from "../../component/GradualButton";
import {useState} from "react";
import {modifyName} from "../../api/user";
import {toastError} from "../../utils/toast";
import {useNavigation} from "@react-navigation/native";

export default function ModifyUserName() {
    const [newUserName, setNewUserName] = useState("");
    const navigation = useNavigation();

    const onModifyUserName = () => {
        modifyName({name: newUserName}).then(res => {
            if (res.code == 0) {
                navigation.goBack();
            } else {
                toastError(res.msg ? res.msg : "名称修改失败~")
            }
        })
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{height: "100%"}}>
                <CustomHeaderReturn title='更改名称' isReturn={true}/>
                <View style={{alignItems: 'center', padding: 20, backgroundColor: '#fff', height: '100%'}}>
                    <CustomTextInput
                        value={newUserName}
                        onChangeText={(value) => setNewUserName(value)}
                        limit={10}
                    />
                    <View style={{alignItems: 'flex-start', width: '100%'}}>
                        <Text style={{color: theme.secondary}}>修改一个好听的名字。</Text>
                    </View>
                    <View style={{width: '50%', marginTop: 20}}>
                        <GradualButton
                            disabled={newUserName ? false : true}
                            size='lg'
                            buttonStyle={{
                                borderRadius: 20,
                            }}
                            onPress={onModifyUserName}
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
