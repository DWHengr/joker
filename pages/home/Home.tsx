import {StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";

export default function Login() {
    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Home</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 32,
        paddingRight: 32
    },
});
