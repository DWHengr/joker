import {ScrollView, StyleSheet, Text} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";

export default function Login() {
    return (
        <ScrollView>
            <SafeAreaView style={[styles.container]}>
                <Text>Home</Text>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 32,
        paddingRight: 32
    },
});
