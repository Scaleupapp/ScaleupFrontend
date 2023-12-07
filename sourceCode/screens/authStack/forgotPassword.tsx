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
import { changePassword } from "../../utils/apiHelpers";
import { Show_Toast } from "../../components/toast";
import Loader from "../../components/loader";
import { setLoading } from "../../redux/reducer";

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [secureText, setSecureText] = useState(true)
    const [password, setPassword] = useState("")
    const [oldPassword, setOldPassword]=useState('')
    const [confirm, setConfirm]=useState("")
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);


    const forgotPassword = () => {
        const data={
            "oldPassword":oldPassword,
            "newPassword": password,
            "confirmNewPassword": confirm
          }
          dispatch(setLoading(true))
          changePassword(data).then((res) => {
              Show_Toast(res?.data?.message)
              dispatch(setLoading(false))
              setConfirm("")
              setOldPassword("")
              setPassword(""),
              navigation.goBack()
        })
    }

    return (
        <SafeAreaView style={styles.main}>
            {loading&&<Loader/>}
            <StatusBar
                animated={true}
                backgroundColor={ColorCode.blue_Button_Color} />
            <AuthHeader myHeading={'Change Password'} 
            imge={require('../../assets/images/arrow-left.png')} />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}>
                        <Text style={styles.txt}>{Strings.OnceEmail}</Text>
                    {/* <Text style={styles.txt}>{Strings.Submit}</Text> */}
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        
                        {/* <TouchableOpacity
                            style={styles.input}>
                            <Text style={{ color: ColorCode.yellowText, fontFamily: 'ComicNeue-Bold' }}>{Strings.Send}</Text>
                        </TouchableOpacity> */}
                    </View>
                    <View style={[styles.inputView,{marginTop:20} ]}>
                    <InputText
                            secureTextEntry={secureText}
                            show={() => { setSecureText(!secureText) }}
                            img2={require('../../assets/images/eye-slash.png')}
                            value={oldPassword}
                            onChange={(t) => { setOldPassword(t) }}
                            length={10}
                            img={require('../../assets/images/lock.png')} 
                            placeholder={"Old Password"} />

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
                           
                            <OpacityButton name={"Reset"} 
                              btnTextStyle={{ color: ColorCode.yellowText, }}
                              pressButton={()=>{forgotPassword()}}
                            />
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
        height: hp(34),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,

    }

})

export default ForgotPassword;