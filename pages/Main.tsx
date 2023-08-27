import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./login/Login";
import Home from "./home/Home";
import Tab from "./tab/Tab";
import Douniu from "./douniu/Douniu";
import {View} from "react-native";
import Toast from "react-native-toast-message";
import {toastConfig} from "../utils/toast";
import CreateRoom from "./createRoom/CreateRoom";

export type RootStackParamList = {
    Login: undefined,
    Home: undefined,
    Tab: undefined
}

export default function Main() {

    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <>
            <View style={{zIndex: 999}}>
                <Toast config={toastConfig}/>
            </View>
            <Stack.Navigator
                initialRouteName='Login'
                screenOptions={({route}) => ({
                    headerShown: !['Login'].includes(route.name),
                    gestureEnabled: true
                })}>
                < Stack.Screen
                    name="Login"
                    component={Login}
                    options={{headerShown: false}}
                ></Stack.Screen>
                < Stack.Screen
                    name="Tab"
                    component={Tab}
                    options={{headerShown: false}}
                ></Stack.Screen>
                < Stack.Screen
                    name="Home"
                    component={Home}
                    options={{headerShown: false}}
                ></Stack.Screen>
                < Stack.Screen
                    name="Douniu"
                    component={Douniu}
                    options={{headerShown: false}}
                ></Stack.Screen>
                < Stack.Screen
                    name="CreateRoom"
                    component={CreateRoom}
                    options={{headerShown: false}}
                ></Stack.Screen>
            </Stack.Navigator>
        </>
    )
}
