import {View, Text, StyleSheet, Image, TouchableOpacity, BackHandler} from "react-native";
import QRCode from 'react-native-qrcode-svg';
import {theme} from "../common/Theme";
import CustomHeaderReturn from "../../component/CustomHeaderReturn";
import {SafeAreaView} from "react-native-safe-area-context";
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import {toastError, toastInfo} from "../../utils/toast";
import {useEffect, useState} from "react";
import {createQrToken} from "../../api/userRoom";


export default function QrCreate() {
    let [qrData, setQrData] = useState("");
    let svgRef = null;

    useEffect(() => {
        createQrToken().then(res => {
            if (res.code == 0) {
                setQrData(res.data.qrToken)
            } else {
                toastError("二维码生成错误")
            }
        })
    }, [])

    const saveQRCodeToPhone = async () => {
        const mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
        if (!mediaLibraryPermissions.granted) {
            toastError("没有相关权限,请先授权~");
            return;
        }
        if (svgRef) {
            svgRef.toDataURL(async (data) => {
                const fileName = `QRCode${Date.now()}.png`;
                const directory = `${FileSystem.cacheDirectory}qrcodes/`;
                const filePath = `${directory}${fileName}`;
                await FileSystem.makeDirectoryAsync(directory, {intermediates: true});
                await FileSystem.writeAsStringAsync(filePath, data, {
                    encoding: FileSystem.EncodingType.Base64,
                });
                await MediaLibrary.createAssetAsync(filePath);
                toastInfo("保存成功~")

            });
        } else {
            toastError('无法生成二维码~')
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={{height: "100%"}}>
                <CustomHeaderReturn title='房间二维码' isReturn={true}/>
                {qrData &&
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 10
                    }}>
                        <QRCode
                            getRef={(c) => svgRef = c}
                            value={qrData}
                            size={240}
                            quietZone={20}
                            enableLinearGradient={true}
                            linearGradient={[theme.primary, theme.secondary]}
                            backgroundColor={theme.containerBackgroundColor}
                            logo={require('../../assets/icon.png')}
                            logoSize={50}
                            logoBackgroundColor={theme.containerBackgroundColor}
                            logoMargin={6}
                            logoBorderRadius={10}
                        />
                        <TouchableOpacity onPress={saveQRCodeToPhone}>
                            <View style={{
                                flexDirection: 'column',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 60
                            }}>
                                <View style={{
                                    width: 70,
                                    height: 70,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#8a8a8a1a',
                                    borderRadius: 50
                                }}>
                                    <Image
                                        style={{width: 36, height: 36}}
                                        source={require("../../assets/save.png")}
                                    />
                                </View>
                                <Text style={{fontSize: 16, marginTop: 2, color: theme.secondary}}>保存</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    },
});
