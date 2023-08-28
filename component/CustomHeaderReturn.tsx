import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {CommonActions, useNavigation} from "@react-navigation/native";
import {theme} from "../pages/common/Theme";

interface CustomHeaderProps {
    title: string,
    isReturn: boolean,
    returnPage: string
}

const CustomHeaderReturn = ({title, isReturn, returnPage = ''}: CustomHeaderProps) => {
    const navigation = useNavigation();

    const backAction = (returnPage) => {
        navigation.dispatch(
            CommonActions.reset({
                index: 1,
                routes: [
                    {name: returnPage},
                ],
            })
        );
    };

    const handleGoBack = () => {
        if (returnPage) {
            backAction(returnPage)
        } else {
            navigation.goBack();
        }
    };

    return (
        <View style={[styles.container]}>
            {isReturn ?
                <TouchableOpacity onPress={handleGoBack} hitSlop={{top: 10, right: 20, bottom: 10, left: 20}}>
                    <View style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        <Image
                            source={require(`../assets/return.png`)}
                            style={[styles.icon]}
                        />
                    </View>
                </TouchableOpacity>
                : <View style={{width: 20}}></View>
            }
            <Text style={[styles.title]}>{title}</Text>
            <View style={{width: 20}}></View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 42,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 2,
        backgroundColor: theme.containerBackgroundColor
    },
    title: {
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
    },
    icon: {
        width: 20,
        height: 20,
        alignSelf: "center"
    },
});
export default CustomHeaderReturn;
