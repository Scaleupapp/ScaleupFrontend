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
import { updateEducationDetail } from "../../utils/apiHelpers";
import { setLoading } from "../../redux/reducer";
import { Show_Toast } from "../../components/toast";

const EducationDetail = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [degree, setDegee] = useState("")
    const [school, setSchool] = useState("")
    const [date, setDate] = useState("")
    const [field, setField]=useState("")


const updateDetail=()=>{
    const data ={
        "degree": degree,
        "fieldOfStudy": field,
        "school": school,
        "graduationYear":date
      }
    dispatch(setLoading(true))
    updateEducationDetail(data).then((res)=>{
        dispatch(setLoading(false))
        console.log("res======>", res?.data)
        Show_Toast(res?.data?.message)
        navigation.navigate("WorkDetails") 
    })
}



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
                    <Text style={styles.myText}>{"Education Details"}</Text>
                    <Text style={styles.txt}>{Strings.FillOut}</Text>

                    <View style={styles.profile}>
                        <Image
                            resizeMode='center'
                            style={{ marginBottom: -20, height: 50, width: 50, borderRadius: 25 }}
                            source={require('../../assets/images/document-text.png')}
                        />
                        <Image
                            style={{ marginLeft: 70, bottom: -5 }}
                            source={require('../../assets/images/EditSquare.png')}
                        />
                    </View>

                    <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>John Smith</Text>


                    <View style={[styles.inputView, { height: hp(34) }]}>
                        <InputText
                            length={26}
                            onChange={(text) => { setDegee(text) }}
                            value={degree}
                            placeholder={"Degree"} />
                        <InputText 
                        length={26}
                        onChange={(text) => { setSchool(text) }}
                        value={school}
                        placeholder={"School Name"} />
                        <InputText
                         length={16}
                         onChange={(text) => { setDate(text) }}
                        value={date}
                            keyboardType={'number-pad'}
                            placeholder={"Graduation Date"} />
                        <InputText 
                        length={26}
                        onChange={(text) => { setField(text) }}
                       value={field}
                        placeholder={"Field of Study"} />
                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <OpacityButton
                        pressButton={() => { navigation.navigate("BasicDetail") }}
                        name={"Back"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                        button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                    <OpacityButton
                        pressButton={() => { 
                            updateDetail()
                            
                        }}
                        name={"Save & Next"} btnTextStyle={{ color: ColorCode.yellowText, }}
                        button={{ width: '44%' }} />

                </View>
                <View style={styles.inputView}>

                    <OpacityButton
                        pressButton={() => { navigation.navigate("WorkDetails") }}
                        name={"Add More"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                        button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
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
        fontFamily: 'ComicNeue-Bold'
    },
    inputStyle: {
        width: '70%',
        fontFamily: 'ComicNeue-Bold'

    },
    inputView: {
        height: hp(8),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10

    },
    myText: {
        marginBottom: 30,
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
    }

})

export default EducationDetail;