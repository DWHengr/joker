import {ScrollView, StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native'
import {SafeAreaView} from "react-native-safe-area-context";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";
import {useNavigation} from "@react-navigation/native";

export default function Login() {

    const navigation = useNavigation();

    const onNavigate = (page: string) => {
        navigation.navigate(page);
    };
    return (
        <SafeAreaView style={[styles.container]}>
            <CustomHeaderReturn title='首页' isReturn={false}></CustomHeaderReturn>
            <ScrollView style={{backgroundColor: '#ffffff'}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={[styles.optionContainer]}>
                        <Image style={[StyleSheet.absoluteFill, styles.optionImg]}
                               source={require('../../assets/img.jpg')}/>
                        <TouchableOpacity onPress={() => onNavigate('Douniu')}>
                            <View style={[styles.optionCard]}>
                                <Text style={{fontSize: 30, color: '#efefef'}}>斗牛</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.containerBackgroundColor,
        flex: 1
    },
    optionContainer: {
        height: 80,
        width: '90%',
        marginTop: 10,
        borderRadius: 20
    },
    optionImg: {
        width: '100%',
        height: 80,
        borderRadius: 20,
        opacity: 0.6
    },
    optionCard: {
        borderRadius: 20,
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
});
