import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {theme} from "../pages/common/Theme";

export default function CustomCheckBox({checks, onChecked, value}) {
    return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {checks?.map((item, index) =>
                <TouchableOpacity
                    activeOpacity={0.6}
                    key={index}
                    onPress={() => {
                        if (onChecked) onChecked(item.value)
                    }}
                >
                    <View
                        style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 12}}>
                        <View>
                            {value == item.value ?
                                <Image style={[styles.ImageStyles]} source={require("../assets/checked.png")}/> :
                                <Image style={[styles.ImageStyles]} source={require("../assets/unchecked.png")}/>
                            }
                        </View>
                        <Text style={{color: theme.primary, fontSize: 16}}>{item.key}</Text>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    ImageStyles: {
        width: 34,
        height: 34
    }
});

