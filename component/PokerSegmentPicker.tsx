import SegmentedPicker from "react-native-segmented-picker";
import {theme} from "../pages/common/Theme";

export default function PokerSegmentPicker({visible, defaultSelections, onCancel, onConfirm, onValueChange}) {
    return (
        <SegmentedPicker
            visible={visible}
            size={0.4}
            confirmText="确定"
            confirmTextColor={theme.primary}
            defaultSelections={defaultSelections ? defaultSelections : {num: "6", suit: "club"}}
            options={[
                {
                    key: 'suit',
                    items: [
                        {label: '红桃', value: 'heart'},
                        {label: '方块', value: 'diamond'},
                        {label: '梅花', value: 'club'},
                        {label: '黑桃', value: 'spade'},
                    ],
                },
                {
                    key: 'num',
                    items: [
                        {label: 'A', value: 'A'},
                        {label: '2', value: '2'},
                        {label: '3', value: '3'},
                        {label: '4', value: '4'},
                        {label: '5', value: '5'},
                        {label: '6', value: '6'},
                        {label: '7', value: '7'},
                        {label: '8', value: '8'},
                        {label: '9', value: '9'},
                        {label: '10', value: '10'},
                        {label: 'J', value: 'J'},
                        {label: 'Q', value: 'Q'},
                        {label: 'K', value: 'K'},
                    ],
                },
            ]}
            onCancel={(selections) => {
                if (onCancel)
                    onCancel(selections)
            }}
            onConfirm={(selections) => {
                if (onConfirm)
                    onConfirm(selections)
            }}
            onValueChange={({column, value}) => {
                if (onValueChange)
                    onValueChange(column, value);
            }}
        />
    )
}
