import {useRef} from "react";
import {Menu, MenuOption, MenuOptions, MenuTrigger} from "react-native-popup-menu";
import {TouchableOpacity, StyleSheet, Text} from "react-native";
import {theme} from "../pages/common/Theme";
import {Entypo} from "@expo/vector-icons";

export default function IconSelectMenu({options, type}) {
    const menu = useRef<Menu>(null)
    const openMenu = () => {
        menu.current.open().catch();
    }
    return (
        <Menu ref={menu}>
            <MenuTrigger>
                <TouchableOpacity onPress={openMenu} hitSlop={{top: 20, right: 20, bottom: 20, left: 20,}}>
                    <Entypo name={type} size={20} color={theme.primary}/>
                </TouchableOpacity>
            </MenuTrigger>

            <MenuOptions customStyles={{optionsContainer: {marginTop: 20, width: 120}}}>
                {
                    options.map((item, index) =>
                        <MenuOption
                            key={index}
                            style={[styles.menuOption]}
                            onSelect={() => item.onPress()}>
                            <Text style={[styles.text]}>
                                {item.title}
                            </Text>
                        </MenuOption>)
                }
            </MenuOptions>
        </Menu>
    );
}

const styles = StyleSheet.create({
    menuOption: {
        height: 44,
        justifyContent: 'center',
        borderBottomColor: theme.containerBackgroundColor,
        borderBottomWidth: 0.5,
        borderBottomStyle: 'solid'
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '400',
        color: theme.primary
    }
})
