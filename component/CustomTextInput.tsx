import {StyleSheet, TextInput, Text, View} from "react-native";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {theme} from "../pages/common/Theme";
import {useState} from "react";

export default function CustomTextInput({placeholder, value, onChangeText, type = 'text', limit = 0}) {
    const [isShowPassword, setIsShowPassword] = useState(true);
    return (
        <View style={[styles.textInputBox]}>
            <TextInput
                maxLength={limit == 0 ? 100 : limit}
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
            {limit != 0 && <View>
                <Text style={{color: value.length >= limit ? '#ff7171' : theme.secondary}}>{value.length}/{limit}</Text>
            </View>
            }
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
