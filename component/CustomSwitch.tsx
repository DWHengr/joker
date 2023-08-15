import {Switch, View, Text} from "react-native";
import {theme} from "../pages/common/Theme";

export default function CustomSwitch({text, enabled, onValueChange}) {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>
            <Text style={{color: theme.primary}}>{text}</Text>
            <Switch
                style={{height: 36}}
                trackColor={{false: theme.secondary, true: theme.secondary}}
                thumbColor={enabled ? theme.primary : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={
                    (value) => {
                        if (onValueChange) onValueChange(value);
                    }
                }
                value={enabled}
            />
        </View>
    )
}
