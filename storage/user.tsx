import {getObjectValue, getStringValue, removeValue, setObjectValue, setStringValue} from "../utils/storage";

const token = "token";
const userInfo = "userInfo";
const userId = "userId";
const roomId = "roomId";
const roomNumber = "roomNumber";
const wsToken = "wsToken";

export function setLoginInfo(data) {
    setToken(data.token);
    setWsToken(data.wsToken);
    setRoomId(data.roomId);
    setRoomNumber(data.roomNumber);
    setUserId(data.userId);
}

export function setCreatedRoomInfo(data) {
    setWsToken(data.wsToken);
    setRoomNumber(data.roomNumber);
    setRoomId(data.roomId);
}

export function removeRoomInfo() {
    removeValue(wsToken).then();
    removeValue(roomNumber).then();
    removeValue(roomId).then();
}


export async function getToken() {
    return await getStringValue(token)
}

export function setToken(value: string) {
    setStringValue(token, value).then();
}

export async function getWsToken() {
    return await getStringValue(wsToken)
}

export function setWsToken(value: string) {
    setStringValue(wsToken, value).then();
}

export async function getRoomId() {
    return await getStringValue(roomId)
}

export function setRoomId(value: string) {
    setStringValue(roomId, value).then();
}

export async function getRoomNumber() {
    return await getStringValue(roomNumber)
}

export function setRoomNumber(value: string) {
    setStringValue(roomNumber, value).then();
}

export async function getUserId() {
    return await getStringValue(userId)
}

export function setUserId(value: string) {
    setStringValue(userId, value).then();
}

export async function getUserInfo() {
    return await getObjectValue(userInfo)
}

export function setUserInfo(value: any) {
    setObjectValue(userInfo, value).then();
}

export function removeToken() {
    removeValue(token).then();
}
