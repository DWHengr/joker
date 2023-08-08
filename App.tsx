import {Dimensions, StyleSheet} from 'react-native';
import {NavigationContainer} from "@react-navigation/native";
import Main from "./pages/Main";
import {MenuProvider} from "react-native-popup-menu";

export default function App() {
    return (
        <NavigationContainer style={[styles.container]}>
            <MenuProvider>
                <Main></Main>
            </MenuProvider>
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('screen').height
    },
});
