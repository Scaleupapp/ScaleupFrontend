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

const Terms = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                animated={true}
                backgroundColor={ColorCode.blue_Button_Color}
            />

            <AuthHeader myHeading={Strings.TermsHeader} imge={require('../../assets/images/arrow-left.png')} />

            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                >
                    <Text style={styles.txt}>{"Welcome to ScaleUp!"}</Text>
                 

                    <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', width: '100%', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <Text style={[styles.txt,{textAlign:'left'}]}>{"ScaleUp is a social media platform that allows you to share photos, videos, and messages with friends, family, and followers. Before you begin using our services, please take some time to read and understand our Terms of Service . By accessing or using Social Sphere, you agree to be bound by these Terms, as well as our Privacy Policy and Community Guidelines. If you do not agree with any part of these Terms, please refrain from using Social Sphere."}</Text>
                   
                    </View>
                   
                    
                    
                        
                   
                </ScrollView>
                <View style={[{bottom:30,flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15}]}>
                <OpacityButton name={"Decline"} btnTextStyle={{color:ColorCode.yellowText,}} button={{width:'44%'}}/>
                <OpacityButton name={"Accept"} btnTextStyle={{color:ColorCode.yellowText,}} button={{width:'44%'}}/>
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
        width: '95%',
        alignSelf: 'center',
        marginTop: 20,
        fontFamily:'ComicNeue-Bold'

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
        height: hp(23),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,

    }

})

export default Terms;