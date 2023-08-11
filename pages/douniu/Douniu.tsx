import {StyleSheet, ScrollView, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";

export default function Douniu() {
    return (
        <SafeAreaView style={[styles.container]}>
            <CustomHeaderReturn title='斗牛' isReturn={true}></CustomHeaderReturn>
            <ScrollView style={{backgroundColor: '#ffffff'}}>
                <Text>斗牛</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.containerBackgroundColor,
        flex: 1
    },
});
