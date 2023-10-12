import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Switch
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../../constants/Styles";
import OpacityButton from "../../../components/opacityButton";
import InputText from "../../../components/textInput";
import { AuthHeader, TabHeader } from "../../../components";
import Strings from "../../../constants/strings";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import reelsData from "../../../constants/helpers";
import LinearGradient from 'react-native-linear-gradient';
import { setLoginUser } from "../../../redux/cookiesReducer";
const Setting = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [enable, setEnable] = useState(false)

    const toggleSwitch = () => {
        setEnable(!enable)
    }


const logout=()=>{
    dispatch(setLoginUser({}))
    navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }] // Replace 'Home' with the screen you want to reset to
      });
}
    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader myHeading={"Settings"}
                imge={require('../../../assets/images/arrow-left.png')}
            />


            <View style={[styles.reelsStyle,]}>
                <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.blue_Button_Color }]}>Account</Text>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Edit Profile</Text>
                    <Image
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Change Password</Text>
                    <Image
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>

                <View style={[styles.line, { marginTop: 20 }]} />



                <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.blue_Button_Color }]}>Notifications</Text>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Edit Profile</Text>
                    <Switch
                        trackColor={{ false: "grey", true: ColorCode.blue_Button_Color }}
                        thumbColor={enable ? "white" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={enable} />
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Change Password</Text>
                    <Switch
                        trackColor={{ false: "grey", true: ColorCode.blue_Button_Color }}
                        thumbColor={enable ? "white" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={enable} />
                </TouchableOpacity>

                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Change Password</Text>
                    <Switch
                        trackColor={{ false: "grey", true: ColorCode.blue_Button_Color }}
                        thumbColor={enable ? "white" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={enable} />
                </TouchableOpacity>

                <View style={[styles.line, { marginTop: 20 }]} />

                <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.blue_Button_Color }]}>Privacy</Text>
                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Make my account Private</Text>
                    <Switch
                        trackColor={{ false: "grey", true: ColorCode.blue_Button_Color }}
                        thumbColor={enable ? "white" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={enable} />
                </TouchableOpacity>


                <Text style={[styles.smalltxt, { marginTop: 10 }]}>Who can see my posts, photos, life updates</Text>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                    <Image
                        resizeMode='contain'
                        source={require('../../../assets/images/image_.png')}
                    />
                    <Text style={[styles.smalltxt,]}>My all Friend-list</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                    <Image
                        resizeMode='contain'
                        source={require('../../../assets/images/image_.png')}
                    />
                    <Text style={[styles.smalltxt,]}>Selected</Text>

                </TouchableOpacity>
                <TouchableOpacity style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                    <Image
                        resizeMode='contain'
                        source={require('../../../assets/images/image_.png')}
                    />
                    <Text style={[styles.smalltxt,]}>Nobody</Text>

                </TouchableOpacity>


                <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Block People</Text>
                    <Image
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>


                <TouchableOpacity onPress={()=>{logout()}}
                
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between', marginTop: 20,
                    height:50,alignItems:'center',
                    width:200,backgroundColor:'red'
                }}>
                    <Text style={[styles.smalltxt,{color:'white'}]}>Logout</Text>

                </TouchableOpacity>
            </View>



        </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorCode.white_Color
    },

    txt: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        color: ColorCode.black_Color,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20

    },

    reelsStyle: {
        flex: 1,
        margin: 12
    },

    smalltxt: {
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

    },
    line: {
        height: 1,
        backgroundColor: ColorCode.gray_background_color,
        width: '100%',
        marginBottom: 10
    }


})

export default Setting;