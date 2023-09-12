import React, {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {View, StyleSheet} from "react-native";
import Spinner from 'react-native-loading-spinner-overlay';
import {toastError} from "../utils/toast";

const LoadingBarContext = createContext();

export function useLoading() {
    const context = useContext(LoadingBarContext);
    return context;
}

export default function CustomLoadingProvider({children}) {
    const [isLoading, setIsLoading] = useState(false);
    const [tip, setTip] = useState("");
    const timerRef = useRef(null);

    const showLoading = useCallback((tip = "正在加载中") => {
        setTip(tip);
        setIsLoading(true);
    }, []);

    useEffect(() => {
        if (isLoading) {
            // 清除之前的定时器
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
            timerRef.current = setTimeout(() => {
                setIsLoading(false);
                if (isLoading) {
                    toastError("应用超时~");
                }
            }, 10000)
        }
    }, [isLoading])

    const hideLoading = useCallback(() => {
        setIsLoading(false);
    }, []);

    return (
        <LoadingBarContext.Provider value={{isLoading, showLoading, hideLoading}}>
            <View>
                {isLoading && (
                    <View>
                        <Spinner
                            animation="fade"
                            overlayColor="rgba(0, 0, 0, 0.7)"
                            visible={isLoading}
                            textContent={tip}
                            textStyle={[styles.text]}
                        />
                    </View>
                )}
            </View>
            {children}
        </LoadingBarContext.Provider>
    );
}

const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: "#fff"
    }
})
