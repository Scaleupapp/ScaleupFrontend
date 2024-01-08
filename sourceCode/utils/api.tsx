import axios from "axios";
import { Alert, Platform } from "react-native";
// import { Show_Toast } from "../customComponent/toast";
import { Store } from "../redux";
import { setLoading } from "../redux/reducer";
import * as Sentry from '@sentry/react-native';
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
        const token = state?.cookies?.loginUser.token
        console.log(token,'token===============>')
        const accessToken = `Bearer ${token}`
        if (accessToken) {
            config.headers["Authorization"] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
        Sentry.captureException(error);
    }
);

apiClient.interceptors.response.use(
    (response) => {
        //  console.log(response.data,"response===========>")
        // Store.dispatch(setLoading(false))
        return response;
    },
    async (error) => {
        Sentry.captureException(error);
        Store.dispatch(setLoading(false))
        const { response } = error
         console.log("error---->apimain", response?.data)
        // Store.dispatch(setError(response?.data?.message))
        if(response?.data?.message != null || "" ){
            Alert.alert(response?.data?.message)
        }
        if(response?.data?.error!= null || "" ){
            Alert.alert(response?.data?.error)
        }
        Sentry.captureException(error);
        // Show_Toast(error?.response)
        return Promise.reject(error);
    }
);





export const apiUploadDataClient = axios.create({
    headers: {
        'Accept': 'application/json',
        "Content-Type": "multipart/form-data",
    },
});


apiUploadDataClient.interceptors.request.use(
    (config) => {
        const state = Store.getState()
        const token = state?.cookies?.loginUser.token
         console.log(token,'token===============>')
        const accessToken = `Bearer ${token}`
        if (accessToken) {
            config.headers["Authorization"] = accessToken;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
        Sentry.captureException(error);
    }
);


apiUploadDataClient.interceptors.response.use(
    (response) => {
        //  console.log(response.data,"response===========>")
        // Store.dispatch(setLoading(false))
        return response;
    },
    async (error) => {
        Store.dispatch(setLoading(false))
        const { response } = error
         console.log("error---->apimain1111111", response)
        // Store.dispatch(setError(response?.data?.message))
        if(response?.data?.message != null || "" ){
            Alert.alert(response?.data?.message)
        }
        if(response?.error != null || "" ){
            Alert.alert(response?.data.error)
        }
        Sentry.captureException(error);
        // Show_Toast(error?.response)
        return Promise.reject(error);
        
    }
);

