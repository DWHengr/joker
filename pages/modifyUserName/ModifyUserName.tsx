import {StyleSheet, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "../common/Theme";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";

export default function ModifyUserName() {
    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{height: "100%"}}>
                <CustomHeaderReturn title='更改名称' isReturn={true}/>
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
