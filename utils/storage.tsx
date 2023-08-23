import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * 添加字符串数据
 *
 * @param {string} key
 * @param {string} value
 */
export const setStringValue = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log("save string error")
    }
}

/**
 * 添加对象数据
 *
 * @param {string} key
 * @param {Object} value
 */
export const setObjectValue = async (key: string, value: Object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log("save object error")
    }
}

/**
 * 获取字符串数据
 *
 * @param {string} key
 *
 * @return {Promise}
 */
export const getStringValue = async (key: string) => {
    try {
        return await AsyncStorage.getItem(key)
    } catch (e) {
        console.log("read string error")
    }
}

/**
 * 获取对象数据
 *
 * @param {string} key
 *
 * @return {Promise}
 */
export const getObjectValue = async (key: string) => {
    try {
        const jsonValue = await AsyncStorage.getItem(key)
        return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
        console.log("read object error")
    }
}

/**
 * 修改字符串数据
 *
 * @param {string} key
 * @param {string} value
 */
export const updateStringValue = async (key: string, value: string) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (e) {
        console.log("update string error")
    }
}

/**
 * 修改对象数据
 *
 * @param {string} key
 * @param {Object} value
 */
export const updateObjectValue = async (key: string, value: Object) => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
        console.log("update object error")
    }
}

/**
 * 合并对象数据
 *
 * @param {string} key
 * @param {any} value
 */
export const mergeObjectValue = async (key: string, value: any) => {
    try {
        await AsyncStorage.mergeItem(key, JSON.stringify(value))
    } catch (e) {
        console.log('merge error')
    }
}

/**
 * 删除数据
 */
export const removeValue = async (key: string) => {
    try {
        await AsyncStorage.removeItem(key)
    } catch (e) {
        console.log('remove error')
    }
}

/**
 * 清除所有数据
 */
export const clearAll = async () => {
    try {
        await AsyncStorage.clear()
    } catch (e) {
        console.log("clear error")
    }
}
