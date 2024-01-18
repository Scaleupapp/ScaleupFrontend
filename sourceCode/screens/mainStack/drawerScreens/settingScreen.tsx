//@ts-nocheck
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
import { chageCommentPrivalge } from "../../../utils/apiHelpers";
import ConfirmDelete from "../../../components/confimDelete";
import { setProfileDat } from "../../../redux/reducer";
const Setting = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [enable, setEnable] = useState(false)
    const [comment, setComment]=useState("everyone")
    const [open, setOpen]=useState(false)

    const toggleSwitch = () => {
        setEnable(!enable)
    }

const giveCommentPermission=(item)=>{
    setComment(item)
    const data ={"commentPrivileges": item

    }
    chageCommentPrivalge(data).then((res)=>{
    //   console.log(res?.data,"coo=======>")
    })
}


useEffect(()=>{
    setTimeout(()=>{
        setComment("everyone")
    },2000)
   
},[])
const logout = () => {
    dispatch(setLoginUser({}))
    dispatch(setProfileDat([]))
    navigation.reset({
        index: 0,
        routes: [{ name: 'SignIn' }] 
    });
}

// console.log(comment,"comment=======>")

    return (
        <SafeAreaView style={styles.main}>

            
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader myHeading={"Settings"}
            go={()=>navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')}
            />


            <View style={[styles.reelsStyle,]}>
                <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.blue_Button_Color }]}>Account</Text>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("EditProfile") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Edit Profile</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')} />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("ForgotPassword") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Change Password</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>

                


                <Text style={[styles.smalltxt, { marginTop: 10 }]}>Who can see my posts, photos, life updates</Text>
                <TouchableOpacity
                onPress={()=>{giveCommentPermission("everyone")}}

                    style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                    <Image
                        resizeMode='contain'
                        source={comment === "everyone" ?
                        require('../../../assets/images/image_.png')
                        :require('../../../assets/images/notimage_.png')
                    }
                    />
                    <Text style={[styles.smalltxt,]}>Everyone</Text>

                </TouchableOpacity>
                <TouchableOpacity
                onPress={()=>{giveCommentPermission("followers")}}
                    style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                    <Image
                        resizeMode='contain'
                        source={comment === "followers" ?
                        require('../../../assets/images/image_.png')
                        :require('../../../assets/images/notimage_.png')}
                    />
                    <Text style={[styles.smalltxt,]}>My Followers</Text>

                </TouchableOpacity>
                <TouchableOpacity
                 onPress={()=>{giveCommentPermission("none")}}
                    style={{ flexDirection: 'row', marginTop: 20, marginLeft: 20 }}>
                    <Image
                        resizeMode='contain'
                        source={comment ==="none" ?
                        require('../../../assets/images/image_.png')
                        :require('../../../assets/images/notimage_.png')}
                    />
                    <Text style={[styles.smalltxt,]}>Nobody</Text>

                </TouchableOpacity>





                <TouchableOpacity onPress={() => {navigation.navigate("HelpCenter") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Help Center</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>



                {/* <TouchableOpacity onPress={()=>{logout()}}
                
                style={{
                    marginTop: 20,
                    height:50,alignItems:'center',
                    backgroundColor:'red',
                    width:'95%',justifyContent:'center',
                    alignSelf:'center',
                    borderRadius:25
                }}>
                    <Text style={[styles.smalltxt,{color:'white',fontSize:24}]}>Logout</Text>

                </TouchableOpacity> */}
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