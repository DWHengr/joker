import {StyleSheet, View, Text} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "../common/Theme";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import CustomTextInput from "../../component/CustomTextInput";
import GradualButton from "../../component/GradualButton";
import {useState} from "react";

export default function ModifyUserName() {
    const [newUserNane, setNewUserName] = useState("");
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{height: "100%"}}>
                <CustomHeaderReturn title='更改名称' isReturn={true}/>
                <View style={{alignItems: 'center', padding: 20, backgroundColor: '#fff', height: '100%'}}>
                    <CustomTextInput value={newUserNane} onChangeText={(value) => setNewUserName(value)}/>
                    <View style={{alignItems: 'flex-start', width: '100%'}}>
                        <Text style={{color: theme.secondary}}>修改一个好听的名字。</Text>
                    </View>
                    <View style={{width: '50%', marginTop: 20}}>
                        <GradualButton
                            disabled={newUserNane ? false : true}
                            size='lg'
                            buttonStyle={{
                                borderRadius: 20,
                            }}
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
