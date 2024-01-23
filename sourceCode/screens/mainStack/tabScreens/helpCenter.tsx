<<<<<<< HEAD
=======
//@ts-nocheck
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
import {
    Image,StyleSheet, Text,
     TouchableOpacity, View, StatusBar, SafeAreaView,
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../../constants/Styles";
import {TabHeader } from "../../../components";
import { getMyProfile } from "../../../utils/apiHelpers";
import ConfirmDelete from "../../../components/confimDelete";
import { setLoginUser } from "../../../redux/cookiesReducer";
import { setProfileDat } from "../../../redux/reducer";

const HelpCenter = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [enable, setEnable] = useState(false)
    const [open, setOpen]=useState(false)
    
    const toggleSwitch = () => {
        setEnable(!enable)   
    }

    
    const logout = () => {
        dispatch(setLoginUser({}))
        dispatch(setProfileDat([]))
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }] 
        });
    }


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}/>
            <TabHeader myHeading={"HelpCenter"}
            go={()=>navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')}/>
            <View style={[styles.reelsStyle,]}>
                {/* <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.blue_Button_Color }]}>Account</Text> */}
                
<<<<<<< HEAD
               
=======
                <TouchableOpacity onPress={() => { navigation.navigate("BlockList") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Blocked User</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>


>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                <TouchableOpacity onPress={() => {setOpen(true)  }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Delete Account</Text>
                    <Image
                    tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>(logout())}
                    style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 20  }}>
                    <Text style={[styles.smalltxt,]}>Logout</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}/>
                </TouchableOpacity>
                
                <TouchableOpacity
                    onPress={()=>(navigation.navigate("Terms"))}
                    style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 20  }}>
                    <Text style={[styles.smalltxt,]}>Terms of Use</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>(navigation.navigate("PrivacyPolicy"))}
                    style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 20  }}>
                    <Text style={[styles.smalltxt,]}>Privacy Policy</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}/>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={()=>(navigation.navigate("Faqs"))}
                    style={{ flexDirection: 'row', justifyContent: 'space-between',marginTop: 20  }}>
                    <Text style={[styles.smalltxt,]}>FAQs</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}/>
                </TouchableOpacity>
                {open&&
                <ConfirmDelete
                close={()=>{setOpen(false)}}
                />
            }



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

export default HelpCenter;