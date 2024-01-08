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

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [enable, setEnable] = useState(false)
    
    
    const toggleSwitch = () => {
        setEnable(!enable)   
    }

    



    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}/>
            <TabHeader myHeading={"Edit Profile"}
            go={()=>navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')}/>
            <View style={[styles.reelsStyle,]}>
                {/* <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.blue_Button_Color }]}>Account</Text> */}
                <TouchableOpacity
                    onPress={()=>(navigation.navigate("BasicDetail"))}
                    style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={[styles.smalltxt,]}>Basic Profile</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { navigation.navigate("EducationDetail") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Education</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>


                <TouchableOpacity
                    onPress={() => { navigation.navigate("WorkDetails") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Work Experience</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { navigation.navigate("Certification") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Certifications</Text>
                    <Image
                     tintColor={'grey'}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </TouchableOpacity>

                {/* <TouchableOpacity
                    onPress={() => { navigation.navigate("ForgotPassword") }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={[styles.smalltxt,]}>Change Password</Text>
                    <Image
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
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

export default EditProfile;