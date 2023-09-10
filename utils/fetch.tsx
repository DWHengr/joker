import {getToken} from "../storage/user";

const URL = "http://114.67.242.151:18088";

// 请求拦截器函数
const requestInterceptor = async (config) => {
    const token = await getToken();
    config.headers = {
        ...config.headers,
        "Content-Type": "application/json;charset=UTF-8",
        "X-Token": token,
    };
    return config;
};

// 响应拦截器函数
let responseInterceptor = (response) => {
};

export const CustomResponseInterceptor = (interceptor) => {
    if (interceptor)
        responseInterceptor = interceptor
};

// 封装 Fetch 函数
const fetchWithInterceptors = async (url, options) => {
    try {
        const modifiedOptions = await requestInterceptor(options);
        const response = await fetch(url, modifiedOptions);
        const responseData = await response.json();
        responseInterceptor(responseData);
        return responseData;
    } catch (error) {
        return {code: -2, msg: "网络异常,请求检查网络~"}
    }
};

// 封装 post 请求
export const post = async (url, data, config = {}) => {
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        ...config,
    };
    return fetchWithInterceptors(`${URL}${url}`, options);
};

// 封装 formData 请求
export const formData = async (url, data) => {
    const options = {
        method: "POST",
        body: Object.keys(data)
            .map(
                (key) =>
                    encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
            )
            .join("&"),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
    return fetchWithInterceptors(`${URL}${url}`, options);
};

// 封装 get 请求
export const get = async (url, data = {}, config = {}) => {
    const query = Object.keys(data)
        .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
    const options = {
        method: "GET",
        ...config,
    };
    return fetchWithInterceptors(`${URL}${url}?${query}`, options);
};
