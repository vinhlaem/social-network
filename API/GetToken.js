import { AsyncStorage } from "react-native";

const GetToken = async () =>{
    try {
        const value = await AsyncStorage.getItem('@token');
        if (value !== null){
            return value;
        }
        return '';
    } catch (error){
        return '';
    }
};

export default GetToken;