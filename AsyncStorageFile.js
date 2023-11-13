import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async(key, value) => {
    try {
        await AsyncStorage.setItem(key, value)
    } catch (error) {
        console.log('Error while setting AsyncStorage : ', error)
    }
}

export const getItem = async(key, value) => {
    try {
        await AsyncStorage.getItem(key, value)
    } catch (error) {
        console.log('Error while getting AsyncStorage : ', error)
    }
}

export const removeItem = async(key, value) => {
    try {
        await AsyncStorage.removeItem(key, value)
    } catch (error) {
        console.log('Error while removing AsyncStorage : ', error)
    }
}

