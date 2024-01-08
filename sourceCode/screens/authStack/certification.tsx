import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Modal
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
import { addCertification, addCourse } from "../../utils/apiHelpers";
import Loader from "../../components/loader";
import { setLoading } from "../../redux/reducer";
import { Show_Toast } from "../../components/toast";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import moment from "moment";
import CalendarPicker from 'react-native-calendar-picker';
const Certification = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const { name, loading } = useSelector<any, any>((store) => store.sliceReducer);

    const [title, setTitle] = useState('')
    const [issuer, setIssuer] = useState('')
    const [issueDate, setIssuedate] = useState('')

    const [CourceTitle, setCourceTitle] = useState('')
    const [institution, setInstitution] = useState('')
    const [completionDate, setCompletionDate] = useState('')
    const { pofileData } = useSelector<any, any>((store) => store.sliceReducer);
    const [showcalenderPicker, setshowcalenderPicker] = useState(false)
    const [type, setType]=useState('')
    // console.log( pofileData?.user?.certifications,"pofileData======>")



    const certificationDetail = () => {
        const data = {
            "title": title,
            "issuer": issuer,
            "issueDate": issueDate
        }
        dispatch(setLoading(true))
        addCertification(data).then((res) => {
            // console.log(res?.data, "res====>")
            dispatch(setLoading(true))
            Show_Toast(res?.data?.message)
            setTitle('')
            setIssuedate('')
            setIssuer('')
            navigation.navigate("TabNavigator")
        })

    }


    const certificationDetailMore = () => {
        const data = {
            "title": title,
            "issuer": issuer,
            "issueDate": issueDate
        }
        dispatch(setLoading(true))
        addCertification(data).then((res) => {
            // console.log(res?.data, "res====>")
            dispatch(setLoading(true))
            Show_Toast(res?.data?.message)
            setTitle('')
            setIssuedate('')
            setIssuer('')

        })

    }





    const courseDetail = () => {
        const data = {
            "title": CourceTitle,
            "institution": institution,
            "completionDate": completionDate
        }

        dispatch(setLoading(true))
        addCourse(data).then((res) => {
            // console.log(res?.data, "res====>")
            dispatch(setLoading(true))
            Show_Toast(res?.data?.message)
            navigation.navigate("TabNavigator")
            setCourceTitle('')
            setInstitution('')
            setCompletionDate('')
        })

    }


    const courseDetailAdd = () => {
        const data = {
            "title": CourceTitle,
            "institution": institution,
            "completionDate": completionDate
        }

        dispatch(setLoading(true))
        addCourse(data).then((res) => {
            // console.log(res?.data, "res====>")
            dispatch(setLoading(true))
            Show_Toast(res?.data?.message)
            setCourceTitle('')
            setInstitution('')
            setCompletionDate('')
        })

    }



    const renderItem_didNumber = ({ item, index }: any) => {
        //   console.log(item, "item------>")
        return (
            <Menu>
                <MenuTrigger
                    customStyles={{
                        optionsWrapper: { padding: 2 },
                        TriggerTouchableComponent: ({ onPress }) => {
                            return (
                                <TouchableOpacity onPress={onPress} style={[styles.button, { marginLeft: 5, marginTop: 20, flexDirection: 'row' }]}>

                                    <Text style={styles.text}>{item?.title}</Text>
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
                        <Text numberOfLines={1} style={styles.menuText}>{item.title}</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{item?.issuer}</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{moment(item?.issueDate.toString()).format('YYYY-MM-DD ')}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }


    const renderItem_Corce = ({ item, index }: any) => {
        //  console.log(item, "item------>")
        return (
            <Menu>
                <MenuTrigger
                    customStyles={{
                        optionsWrapper: { padding: 2 },
                        TriggerTouchableComponent: ({ onPress }) => {
                            return (
                                <TouchableOpacity onPress={onPress} style={[styles.button, { marginLeft: 5, marginTop: 20, flexDirection: 'row' }]}>

                                    <Text style={styles.text}>{item?.title}</Text>
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
                        <Text numberOfLines={1} style={styles.menuText}>{item.title}</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{item?.institution}</Text>
                    </MenuOption>
                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{moment(item?.completionDate.toString()).format('YYYY-MM-DD ')}</Text>
                    </MenuOption>
                </MenuOptions>
            </Menu>
        )
    }
    
    const onDateChange = (date: any) => {
      if(type=== "issue"){
        setIssuedate(date)
      }else{
        setCompletionDate(date)
      }
        setshowcalenderPicker(false)
    }

    const openCalenderPicker = (type) => {

        setType(type)

        setshowcalenderPicker(true)

    }

    useEffect(() => {
        setTitle(pofileData?.user?.certifications[0]?.title)
        setIssuer(pofileData?.user?.certifications[0]?.issuer)
        setIssuedate(pofileData?.user?.certifications[0].issueDate)
        setCourceTitle(pofileData?.user?.courses[0]?.title)
        setInstitution(pofileData?.user?.courses[0]?.institution)
        setCompletionDate(pofileData?.user?.courses[0]?.completionDate)
    }, [])


    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color} />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }}>

                        <TouchableOpacity
                            onPress={() => { navigation.goBack() }}>
                            <Image
                                tintColor={'black'}
                                source={require('../../assets/images/arrow-left.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.myText, { alignSelf: 'center', marginRight: 15 }]}>{"Certification and Courses"}</Text>
                        <View></View>
                    </View>
                    {/* <Text style={styles.myText}>{"Certification and Courses"}</Text> */}
                    <Text style={[styles.txt, { marginTop: 10 }]}>{Strings.FillOut}</Text>
                    {/* <View style={styles.profile}>
                        <Image
                            source={require('../../assets/images/personalcard.png')} />
                    </View> */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>{name}</Text>
                        <Image
                            style={{ borderWidth: 2, borderColor: ColorCode.blue_Button_Color, padding: 2, right: 20, position: 'absolute' }}
                            source={require('../../assets/images/send.png')} />
                    </View>

                    <Text style={[styles.myText, { textAlign: 'left', marginLeft: 20 }]}>{"Certification"}</Text>

                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={{ justifyContent: 'space-between' }}
                        data={pofileData?.user?.certifications}
                        renderItem={renderItem_didNumber}
                        keyExtractor={(item, index) => index.toString()} />

                    <View style={[styles.inputView,]}>

                        <InputText
                            onChange={(text) => { setTitle(text) }}
                            value={title}
                            placeholder={"Title"}
                            style={{ marginTop: 15 }}
                        />
                        <InputText
                            onChange={(text) => { setIssuer(text) }}
                            value={issuer}
                            placeholder={"Issuer"}
                            style={{ marginTop: 15 }}
                        />
                        {/* <InputText
                            onChange={(text) => { setIssuedate(text) }}
                            value={issueDate }
                            keyboardType={'number-pad'}
                            placeholder={"Issued Date"}
                            style={{ width: '44%', alignSelf: 'flex-start', marginLeft: 20, marginTop: 15 }} /> */}

                        <TouchableOpacity
                            onPress={() => { openCalenderPicker('issue') }}
                            style={[styles.calender, { justifyContent: 'space-between' }]}
                            activeOpacity={1}>
                            <Text style={{
                                fontFamily: 'ComicNeue-Bold',
                                paddingLeft: 10,
                                color: 'grey'
                            }}>{issueDate != null ?
                                moment(issueDate.toString()).format('YYYY-MM-DD ') :

                                "Date of Birth"}</Text>
                            <Image
                                style={{ transform: [{ rotate: '90deg' }], marginRight: 10 }}
                                source={require('../../assets/images/ArrowRight.png')}
                            />
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20, }}>
                            <OpacityButton
                                pressButton={() => { certificationDetail() }}
                                name={"save"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                                button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                            <OpacityButton
                                pressButton={() => { certificationDetailMore() }}
                                name={"Add More"} btnTextStyle={{ color: ColorCode.yellowText, }}
                                button={{ width: '44%' }} />
                        </View>
                        <Text style={[styles.myText, { textAlign: 'left', marginLeft: 20 }]}>{"Courses"}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <FlatList
                                scrollEnabled
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                contentContainerStyle={{ justifyContent: 'space-between' }}
                                data={pofileData?.user?.courses}
                                renderItem={renderItem_Corce}
                                keyExtractor={(item, index) => index.toString()} />
                        </View>
                        <InputText
                            onChange={(text) => { setCourceTitle(text) }}
                            value={CourceTitle}
                            placeholder={"Title"}
                            style={{ marginTop: 15 }}
                        />
                        <InputText
                            onChange={(text) => { setInstitution(text) }}
                            value={institution}
                            placeholder={"Institution"}
                            style={{ marginTop: 15 }}
                        />

                        {/* <InputText
                            onChange={(text) => { setCompletionDate(text) }}
                            value={completionDate}
                            keyboardType={'number-pad'}
                            placeholder={"Completion Date"}
                            style={{ width: '44%', alignSelf: 'flex-start', marginLeft: 20, marginTop: 15 }} />
                        */}
                       
                       <TouchableOpacity
                            onPress={() => { openCalenderPicker("completion") }}
                            style={[styles.calender, { justifyContent: 'space-between' }]}
                            activeOpacity={1}>
                            <Text style={{
                                fontFamily: 'ComicNeue-Bold',
                                paddingLeft: 10,
                                color: 'grey'
                            }}>{completionDate != null ?
                                moment(completionDate.toString()).format('YYYY-MM-DD ') :

                                "Date of Birth"}</Text>
                            <Image
                                style={{ transform: [{ rotate: '90deg' }], marginRight: 10 }}
                                source={require('../../assets/images/ArrowRight.png')}
                            />
                        </TouchableOpacity>
                       
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 20 }}>
                            <OpacityButton
                                pressButton={() => { courseDetail() }}
                                name={"save"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                                button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                            <OpacityButton
                                pressButton={() => { courseDetailAdd() }}
                                name={"Add More"} btnTextStyle={{ color: ColorCode.yellowText, }}
                                button={{ width: '44%' }} />
                        </View>
                    </View>
                </ScrollView>

                {showcalenderPicker &&
                    <Modal isVisible={showcalenderPicker}

                        animationIn={'zoomIn'} animationOut={'zoomOut'} backdropOpacity={0.1}
                        onBackdropPress={() => setshowcalenderPicker(false)} transparent={true}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => { setshowcalenderPicker(false) }}
                            style={{ justifyContent: 'center', alignItems: 'center', flex: 1, }}>
                            <View style={{ height: hp(45), backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: 10 }}>
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => setshowcalenderPicker(false)}

                                style={{
                                    height: 50, width: 50,
                                    position: 'absolute', backgroundColor: 'white',
                                    zIndex: 1, alignItems: 'center',
                                    justifyContent: 'center', borderRadius: 25,
                                     left: 0,top:-0
                                }}>
                                <Image
                                    source={require('../../assets/images/close_24px.png')}
                                />
                            </TouchableOpacity>
                                <CalendarPicker width={350}
                                    todayBackgroundColor={ColorCode.blue_Button_Color}
                                    todayTextStyle={{ color: ColorCode.white_Color }}
                                    // minDate={new Date()}
                                    onDateChange={onDateChange} />
                            </View>
                        </TouchableOpacity>
                    </Modal>}

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
        height: hp(80),
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
    button: {
        height: 30,
        backgroundColor: ColorCode.blue_Button_Color,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    calender: {
        height: 50,
        width: '40%',
        backgroundColor: ColorCode.white_Color,
        borderRadius: hp(8),
        elevation: 20,
        shadowColor: ColorCode.white_Color,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        borderColor: '#ddd',
        borderWidth: 1,
        paddingLeft: 15,
        fontWeight: '600',
        fontSize: 14,
        color: ColorCode.black_Color,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
        marginTop:20
    }

})

export default Certification;