import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, Image, Text, Animated, Dimensions, TouchableOpacity} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import {BarCodeScanner} from 'expo-barcode-scanner';
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {theme} from "../common/Theme";
import {Camera} from "expo-camera";
import {toastError} from "../../utils/toast";
import * as ImagePicker from 'expo-image-picker';
import {userJoinRoomByToken} from "../../api/userRoom";
import {setCreatedRoomInfo} from "../../storage/user";
import {useNavigation} from "@react-navigation/native";

export default function QRScannerScreen() {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const anim = useRef(new Animated.Value(0)).current;
    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const {status} = await BarCodeScanner.requestPermissionsAsync();
            const {imageStatus} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            setHasPermission(status && imageStatus && status === 'granted' && imageStatus.status === 'granted');
        })();

        const screenHeight = Dimensions.get('window').height;

        Animated.loop(
            Animated.sequence([
                Animated.timing(anim, {
                    toValue: screenHeight - 50,
                    duration: 4000,
                    useNativeDriver: true
                }),
                Animated.timing(anim, {
                    toValue: 0,
                    duration: 4000,
                    useNativeDriver: true
                }),
            ])
        ).start();

    }, []);

    const joinRoom = (token) => {
        userJoinRoomByToken({qrToken: token}).then(res => {
            if (res.code == 0) {
                setCreatedRoomInfo(res.data)
                navigation.navigate("Room")
            } else {
                setScanned(false);
                toastError(res.msg ? res.msg : "加入房间失败")
            }
        })
    }

    const pickImageFromGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const barcodes = await BarCodeScanner.scanFromURLAsync(result.assets[0].uri);
            if (barcodes)
                joinRoom(barcodes[0].data)
        }
    };

    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        joinRoom(data);
    };

    if (hasPermission === false) {
        toastError("没有相关权限,请先授权~")
    }

    return (

        <SafeAreaView style={[styles.container]}>
            <View style={{backgroundColor: '#ffffff', height: '100%'}}>
                <CustomHeaderReturn title="扫一扫" isReturn={true}/>
                <Camera
                    style={[styles.camera]}
                    ratio="16:9"
                    barCodeScannerSettings={{
                        barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
                    }}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                >
                </Camera>
                <Animated.Image
                    source={require("../../assets/qr.png")}
                    resizeMode="contain"
                    style={[
                        styles.scanBar,
                        {
                            ...StyleSheet.absoluteFill,
                            transform: [{translateY: anim}]
                        }
                    ]}
                />
            </View>
            <View style={[styles.fixedBottom]}>
                <View style={{
                    width: "100%",
                    height: "100%"
                }}>
                    <Text style={{color: "#ffffff", marginLeft: 50}}>扫描二维码加入房间</Text>
                </View>
                <TouchableOpacity onPress={pickImageFromGallery}>
                    <View style={{flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <View
                            style={{
                                width: 50,
                                height: 50,
                                backgroundColor: "rgba(255,255,255,0.3)",
                                borderRadius: 50,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                style={{width: 36, height: 36}}
                                source={require("../../assets/photo.png")}
                            />
                        </View>
                        <Text style={{color: "#ffffff"}}>相册</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.containerBackgroundColor,
        flex: 1,
    },
    camera: {
        flex: 1
    },
    layer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    scanBar: {width: "100%"},
    fixedBottom: {
        position: 'absolute',
        left: 50,
        right: 50,
        bottom: 60,
        height: 60,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
});
