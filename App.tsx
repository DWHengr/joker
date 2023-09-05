import {Dimensions, StyleSheet, Text} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Main from "./pages/Main";
import {MenuProvider} from "react-native-popup-menu";
import CustomLoadingProvider from "./component/CustomLoadingProvider";

export default function App() {
    return (
        <NavigationContainer style={[styles.container]}>
            <MenuProvider>
                <CustomLoadingProvider>
                    <Main></Main>
                </CustomLoadingProvider>
            </MenuProvider>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height
    },
});
