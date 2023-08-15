import {Image, Text, TouchableOpacity, View} from "react-native";
import React from "react";

export default function IconTextButton({source, text, onPress, style}) {
    return (
        <TouchableOpacity
            onPress={
                () => {
                    if (onPress) onPress();
                }
            }
            style={style}
        >
            <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <View style={{
                    width: 50,
                    height: 50,
                    borderRadius: 50,
                    backgroundColor: '#efefef',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        style={{width: 38, height: 38}}
                        source={source}
                    />
                </View>
                <Text>{text}</Text>
            </View>
        </TouchableOpacity>
    )
}
