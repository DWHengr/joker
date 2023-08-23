import axios from 'axios';
import {getToken} from "../storage/user";

const URL = "http://114.67.242.151:18088";

// 创建 axios 实例
const service = axios.create({
    baseURL: URL,
    timeout: 30000,
    headers: {
        "Content-Type": "application/json;charset=UTF-8",
    },
});

// 请求拦截器
service.interceptors.request.use(
    async function (config) {
        await getToken().then((res) => {
            config.headers["X-Token"] = res
        });
        return config;
    },
    function (error) {
        console.log("request error", error);
        // 处理请求错误
        return Promise.reject(error);
    }
);

// 响应拦截器
service.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        console.log("response error", error);
        return Promise.reject(error);
    }
);

export default service;

export const post = (url: string, data: any, config = {}) => {
    return service({
        method: "post",
        url,
        data,
        ...config,
    })
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

export const formData = (url: string, data: any) => {
    return service({
        method: "post",
        url,
        data,
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
}

export const get = (url: string, data = {}, config = {}) => {
    return service({
        method: "get",
        url,
        params: data,
        ...config,
    })
        .then((response) => {
            return Promise.resolve(response);
        })
        .catch((error) => {
            return Promise.reject(error);
        });
};

