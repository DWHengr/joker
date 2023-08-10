import {ScrollView, StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";


export default function Login() {
    return (
        <SafeAreaView style={[styles.container]}>
            <CustomHeaderReturn title='首页' isReturn={true}></CustomHeaderReturn>
            <ScrollView style={{backgroundColor: '#ffffff'}}>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
                <Text>Home</Text>
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
