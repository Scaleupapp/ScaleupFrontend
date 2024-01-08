

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
import { registerApi } from "../../utils/apiHelpers";
import { setLoading, setTerms } from "../../redux/reducer";
import Loader from "../../components/loader";

const SignUp = () => {
    const { loading, terms } = useSelector<any, any>((store) => store.sliceReducer);

    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    // const [terms, setTerms] = useState(false)
    const [secureText, setSecureText] = useState(true)


    const registerUser = () => {

        let emailRegex =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        let testedEmail = emailRegex.test(email);

        let passworRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        let testPassword = passworRegex.test(password)

        if (firstName == '') {
            Show_Toast("Please Enter First name.")
        }
        else if (lastName == "") {
            Show_Toast("Please Enter Last name.")
        } else if (userName == '') {
            Show_Toast("Please Enter UserName")
        } else if (email == "") {
            Show_Toast("Please Enter email.")
        } else if (!testedEmail) {
            Show_Toast("Please Enter valid email adress")
        } else if (phone === ''){
            Show_Toast("Phone number can't be empty")
        }
        else if (phone.length != 10){
            Show_Toast("Phone number be valid phone number")
        }
        
        
        else if (password == "") {
            Show_Toast("Please Enter Password.")
        }
        // else if (!testPassword) {
        //     Show_Toast("Please enter valid password.")
        // }
        else if (!terms) {
            Show_Toast('Please select agree terms.')
        } else {
            dispatch(setLoading(true))
            const data = {
                "username": userName,
                "email": email,
                "password": password,
                "firstname": firstName,
                "lastname": lastName,
                "phoneNumber": phone
            }
            registerApi(data).then((res) => {
                dispatch(setLoading(false))
                // console.log(res?.data, "dta=======>")
                Show_Toast(res?.data?.message)
                navigation.navigate("SignIn", { data })
                setEmail("")
                setFirstName("")
                setLastName("")
                setUserName("")
                setEmail("")
                setPassword("")
            })
        }
    }

    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            <StatusBar
                animated={true}
                backgroundColor={ColorCode.blue_Button_Color} />
            <AuthHeader myHeading={Strings.LetsCreate} imge={require('../../assets/images/arrow-left.png')} />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                    automaticallyAdjustKeyboardInsets={true}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode='interactive'>
                    <Text style={styles.txt}>{Strings.PleaseAdd}</Text>
                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                        <View
                            style={styles.input}>
                            <Image
                                source={require('../../assets/images/image_user.png')} />
                            <TextInput
                                // maxLength={10}
                                value={firstName}
                                onChangeText={(t) => { setFirstName(t) }}
                                style={styles.inputStyle}
                                placeholderTextColor={ColorCode.blue_Button_Color}
                                placeholder={Strings.FirstName} />
                        </View>
                        <View
                            style={styles.input}>
                            <Image
                                source={require('../../assets/images/image_user.png')} />
                            <TextInput

                                // maxLength={10}
                                value={lastName}
                                onChangeText={(t) => { setLastName(t) }}
                                style={styles.inputStyle}
                                placeholderTextColor={ColorCode.blue_Button_Color}
                                placeholder={Strings.LastName} />
                        </View>
                    </View>
                    <View style={[styles.inputView, { height: hp(35) }]}>

                        <InputText onChange={(text) => { setUserName(text) }} value={userName}

                            img={require('../../assets/images/image_user_Light.png')} placeholder={"Username"} />

                        <InputText keyboardType={"email-address"} onChange={(text) => { setEmail(text) }} value={email}
                            img={require('../../assets/images/sms.png')} placeholder={"Email ID"} />

                        <InputText
                            keyboardType={'number-pad'}
                            onChange={(text) => { setPhone(text) }}
                            value={phone}
                            num={"+91"}
                            length={10}
                            img={require('../../assets/images/image_call.png')} placeholder={"Phone"} />

                        <InputText
                            onChange={(text) => { setPassword(text) }} value={password}
                            secureTextEntry={secureText}
                            show={() => { setSecureText(!secureText) }}
                            img2={secureText ? require('../../assets/images/eye-slash.png') : require('../../assets/images/eye.png')}
                            // length={10}
                            img={require('../../assets/images/lock.png')}
                            placeholder={"Password"} />

                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 20 }}>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => {
                                    navigation.navigate("Terms")
                                    // dispatch(setTerms(!terms))
                                }} >
                                    <Image
                                        style={{
                                            borderWidth: !terms ? 1 : 0, borderColor: ColorCode.blue_Button_Color,
                                            tintColor: !terms ? ColorCode.white_Color : null, borderRadius: 3
                                        }}
                                        source={require('../../assets/images/image_checkbox_.png')} />
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 10, color: ColorCode.gray_color, fontFamily: 'ComicNeue-Bold' }}>{Strings.AreYouAgree}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.inputView}>
                        <OpacityButton
                            pressButton={() => { registerUser() }}
                            name={Strings.Signup} btnTextStyle={{ color: ColorCode.yellowText, }} />
                        <View style={{
                            flexDirection: 'row', alignItems: 'center', width: '100%',
                            justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20
                        }}>
                            {/* <View style={{ height: 1, width: '33%', backgroundColor: '#ddd', }} />
                            <Text style={{ fontFamily: 'ComicNeue-Bold', color: ColorCode.gray_color }}>{Strings.SignInWith}</Text>
                            <View style={{ height: 1, width: '33%', backgroundColor: '#ddd', }} /> */}
                        </View>


                        {/* <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 10, }}>
                            <TouchableOpacity>
                                <Image
                                    style={{ height: 50, width: 50, }}
                                    source={require('../../assets/images/group_Group.png')}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity>
                                <Image
                                    style={{ height: 50, width: 50, }}
                                    source={require('../../assets/images/group_GroupApple.png')}
                                />
                            </TouchableOpacity>
                        </View> */}


                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                            <Text style={{ fontFamily: 'ComicNeue-Bold', color: ColorCode.gray_color, fontSize: 14, }}>{Strings.AlreadyHaveAccount}</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("SignIn") }}>
                                <Text style={{ fontSize: 18, color: '#043142', marginLeft: 4, bottom: 3, fontFamily: 'ComicNeue-Bold' }}>{Strings.SignIn}</Text>
                            </TouchableOpacity>
                        </View>


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
        height: 54,
        width: '47%',
        backgroundColor: ColorCode.white_Color,
        alignSelf: 'center',
        borderRadius: hp(3),
        elevation: 20,
        shadowColor: ColorCode.white_Color,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        borderColor: ColorCode.blue_Button_Color,
        borderWidth: 1,
        paddingLeft: 15,
        fontWeight: '600',
        fontSize: 14,
        color: ColorCode.black_Color,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputStyle: {
        width: '70%',
        fontFamily: 'ComicNeue-Bold'

    },
    inputView: {
        height: hp(13),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10

    },

})

export default SignUp;