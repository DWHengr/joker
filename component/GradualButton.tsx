import {Button} from "@rneui/themed";
import {LinearGradient} from "expo-linear-gradient";
import {theme} from "../pages/common/Theme";
import {Text} from "react-native";

export default function GradualButton({size, text, buttonStyle, isPros, onPress}) {
    return (
        <Button
            onPress={() => {
                if (onPress) onPress()
            }}
            size={size}
            ViewComponent={LinearGradient}
            linearGradientProps={{
                colors: [theme.secondary, theme.primary],
                end: isPros ? {x: 0, y: 0.5} : {x: 1, y: 0.5},
                start: isPros ? {x: 1, y: 0.5} : {x: 0, y: 0.5},
            }}
            buttonStyle={{
                ...buttonStyle,
                backgroundColor: theme.primary,
            }}
        >
            <Text style={{color: '#ffffff'}}>{text}</Text>
        </Button>
    )
}
