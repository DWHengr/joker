import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./login/Login";
import Home from "./home/Home";
import Tab from "./tab/Tab";
import Douniu from "./douniu/Douniu";


export type RootStackParamList = {
    Login: undefined,
    Home: undefined,
    Tab: undefined
}

export default function Main() {

    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
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
        </Stack.Navigator>
    )
}
