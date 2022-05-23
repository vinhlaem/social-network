import { AsyncStorage } from "react-native";

const RemoveToken = async () => {
        await AsyncStorage.removeItem('@token');
};
export default RemoveToken;