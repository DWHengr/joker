import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Entypo} from "@expo/vector-icons";
import {theme} from "../pages/common/Theme";

export default function OperationList({operations}) {
    return (
        <View style={{flexDirection: 'column'}}>
            {operations?.map((item, index) =>
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        if (item.onPress) item.onPress();
                    }}>
                    <View style={{
                        ...styles.listItemContainer,
                        ...(
                            index != operations.length - 1 ? {
                                borderBottomWidth: 1,
                                borderBottomColor: "#e8e8e8"
                            } : {}
                        )
                    }}>
                        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                            <Image style={{width: 28, height: 28, marginRight: 5}} source={item.icon}/>
                            <Text style={{fontSize: 15, color: theme.primary}}>{item.title}</Text>
                        </View>
                        <View>
                            <Entypo name="chevron-right" size={24} color={theme.primary}/>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    listItemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12
    }
})
