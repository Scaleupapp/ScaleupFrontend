import {
    ScrollView, StyleSheet, Text,
    View, StatusBar, SafeAreaView,
    TouchableOpacity
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../constants/Styles";
import OpacityButton from "../../components/opacityButton";
import { AuthHeader } from "../../components";
import Strings from "../../constants/strings";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Loader from "../../components/loader";
import OTPTextView from 'react-native-otp-textinput';
import { getOtp, verifyOtp } from "../../utils/apiHelpers";
import { setLoading } from "../../redux/reducer";
import { Show_Toast } from "../../components/toast";
import { setLoginUser } from "../../redux/cookiesReducer";


const PasswordOtp = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [secureText, setSecureText] = useState(true)
    const [code, setCode] = useState('');
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);
    const [countdown, setCountdown] = useState(120);
    const [show, setShow] = useState(false)
    const minutes = Math.floor(countdown / 60);
    const remainingSeconds = countdown % 60;
    const param = props?.route?.params.phoneNumber
    

    // console.log(param, "param=====>")


    useEffect(() => {
        let interval = setInterval(() => {
            if (countdown > 0) {
                setCountdown(countdown - 1)
            } else {
                clearInterval(interval);
                setShow(true)
            }
        }, 1000)
        return () => {
            clearInterval(interval);
        };
    }, [countdown])



    const verfyOtp = () => {
        dispatch(setLoading(true))
        const data={
            "phoneNumber": param,
            "userOTP": code 
        }
        verifyOtp(data).then((res)=>{
            dispatch(setLoading(true))
            dispatch(setLoginUser(res?.data))
            
            if (res?.data?.sFirstTimeLogin1) {
                navigation.navigate("BasicDetail", { data })
              
            }
            else {
                navigation.navigate("TabNavigator")
              
            }
        //  console.log(res?.data,"chvhdvbhdbvjb=====>")
        })


    }





    const resendOtp=()=>{
        const pay = {
            "phoneNumber": param
        }
        getOtp(pay).then((res) => {
            if (res?.data?.message === "OTP sent successfully") {
                Show_Toast(res?.data?.message)
                dispatch(setLoading(false))
            }
        })
    }



    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            <StatusBar
                animated={true}
                backgroundColor={ColorCode.blue_Button_Color} />
            <AuthHeader myHeading={"Verify Otp"}
                imge={require('../../assets/images/arrow-left.png')} />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}>
                    <Text style={styles.txt}>{"Please enter the otp "}</Text>
                    <Text style={[styles.txt,{fontSize:20}]}>{minutes + ":" + remainingSeconds}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20 }}>

                        {/* <TouchableOpacity
                            style={styles.input}>
                            <Text style={{ color: ColorCode.yellowText, fontFamily: 'ComicNeue-Bold' }}>{Strings.Send}</Text>
                        </TouchableOpacity> */}
                    </View>

                    <View style={[styles.inputView, { marginTop: 50 }]}>
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

                        <OpacityButton name={"Verify"}
                            btnTextStyle={{ color: ColorCode.yellowText, }}
                            pressButton={() => {verfyOtp() }} />

                        {show && <TouchableOpacity
                                 onPress={()=>{resendOtp()}}
                        >
                            <Text style={styles.txt}>{"Resend Otp ?"}</Text>
                        </TouchableOpacity>}
                    </View>

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
        height: hp(24),
        justifyContent: 'space-between',
        marginTop: 40,
        marginBottom: 10,

    }

})

export default PasswordOtp;