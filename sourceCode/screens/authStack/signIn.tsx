import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../constants/Styles";
import OpacityButton from "../../components/opacityButton";
import InputText from "../../components/textInput";
import { AuthHeader } from "../../components";
import Strings from "../../constants/strings";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Show_Toast } from "../../components/toast";
import { setLoading } from "../../redux/reducer";
import { loginApi } from "../../utils/apiHelpers";
import { setLoginUser } from "../../redux/cookiesReducer";
import Loader from "../../components/loader";
import { checkMultiple, Permission, PERMISSIONS, requestMultiple } from "react-native-permissions";
const SignIn = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [secureText, setSecureText] = useState(true)
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [defaults, setDefault] = useState("Username")
    const [terms, setTerms] = useState(false)
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);


    useEffect(() => {
        if (Platform.OS === "ios") {
            checkMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CONTACTS]).then((statuses) => {
                console.log("check====Camera--1--Ios---->", statuses[PERMISSIONS.IOS.CAMERA]);
                console.log("check====Microphone-----Ios---->", statuses[PERMISSIONS.IOS.CONTACTS]);

            });
            requestMultiple([PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE, PERMISSIONS.IOS.CONTACTS]).then((statuses) => {
                console.log("request===CamCamera--2--Ios---->", statuses[PERMISSIONS.IOS.CAMERA]);
                console.log("request===MicrophoneIos---->", statuses[PERMISSIONS.IOS.CONTACTS]);

            });
        } else {
            checkMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.READ_CONTACTS,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
            ]).then((statuses) => {
                console.log("Camera--3--", statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);
                console.log("READ_CONTACTS", statuses[PERMISSIONS.ANDROID.READ_CONTACTS]);


            });
            requestMultiple([PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO, PERMISSIONS.ANDROID.READ_CONTACTS,
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.READ_MEDIA_AUDIO
            ]).then((statuses) => {
                console.log("Camera--4--", statuses[PERMISSIONS.ANDROID.CAMERA]);
                console.log("AUDIO_RECORDING===>", statuses[PERMISSIONS.ANDROID.RECORD_AUDIO]);

            });
        }
    }, [])


    const loginUser = () => {
        let passworRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        let testPassword = passworRegex.test(password)
        if (userName == '') {
            Show_Toast("Please Enter UserName")
        }
        // else if (!testPassword) {
        //     Show_Toast("Please valid password")
        // } 
        else {
            dispatch(setLoading(true))
            const data = {
                "loginIdentifier": userName,
                "password": password
            }
            loginApi(data).then((res) => {
                dispatch(setLoading(false))
                Show_Toast(res?.data?.message)
                console.log(res?.data, "res?.data=======>")
                dispatch(setLoginUser(res?.data))
                setUserName("")
                setPassword("")
                if (res?.data?.sFirstTimeLogin1) {
                    navigation.navigate("BasicDetail")
                } else {
                    navigation.navigate("DrawerNavigator")
                }
            })
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            <StatusBar
                animated={true}
                backgroundColor={ColorCode.blue_Button_Color} />
            <AuthHeader myHeading={Strings.SigninHeaderText} />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}>
                    <Text style={[styles.txt, { color: ColorCode.gray_color }]}>{Strings.SignInText}</Text>
                    <Text style={[{ fontWeight: '700' }, styles.txt,]}>{Strings.LginWith}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <TouchableOpacity
                            onPress={() => { setDefault('Email') }}
                            style={[styles.input, defaults == 'Email' && { borderColor: ColorCode.blue_Button_Color }]}>
                            <Text style={[{ fontFamily: 'ComicNeue-Bold' }, defaults == 'Email' && { color: ColorCode.blue_Button_Color }]}>{Strings.Email}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { setDefault('Phone') }}
                            style={[styles.input, defaults == 'Phone' && { borderColor: ColorCode.blue_Button_Color }]}>
                            <Text style={[{ fontFamily: 'ComicNeue-Bold', }, defaults == 'Phone' && { color: ColorCode.blue_Button_Color }]}>{Strings.PhoneNumber}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.inputView, { marginTop: 30 }]}>
                        <InputText
                            img={require('../../assets/images/image_user_Light.png')}
                            value={userName}
                            onChange={(t) => { setUserName(t) }}
                            placeholder={defaults}
                            length={15}
                            keyboardType={defaults == 'Phone' ? 'number-pad' : 'default'}

                        />

                        <InputText
                            secureTextEntry={secureText}
                            show={() => { setSecureText(!secureText) }}
                            img2={require('../../assets/images/eye-slash.png')}
                            value={password}
                            onChange={(t) => { setPassword(t) }}
                            length={10}
                            img={require('../../assets/images/lock.png')} 
                            placeholder={"Password"} />

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => {
                                    // navigation.navigate("Terms") 
                                    setTerms(!terms)
                                }} >
                                    <Image
                                        style={{
                                            borderWidth: !terms ? 1 : 0, borderColor: ColorCode.blue_Button_Color,
                                            tintColor: !terms ? ColorCode.white_Color : null, borderRadius: 3
                                        }}
                                        source={require('../../assets/images/image_checkbox_.png')} />
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 10, fontFamily: 'ComicNeue-Bold' }}>{Strings.RememnberMe}</Text>
                            </View>
                            <TouchableOpacity onPress={() => { navigation.navigate("ForgotPassword") }}>
                                <Text style={{ fontFamily: 'ComicNeue-Bold' }}>{Strings.ForgotPassword}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <OpacityButton
                            pressButton={() => {
                                // navigation.navigate("DrawerNavigator")
                                loginUser()
                            }}
                            name={Strings.SignIn} btnTextStyle={{ color: ColorCode.yellowText, }} />
                       <View style={{ flexDirection: 'row', alignSelf: 'center',  justifyContent: 'center' }}>
                            <Text style={{ color: ColorCode.gray_color, 
                                fontFamily: 'ComicNeue-Bold', 
                                fontSize: 14 }}>{"Don't have an account ?"}</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("SignUp") }} style={{ alignItems: 'center' }}>
                                <Text style={{ fontFamily: 'ComicNeue-Bold', fontSize: 18, color: ColorCode.blue_Button_Color, marginLeft: 4, bottom: 3 }}>{Strings.SignUp}</Text>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={{
                            flexDirection: 'row', alignItems: 'center', width: '100%',
                            justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20
                        }}>
                            <View style={{ height: 1, width: '33%', backgroundColor: '#ddd', }} />
                            <Text style={{ fontFamily: 'ComicNeue-Bold' }}>{Strings.SignInWith}</Text>
                            <View style={{ height: 1, width: '33%', backgroundColor: '#ddd', }} />
                        </View> */}

                        {/* <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10 }}>
                            <TouchableOpacity>
                                <Image
                                    style={{ height: 50, width: 50, }}
                                    source={require('../../assets/images/group_Group.png')} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image
                                    style={{ height: 50, width: 50, }}
                                    source={require('../../assets/images/group_GroupApple.png')} />
                            </TouchableOpacity>
                        </View> */}

                        
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorCode.blue_Button_Color
    },
    body: {
        flex: 1,
        backgroundColor: ColorCode.white_Color,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    txt: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        color: ColorCode.black_Color,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'ComicNeue-Bold'

    },
    input: {
        height: 40,
        width: '47%',
        backgroundColor: ColorCode.white_Color,
        alignSelf: 'center',
        borderRadius: hp(8),
        elevation: 20,
        shadowColor: ColorCode.white_Color,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        borderColor: '#ddd',
        borderWidth: 1,
        fontWeight: '600',
        fontSize: 14,
        color: ColorCode.black_Color,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputView: {
        height: hp(18),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10
    }

})

export default SignIn;