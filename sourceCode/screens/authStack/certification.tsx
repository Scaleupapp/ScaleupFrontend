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

const Certification = () => {
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
                    <Text style={styles.myText}>{"Certification and Courses"}</Text>
                    <Text style={[styles.txt,{marginTop:10}]}>{Strings.FillOut}</Text>

                    <View style={styles.profile}>
                        <Image
                            source={require('../../assets/images/personalcard.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>John Smith</Text>
                        <Image
                            style={{ borderWidth: 2, borderColor: ColorCode.blue_Button_Color, padding: 2, right: 20, position: 'absolute' }}
                            source={require('../../assets/images/send.png')}
                        />
                    </View>
                    <Text style={[styles.myText,{textAlign:'left',marginLeft:20}]}>{"Certification"}</Text>
                    <View style={[styles.inputView, { height: hp(75) }]}>
                        <InputText placeholder={"Title"} />
                        <InputText placeholder={"Issuer"} />
                        <InputText placeholder={"Issued Date"} style={{ width: '44%',alignSelf:'flex-start',marginLeft:20}} />
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 ,paddingVertical:20,}}>
                            <OpacityButton
                                pressButton={() => { navigation.navigate("BasicDetail") }}
                                name={"save"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                                button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                            <OpacityButton
                                pressButton={() => { navigation.navigate("BasicDetail") }}
                                name={"Add More"} btnTextStyle={{ color: ColorCode.yellowText, }}
                                button={{ width: '44%' }} />

                        </View>
                        <Text style={[styles.myText,{textAlign:'left',marginLeft:20}]}>{"Certification"}</Text>
                        <InputText placeholder={"Description"} />
                        <InputText placeholder={"Skills"} />
                        <InputText placeholder={"Completion Date"} style={{ width: '44%',alignSelf:'flex-start',marginLeft:20}} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 ,paddingVertical:20}}>
                            <OpacityButton
                                pressButton={() => { navigation.navigate("BasicDetail") }}
                                name={"save"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                                button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                            <OpacityButton
                                pressButton={() => { navigation.navigate("BasicDetail") }}
                                name={"Add More"} btnTextStyle={{ color: ColorCode.yellowText, }}
                                button={{ width: '44%' }} />

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
        fontFamily: 'ComicNeue-Bold'
    },
    inputStyle: {
        width: '70%',
        fontFamily: 'ComicNeue-Bold'

    },
    inputView: {
        height: hp(8),
        justifyContent: 'space-between',
        marginTop: 5,
        marginBottom: 10

    },
    myText: {
        // marginBottom: 30,
        color: ColorCode.black_Color,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 34,
        fontFamily: 'ComicNeue-Bold'

    },
    profile: {
        height: 65,
        width: 65,
        backgroundColor: ColorCode.blue_Button_Color,
        borderRadius: 32,
        alignSelf: 'center',
        marginTop: 15,
        opacity: 10,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    upload: {
        width: '92%',
        height: '25%',
        backgroundColor: ColorCode.lightGrey,
        marginHorizontal: 15,
        borderRadius: 10,
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center', justifyContent: 'center'

    }

})

export default Certification;