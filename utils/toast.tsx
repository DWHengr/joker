import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {theme} from "../pages/common/Theme";

export const toastConfig = {
    error: (props) => (
        <ErrorToast
            {...props}
            style={{borderLeftColor: "#faa4a4"}}
            text1Style={{color: theme.primary}}
        />
    ),
    success: (props) => (
        <BaseToast
            {...props}
            style={{borderLeftColor: theme.primary}}
            text1Style={{color: theme.primary}}
        />
    ),
    info: (props) => (
        <BaseToast
            {...props}
            style={{borderLeftColor: theme.primary}}
            text1Style={{color: theme.primary}}
        />
    ),
}

export const toastError = (text) => {
    Toast.show({
        visibilityTime: 2000,
        type: 'error',
        text1: text
    });
}

export const toastInfo = (text) => {
    Toast.show({
        visibilityTime: 2000,
        type: 'info',
        text1: text
    });
}

export const toastSuccess = (text) => {
    Toast.show({
        visibilityTime: 2000,
        type: 'success',
        text1: text
    });
}
