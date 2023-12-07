import {
    ScrollView, StyleSheet, Text,
    TouchableOpacity, View, StatusBar, FlatList, SafeAreaView
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
import { changePassword, otpPassword, resetMyPassword } from "../../utils/apiHelpers";
import { Show_Toast } from "../../components/toast";
import Loader from "../../components/loader";
import { setLoading } from "../../redux/reducer";
import OTPTextView from "react-native-otp-textinput";


const ChangePassword = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [secureText, setSecureText] = useState(true)
    const [password, setPassword] = useState("")
    const [number, setNumber] = useState('')
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);
    const [code, setCode] = useState('');
    const [showOtp, setShowOtp] = useState(false)
    const [confirm, setConfirm]=useState("")
    // const forgotPassword = () => {
    //     const data = {
    //         "oldPassword": oldPassword,
    //         "newPassword": password,
    //         "confirmNewPassword": confirm
    //     }
    //     dispatch(setLoading(true))




    //     changePassword(data).then((res) => {
    //         Show_Toast(res?.data?.message)
    //         dispatch(setLoading(false))
    //         setConfirm("")
    //         setOldPassword("")
    //         setPassword(""),
    //             navigation.navigate("SignIn")
    //     })
    // }


    const changeMyPassword = () => {
        if(password === confirm){
            dispatch(setLoading(true))
            const data = {
                "loginIdentifier": number,
                "otp": code,
                "newPassword": password
            }
            resetMyPassword(data).then((res) => {
                dispatch(setLoading(false))
                Show_Toast(res?.data?.message)
                // console.log(res?.data,"resdata=====>")
                if (res?.data?.message === "Password changed successfully") {
                    navigation.navigate("SignIn")
    
                }
            })
        }else{
            Show_Toast("Password and confirm password must be same.")
        }
      

    }



    const sendOtpTonumber = () => {
        dispatch(setLoading(true))
        const data = {
            "loginIdentifier": number
        }
        otpPassword(data).then((res) => {
            dispatch(setLoading(false))
            if (res?.data?.message === "OTP sent successfully") {
                setShowOtp(true)
            }
            Show_Toast(res?.data?.message)
            // console.log(res?.data, "resdat======>")
        })
    }




    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            <StatusBar
                animated={true}
                backgroundColor={ColorCode.blue_Button_Color} />
            <AuthHeader myHeading={Strings.Forgot}
                imge={require('../../assets/images/arrow-left.png')} />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1,overflow:'hidden' }}
                
                  automaticallyAdjustKeyboardInsets={true}
                  keyboardShouldPersistTaps="always"
                  keyboardDismissMode='interactive'
                    contentContainerStyle={{ justifyContent: 'space-between' }}>
                    <Text style={styles.txt}>{Strings.OnceEmail}</Text>
                    {/* <Text style={styles.txt}>{Strings.Submit}</Text> */}
                    <View style={{
                        flexDirection: 'row', marginTop: 20, alignItems: 'center', width: '100%',
                        justifyContent: 'space-between', paddingHorizontal: 20
                    }}>

                        <InputText
                            value={number}
                            onChange={(t) => { setNumber(t) }}
                            img={require('../../assets/images/image_user_Light.png')}
                            placeholder={"Phone"}
                            style={{
                                width: '60%',
                                fontFamily: 'ComicNeue-Bold'
                            }} />
                        <TouchableOpacity
                            onPress={() => { sendOtpTonumber() }}
                            style={styles.input}>
                            <Text style={{
                                color: ColorCode.yellowText,
                                fontFamily: 'ComicNeue-Bold'
                            }}>{Strings.Send}</Text>
                        </TouchableOpacity>

                    </View>

                    {showOtp &&


                        <View style={[styles.inputView, { marginTop: 20,overflow:'hidden'  }]}>

                            <Text style={[styles.txt, { textAlign: 'left' }]}>{"Enter Otp"}</Text>
                            <OTPTextView
                                textInputStyle={{
                                    color: 'black',
                                    borderBottomWidth: 1,
                                    backgroundColor: 'white',
                                    borderWidth: 1, borderRadius: 8,
                                    alignItems: 'center',
                                    justifyContent: 'center', width: 40,
                                    marginHorizontal: 10
                                }}
                                returnKeyType='done'
                                tintColor={ColorCode.blue_Button_Color}
                                handleTextChange={text => setCode(text)}
                                inputCount={6}
                                defaultValue={code}
                                keyboardType="numeric" />

                            <InputText
                                secureTextEntry={secureText}
                                show={() => { setSecureText(!secureText) }}
                                img2={require('../../assets/images/eye-slash.png')}
                                value={password}
                                onChange={(t) => { setPassword(t) }}
                                length={10}
                                img={require('../../assets/images/lock.png')}
                                placeholder={"New Password"} />

                            <InputText
                                secureTextEntry={secureText}
                                show={() => { setSecureText(!secureText) }}
                                img2={require('../../assets/images/eye-slash.png')}
                                value={confirm}
                                onChange={(t) => { setConfirm(t) }}
                                length={10}
                                img={require('../../assets/images/lock.png')}
                                placeholder={"Confirm Password"} />

                            <OpacityButton name={"Reset Password"}
                                btnTextStyle={{ color: ColorCode.yellowText }}
                                pressButton={() => { changeMyPassword() }}
                            />
                        </View>

                    }


                </ScrollView>
                <View style={[{ bottom: 30, }]}>
                    {/* <OpacityButton name={"Reset"} btnTextStyle={{ color: ColorCode.yellowText, }} /> */}
                </View>
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
        fontSize: 15,
        lineHeight: 20,
        textAlign: 'center',
        color: ColorCode.black_Color,
        width: '88%',
        alignSelf: 'center',
        marginTop: 20,
        fontFamily: 'ComicNeue-Bold'

    },
    input: {
        height: 50,
        width: '30%',
        backgroundColor: ColorCode.blue_Button_Color,
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
        height: hp(46),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,

    }

})

export default ChangePassword;