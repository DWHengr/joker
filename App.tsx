import {Dimensions, StyleSheet, View} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Main from "./pages/Main";
import {MenuProvider} from "react-native-popup-menu";
import CustomLoadingProvider from "./component/CustomLoadingProvider";
import {useCallback, useEffect, useState} from "react";
import {getToken, removeLoginInfo} from "./storage/user";
import * as SplashScreen from 'expo-splash-screen';
import {GlobalContext} from "./component/GlobalContextProvider";
import {CustomResponseInterceptor} from "./utils/fetch";

SplashScreen.preventAutoHideAsync();
export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    CustomResponseInterceptor((response) => {
        if (response.code == -1) {
            removeLoginInfo();
            setIsLogin(false);
        }
    })

    useEffect(() => {
        (async function () {
            try {
                const token = await getToken();
                setIsLogin(!!token)
            } finally {
                setAppIsReady(true);
            }
        })()
    }, []);

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    if (!appIsReady) {
        return null;
    }

    return (
        <View style={[styles.container]} onLayout={onLayoutRootView}>
            <NavigationContainer>
                <GlobalContext.Provider value={{isLogin, setIsLogin}}>
                    <MenuProvider>
                        <CustomLoadingProvider>
                            <Main isLogin={isLogin}></Main>
                        </CustomLoadingProvider>
                    </MenuProvider>
                </GlobalContext.Provider>
            </NavigationContainer>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height
    },
});
