import {Text, StyleSheet} from 'react-native'
import {SafeAreaView} from 'react-native-safe-area-context'
import {Button} from "@rneui/base";
import {useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";
import {RootStackParamList} from "../Main";

export default function Login() {

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Login'>>()

    const onLogin = () => {
        navigation.navigate("Home")
    }

    return (
        <SafeAreaView style={[styles.container]}>
            <Text>Login</Text>
            <Button
                onPress={onLogin}
            >
                <Text>进入</Text>
            </Button>
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
