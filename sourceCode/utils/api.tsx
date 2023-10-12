import axios from "axios";
import { Alert, Platform } from "react-native";
// import { Show_Toast } from "../customComponent/toast";
import { Store } from "../redux";
import { setLoading } from "../redux/reducer";
export const isWeb = Platform.OS === 'web';
export const apiClient = axios.create({
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
});

apiClient.interceptors.request.use(
    (config) => {
        const state = Store.getState()
        const token = state?.cookies?.loginUser
        const accessToken = `Bearer ${token}`
        if (accessToken) {
            config.headers["Authorization"] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
         console.log(response.data,"response===========>")
        // Store.dispatch(setLoading(false))
        return response;
    },
    async (error) => {
        Store.dispatch(setLoading(false))
        const { response } = error
         console.log("error---->apimain", response?.data)
        // Store.dispatch(setError(response?.data?.message))
        Alert.alert(error?.response?.data?.message)
        // Show_Toast(error?.response)
        return Promise.reject(error);
    }
);
