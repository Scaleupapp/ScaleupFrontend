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
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import Loader from "../../components/loader";
const EducationDetail = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [degree, setDegee] = useState("")
    const [school, setSchool] = useState("")
    const [date, setDate] = useState("")
    const [field, setField] = useState("")
    const [addMoreList, setAddMoreList] = useState([])
    const { name } = useSelector<any, any>((store) => store.sliceReducer);
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);
    const { pofileData } = useSelector<any, any>((store) => store.sliceReducer);
  
   
    const updateDetail = () => {
        const data = {
            "degree": degree,
            "fieldOfStudy": field,
            "school": school,
            "graduationYear": date
        }
        dispatch(setLoading(true))
        updateEducationDetail(data).then((res) => {
            dispatch(setLoading(false))
            console.log("res======>", res?.data)
            Show_Toast(res?.data?.message)
            navigation.navigate("WorkDetails")
        })
    }


    const AddMore = () => {
        const data = {
            "degree": degree,
            "fieldOfStudy": field,
            "school": school,
            "graduationYear": date
        }
        dispatch(setLoading(true))
        setAddMoreList(prevData => [...prevData, data]);



        updateEducationDetail(data).then((res) => {
            dispatch(setLoading(false))
            console.log("res======>", res?.data)
            Show_Toast(res?.data?.message)
            setDegee('')
            setSchool('')
            setDate('')
            setField('')
            console.log(addMoreList, "addMoreList=====>")
        })
    }

    const renderItem_didNumber = ({ item, index }: any) => {
        // console.log(item, "item------>")
        return (
            <Menu>
                <MenuTrigger
                    customStyles={{
                        optionsWrapper: { padding: 2 },
                        TriggerTouchableComponent: ({ onPress }) => {
                            return (
                                <TouchableOpacity onPress={onPress} style={[styles.button, { marginLeft: 5, marginTop: 20, flexDirection: 'row' }]}>

                                    <Text style={styles.text}>{item?.degree}</Text>
                                    <Image
                                        tintColor={"white"}
                                        style={{ transform: [{ rotate: '90deg' }], marginRight: 10 }}
                                        source={require('../../assets/images/ArrowRight.png')} />
                                </TouchableOpacity>);
                        },
                    }} />
                <MenuOptions
                    optionsContainerStyle={{}}
                    customStyles={{
                        optionsContainer: {
                            // width: wp('80%'),
                            backgroundColor: ColorCode.white_Color,
                            height: 90, width: 100, marginTop: 50, marginLeft: 10
                        }
                    }}>

                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{item.fieldOfStudy}</Text>
                    </MenuOption>

                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{item?.graduationYear}</Text>
                    </MenuOption>

                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{item?.school}</Text>
                    </MenuOption>

                </MenuOptions>




            </Menu>
        )
    }


    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    automaticallyAdjustKeyboardInsets={true}
                    keyboardShouldPersistTaps="always"
                    keyboardDismissMode='interactive'
                    contentContainerStyle={{ justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15 }}>
                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}
                        >
                            <Image
                                tintColor={'black'}
                                source={require('../../assets/images/arrow-left.png')}
                            />
                        </TouchableOpacity>

                        <Text style={[styles.myText, { alignSelf: 'center' }]}>{"Education Details"}</Text>

                        <View></View>
                    </View>

                    <Text style={styles.txt}>{Strings.FillOut}</Text>

                    {/* <View style={styles.profile}>
                        <Image
                            resizeMode='center'
                            style={{ marginBottom: -20, height: 50, width: 50, borderRadius: 25 }}
                            source={require('../../assets/images/document-text.png')}
                        />
                        <Image
                            style={{ marginLeft: 70, bottom: -5 }}
                            source={require('../../assets/images/EditSquare.png')}
                        />
                    </View> */}
                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={{ justifyContent: 'space-between' }}
                        data={addMoreList.length > 0 ?addMoreList: pofileData?.user?.education}
                        renderItem={renderItem_didNumber}
                        keyExtractor={(item, index) => index.toString()} />




                    <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>{name}</Text>


                    <View style={[styles.inputView, { height: hp(34) }]}>
                        <InputText

                            onChange={(text) => { setDegee(text) }}
                            value={degree != ''? degree : pofileData?.user?.education[0].degree}
                            placeholder={"Degree"} />
                        <InputText

                            onChange={(text) => { setSchool(text) }}
                            value={school != '' ? school : pofileData?.user?.education[0].school}
                            placeholder={"School Name"} />
                        <InputText

                            onChange={(text) => { setDate(text) }}
                            value={date != '' ? date : pofileData?.user?.education[0].graduationYear}
                            keyboardType={'number-pad'}
                            placeholder={"Graduation Date"} />
                        <InputText

                            onChange={(text) => { setField(text) }}
                            value={field != '' ?field :pofileData?.user?.education[0].fieldOfStudy}
                            placeholder={"Field of Study"} />
                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <OpacityButton
                        pressButton={() => { navigation.goBack() }}
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
                        pressButton={() => { AddMore() }}
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
    },
    button: {
        height: 30,
        backgroundColor: ColorCode.blue_Button_Color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    text: {

        fontSize: 12,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.white_Color,
        paddingHorizontal: 15,
        fontWeight: '400'

    },

    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 30,
        justifyContent: 'flex-start'
    },
    menuText: {
        color: 'black',
        fontSize: 12,
        fontWeight: '400',
        marginLeft: 5,
        textAlign: 'left'
    },

})

export default EducationDetail;