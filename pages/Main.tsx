import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Login from "./login/Login";
import Home from "./home/Home";
import Tab from "./tab/Tab";
import Room from "./room/Room";
import {View} from "react-native";
import Toast from "react-native-toast-message";
import {toastConfig} from "../utils/toast";
import CreateRoom from "./createRoom/CreateRoom";
import {StatusBar} from "expo-status-bar";
import JoinRoom from "./joinRoom/JoinRoom";
import QrScan from "./qrScan/QrScan";
import QrCreate from "./qrCreate/QrCreate";
import {useGlobalContext} from "../component/GlobalContextProvider";

export type RootStackParamList = {
    Login: undefined,
    Home: undefined,
    Tab: undefined
}

export default function Main() {
    const globalContext = useGlobalContext();
    
    const Stack = createNativeStackNavigator<RootStackParamList>();
    return (
        <>
            <View style={{zIndex: 999}}>
                <Toast config={toastConfig}/>
            </View>
            <StatusBar style="auto"/>
            <Stack.Navigator>
                {
                    !globalContext.isLogin ? (
                        < Stack.Screen
                            name="Login"
                            component={Login}
                            options={{headerShown: false}}
                        ></Stack.Screen>
                    ) : (
                        <>
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
                                name="Room"
                                component={Room}
                                options={{headerShown: false}}
                            ></Stack.Screen>
                            < Stack.Screen
                                name="CreateRoom"
                                component={CreateRoom}
                                options={{headerShown: false}}
                            ></Stack.Screen>
                            < Stack.Screen
                                name="JoinRoom"
                                component={JoinRoom}
                                options={{headerShown: false}}
                            ></Stack.Screen>
                            < Stack.Screen
                                name="QrScan"
                                component={QrScan}
                                options={{headerShown: false}}
                            ></Stack.Screen>
                            < Stack.Screen
                                component={QrCreate}
                                name="QrCreate"
                                options={{headerShown: false}}
                            ></Stack.Screen>
                        </>
                    )
                }
            </Stack.Navigator>
        </>
    )
}
