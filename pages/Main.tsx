import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./login/Login";
import Home from "./home/Home";


export type RootStackParamList = {
    Login: undefined,
    Home: undefined
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
                name="Home"
                component={Home}
                options={{headerShown: false}}
            ></Stack.Screen>
        </Stack.Navigator>
    )
}
