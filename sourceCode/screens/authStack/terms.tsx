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
import { setTerms } from "../../redux/reducer";

const Terms = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                animated={true}
                backgroundColor={ColorCode.blue_Button_Color}
            />

            <AuthHeader myHeading={Strings.TermsHeader}
             imge={require('../../assets/images/arrow-left.png')} />

            <View style={styles.body}>
                <ScrollView style={{ flexGrow: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                >
                    <Text style={styles.txt}>{"Welcome to ScaleUp!"}</Text>


                    <View style={{
                        flexDirection: 'row',
                        marginTop: 20, alignItems: 'center', width: '100%',
                        justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 50
                    }}>
                        <Text style={[styles.txt, { textAlign: 'left' }]}>
                            {Strings.Terms}
                        </Text>

                    </View>





                </ScrollView>
                <View style={[{ bottom: 30, flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }]}>
                    <OpacityButton
                        name={"Decline"} btnTextStyle={{ color: ColorCode.yellowText, }}
                        button={{ width: '44%' }} 
                        pressButton={() => {dispatch(setTerms(false)),navigation.goBack()  }}
                        />
                    <OpacityButton name={"Accept"}
                        btnTextStyle={{ color: ColorCode.yellowText, }}
                        button={{ width: '44%' }} 
                        pressButton={() => {dispatch(setTerms(true)), navigation.goBack() }}
                        />
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
        height: hp(23),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10,

    }

})

export default Terms;