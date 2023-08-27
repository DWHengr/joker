import {StyleSheet, TextInput, View} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {theme} from "../pages/common/Theme";
import {useState} from "react";

export default function CustomTextInput({placeholder, value, onChangeText, type = 'text'}) {
    const [isShowPassword, setIsShowPassword] = useState(true);
    return (
        <View style={[styles.textInputBox]}>
            <TextInput
                style={[styles.textInput]}
                placeholder={placeholder}
                secureTextEntry={type == 'password'}
                placeholderTextColor="#b2b2b2"
                value={value}
                onChangeText={(value) => {
                    if (onChangeText)
                        onChangeText(value);
                }}
            />
            {value &&
                <AntDesign
                    style={{marginLeft: 4, marginRight: 4}}
                    onPress={() => onChangeText("")}
                    name="closecircle" size={16}
                    color="#b2b2b2"
                />
            }
            {type == 'password' && (isShowPassword ?
                <Ionicons
                    onPress={() => setIsShowPassword(false)}
                    style={{marginLeft: 4, marginRight: 4}}
                    name="md-eye-outline" size={20}
                    color="#b2b2b2"/> :
                <Ionicons
                    onPress={() => setIsShowPassword(true)}
                    style={{marginLeft: 4, marginRight: 4}}
                    name="md-eye-off-outline" size={20}
                    color="#b2b2b2"/>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    textInputBox: {
        flexDirection: 'row',
        borderRadius: 5,
        padding: 8,
        marginTop: 12,
        backgroundColor: theme.primary,
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        color: "#b2b2b2",
        fontSize: 16,
    }
});
