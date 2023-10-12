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

const BasicDetail = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}>
                    <Text style={styles.myText}>{"Basic  Details"}</Text>
                    <Text style={styles.txt}>{Strings.FillOut}</Text>

                    <View style={styles.profile}>
                        <Image
                        source={require('../../assets/images/personalcard.png')}
                        />
                    </View>

                    <Text style={[styles.myText,{fontSize:16,marginTop:20}]}>John Smith</Text>

                    <Image
                    style={{marginLeft:wp(25)}}
                    source={require('../../assets/images/EditSquare.png')}
                    />
                    <View style={[styles.inputView, { height: hp(35) }]}>
                        <InputText placeholder={"location"} />
                        <InputText placeholder={"Date of Birth"} />
                        <InputText placeholder={"Interest"} />
                        <InputText placeholder={"About You"} />
                    </View>
                </ScrollView>
                <View style={styles.inputView}>
                    <OpacityButton
                        pressButton={() => { navigation.navigate("EducationDetail") }}
                        name={"Save & Next"} btnTextStyle={{ color: ColorCode.yellowText, fontFamily:'ComicNeue-Bold'}} button={{ width: '44%' }} />
                </View>
            </View>
        </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorCode.white_Color
    },
    body: {
        flex: 1,
        backgroundColor: ColorCode.white_Color,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    txt: {
        fontWeight: '400',
        fontSize: 14,
        lineHeight: 20,
        textAlign: 'center',
        color: ColorCode.gray_color,
        width: '90%',
        alignSelf: 'center',
        fontFamily:'ComicNeue-Bold'
    },
    inputStyle: {
        width: '70%',

    },
    inputView: {
        height: hp(8),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10

    },
    myText: {
        marginBottom: 30,
        color: ColorCode.gray_color,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 34,
        fontFamily:'ComicNeue-Bold'

    },
    profile:{
        height:65,
        width:65,
        backgroundColor:ColorCode.blue_Button_Color,
        borderRadius:32,
        alignSelf:'center',
        marginTop:50,
        opacity:10,
        elevation:10,
        alignItems:'center',
        justifyContent:'center'
    }

})

export default BasicDetail;