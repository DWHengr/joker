import {Image, ScrollView, StyleSheet, Text, View} from 'react-native'
import {theme} from "../common/Theme";

export default function Mine() {
    return (
        <View style={{alignItems: 'center', height: '100%'}}>
            <View style={{width: '100%', height: 160}}>
                <Image style={[styles.bgContainer]}
                       source={require('../../assets/bg2.png')}/>
            </View>
            <View style={[styles.userInfoContainer]}>
                <View>
                    <Image style={{width: 60, height: 60, borderRadius: 30, marginTop: -30}}
                           source={{
                               uri: 'http://pic.imeitou.com/uploads/allimg/211216/3-21121609215O03.jpg'
                           }}>
                    </Image>
                </View>
                <Text style={{marginTop: 5, color: theme.primary, fontSize: 18}}>Heath</Text>
                <View style={{marginTop: 5, flexDirection: 'row'}}>
                    <Text style={{color: theme.secondary, fontSize: 14}}>18888888888</Text>
                    <Text style={{color: theme.secondary, fontSize: 14, marginLeft: 5}}>去修改 >></Text>
                </View>
            </View>
            <View style={[styles.contentContainer]}>
                <ScrollView style={{width: '100%'}}>
                    <Text>Mine</Text>
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contentContainer: {
        margin: 10,
        flex: 1
    },
    bgContainer: {
        width: '100%',
        height: 160,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30
    },
    userInfoContainer: {
        width: '90%',
        height: 100,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: -50,
        flexDirection: 'column',
        alignItems: 'center',
        shadowColor: theme.primary,
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    }
});
