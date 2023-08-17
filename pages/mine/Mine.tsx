import {Image, StyleSheet, Text, View} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import {theme} from "../common/Theme";

export default function Mine() {
    return (
        <View style={{alignItems: 'center'}}>
            <View style={{width: '100%', height: 200}}>
                <Image style={
                    {
                        width: '100%',
                        height: 200,
                        borderBottomLeftRadius: 30,
                        borderBottomRightRadius: 30
                    }}
                       source={require('../../assets/bg2.png')}/>
            </View>
            <View style={{
                width: '80%',
                height: 140,
                backgroundColor: '#ffffff',
                borderRadius: 20,
                marginTop: -70
            }}>

            </View>
            <SafeAreaView style={[styles.container]}>
                <Text>Mine</Text>
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: theme.containerBackgroundColor,
        paddingLeft: 32,
        paddingRight: 32
    },
});
