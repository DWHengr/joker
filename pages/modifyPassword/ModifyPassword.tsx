import {SafeAreaView} from "react-native-safe-area-context";
import {StyleSheet, View} from "react-native";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";

export default function ModifyPassword() {
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{height: "100%"}}>
                <CustomHeaderReturn title='修改密码' isReturn={true}/>
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
