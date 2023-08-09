import {StyleSheet, Image, TouchableOpacity, Text, View} from 'react-native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import Home from "../home/Home";


const tabIcons = {
    Home: [require('../../assets/home.png'), require('../../assets/home_active.png')],
}

const Tabs = createBottomTabNavigator();


function CustomTabBar({state, navigation, descriptors}: any) {
    return (
        <View style={styles.tabBarBox}>
            {state.routes.map((route: any, index: any) => {
                const routeName = route.name
                const {options} = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : routeName;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate({name: routeName, merge: true});
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                function ButtonTabBar() {
                    return (<TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? {selected: true} : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={[styles.tabBarItem]}
                    >
                        <Image style={[{width: 24, height: 24}]}
                               source={tabIcons[routeName][Number(isFocused)]}
                        />
                        <Text style={[styles.tabBarItemText, isFocused ? styles.tabBarItemTextActive : {}]}>
                            {label}
                        </Text>
                    </TouchableOpacity>)
                }

                return (
                    <ButtonTabBar key={route.key}></ButtonTabBar>
                );
            })}
        </View>
    )
}

export default function Tab() {
    return (
        <Tabs.Navigator
            tabBar={props => <CustomTabBar {...props}/>}
            screenOptions={
                {tabBarActiveTintColor: '#441188', tabBarStyle: {paddingBottom: 4, paddingTop: 4},}
            }
        >
            <Tabs.Screen
                name="Home"
                options={{
                    headerShown: false,
                    tabBarLabel: '首页',
                    unmountOnBlur: true
                }}
                component={Home}
            >
            </Tabs.Screen>
            {/*<Tabs.Screen*/}
            {/*    name="Mine"*/}
            {/*    options={{*/}
            {/*        headerShown: false,*/}
            {/*        tabBarLabel: '我的',*/}
            {/*        unmountOnBlur: true*/}
            {/*    }}*/}
            {/*    component={Mine}*/}
            {/*>*/}
            {/*</Tabs.Screen>*/}
        </Tabs.Navigator>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingLeft: 32,
        paddingRight: 32
    },
    tabBarBox: {
        flexDirection: 'row',
        backgroundColor: '#cdcdcd',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    tabBarItem: {
        flex: 1,
        alignItems: 'center',
    },
    tabBarItemText: {
        fontSize: 12,
        fontWeight: '400',
        textAlign: 'center',
        color: '#1C1C1E'
    },
    tabBarItemTextActive: {
        color: '#441188'
    },
});
