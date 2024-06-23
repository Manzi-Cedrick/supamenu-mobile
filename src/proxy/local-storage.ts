import AsyncStorage from "@react-native-async-storage/async-storage";

export const LOCAL_SESSION_TOKEN_KEY =
    "U2FsdGVkX1/G0spCYq44fQCTDWSVO6gq2/UDLKJSLKAFJKLADFDS";

export const getDecryptToken = async () => {
    return await AsyncStorage.getItem(LOCAL_SESSION_TOKEN_KEY);
};

export const setEncToken = async (token: string) => {
    return await AsyncStorage.setItem(LOCAL_SESSION_TOKEN_KEY, token)
};

export const removeDecryptToken = async () => {
    return await AsyncStorage.removeItem(LOCAL_SESSION_TOKEN_KEY)
};

export const setUserInfoData = async (data: any) => {
    return await AsyncStorage.setItem('user', JSON.stringify(data))
}

export const getUserInfoData = async () => {
    return await AsyncStorage.getItem('user')
}

export const removeUserInfoData = async () => {
    return await AsyncStorage.removeItem('user')
}