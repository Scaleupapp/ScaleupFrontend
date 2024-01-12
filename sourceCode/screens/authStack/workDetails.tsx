import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Button, Alert, Modal
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
import { PERMISSIONS, check, request } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { addWorkExperience } from "../../utils/apiHelpers";
import { Show_Toast } from "../../components/toast";
import { setLoading } from "../../redux/reducer";
import Loader from "../../components/loader";
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';
import moment from "moment";
import CalendarPicker from 'react-native-calendar-picker';
const WorkDetails = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [position, setPosition] = useState("")
    const [company, setCompany] = useState("")
    const [start, setStart] = useState("")
    const [end, setEnd] = useState("")
    const [description, setDescription] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const { name } = useSelector<any, any>((store) => store.sliceReducer);
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);
    const [addMoreList, setAddMoreList] = useState([])
    const { pofileData } = useSelector<any, any>((store) => store.sliceReducer);
    const [showcalenderPicker, setshowcalenderPicker] = useState(false)
    const [type, setType]=useState('')

    // console.log(pofileData?.user?.workExperience[0], "pofileData?.user?.workExperience[0]")

    const showAlert = () => {
        Alert.alert(
            'Alert',
            'Plaese select the image',
            [
                { text: 'Camera', onPress: () => { handleChooseCamera() } },
                { text: 'Gallery', onPress: () => { handleChooseGallery() } },
                { text: 'Back', onPress: () => console.log('Button 3 pressed') },
            ],
            { cancelable: true }
        );
    };


    const handleChooseCamera = () => {
        check(Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA })).then((result) => {
            if (result === 'denied') {
                request(Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA })).then((result) => {
                    // console.log('permisson ---------------__---------->', result)
                }).catch((err) => {
                    // console.log('onRequestPermissionCatchError ->', err)
                })
            } else {
                // console.log('updateImage ----------->')
                pickImageByCamera()
            }
        }).catch((err) => {
            // console.log('onCheckPermissionCatchError ->', err)
        })
    };

    const pickImageByCamera = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchCamera(options, (response) => {
            // console.log(response, "response======>")
            if (response?.didCancel) {
                // props.close()
                // console.log('User cancelled image picker');
            } else if (response?.error) {
                // console.log('ImagePicker Error: ', response?.error);
            } else if (response?.customButton) {
                // console.log('User tapped custom button: ', response?.customButton);
            } else {
                // console.log('else ------>', response?.assets[0])
                const source = { uri: response?.assets[0] };
                setSelectedImage(source);
                // props.close()
            }
        });
    }

    const handleChooseGallery = () => {
        const options = {
            title: 'Select Image',
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        launchImageLibrary(options, (response) => {
            // console.log(response.assets, "response======>")
            if (response?.didCancel) {
                // props.close()
                // console.log('User cancelled image picker');
            } else if (response?.error) {
                // console.log('ImagePicker Error: ', response?.error);
            } else if (response?.customButton) {
                // console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response?.assets[0] };
                setSelectedImage(source);
                // props.close()
            }
        });
    };



    const updateBasicUserDetail = () => {

        const formData = new FormData();
        // var filename = generateRandomString(10) + '.jpg';
        const data = { name: 'file.jpg', uri: selectedImage?.uri?.uri, type: "image/png" }
        formData.append('resume', data);
        formData.append('description', description);
        formData.append('company', company);
        formData.append('startDate', start);
        formData.append('endDate', end);
        formData.append('position', position);
        // console.log(formData, "formData============>")
        dispatch(setLoading(true))
        addWorkExperience(formData).then((res) => {
            dispatch(setLoading(false))
            // console.log("res======>", res?.data)
            Show_Toast(res?.data?.message)

            setPosition('')
            setCompany('')
            setStart('')
            setEnd('')
            setDescription('')
            setSelectedImage(null)

            navigation.navigate("Certification")
        })
    }


    const addBasicUserDetail = () => {

        const formData = new FormData();
        // var filename = generateRandomString(10) + '.jpg';
        const data = { name: 'file.jpg', uri: selectedImage?.uri?.uri, type: "image/png" }
        formData.append('resume', data);
        formData.append('description', description);
        formData.append('startDate', start);
        formData.append('endDate', end);
        formData.append('company', company);
        formData.append('position', position);
        const datas = {
            'resume': data,
            'description': description,
            'startDate': start,
            'endDate': end,
            'company': company,
            'position': position
        }

        setAddMoreList(prevData => [...prevData, datas]);
        // console.log(formData, "formData============>")
        dispatch(setLoading(true))
        addWorkExperience(formData).then((res) => {
            dispatch(setLoading(false))
            // console.log("res======>", res?.data)
            Show_Toast(res?.data?.message)
            setPosition('')
            setCompany('')
            setStart('')
            setEnd('')
            setDescription('')
            setSelectedImage(null)

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

                                    <Text style={styles.text}>{item?.company}</Text>
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
                        <Text numberOfLines={1} style={styles.menuText}>{item.description}</Text>
                    </MenuOption>

                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{item?.position}</Text>
                    </MenuOption>

                    <MenuOption
                        onSelect={() => { }}
                        style={styles.menuOption}>
                        <Text numberOfLines={1} style={styles.menuText}>{item?.company}</Text>
                    </MenuOption>

                </MenuOptions>




            </Menu>
        )
    }


    useEffect(() => {
        setPosition(pofileData?.user?.workExperience[0]?.position)
        setCompany(pofileData?.user?.workExperience[0]?.company)
        setStart(pofileData?.user?.workExperience[0]?.startDate)
        setEnd(pofileData?.user?.workExperience[0]?.endDate?.toString())
        setDescription(pofileData?.user?.workExperience[0]?.description)
        setSelectedImage(null)
    }, [])

    const onDateChange = (date: any) => {
        if (type === "Start") {
            setStart(date)
        } else {
            setEnd(date)
        }
        setshowcalenderPicker(false)
    }


    const openCalenderPicker = (type) => {

        setType(type)

        setshowcalenderPicker(true)

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

                        <Text style={[styles.myText, { alignSelf: 'center' }]}>{"Work Details"}</Text>

                        <View></View>
                    </View>
                    {/* <Text style={styles.myText}>{"Work Details"}</Text> */}
                    <Text style={styles.txt}>{Strings.FillOut}</Text>

                    {/* <View style={styles.profile}>
                        <Image
                            resizeMode='center'
                            style={{ marginBottom: -20, height: 50, width: 50, borderRadius: 25 }}
                            source={require('../../assets/images/personalcard.png')}
                        />
                        <Image
                            style={{ marginLeft: 70, bottom: -5 }}
                            source={require('../../assets/images/EditSquare.png')}
                        />
                    </View> */}

                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={{ justifyContent: 'space-between' }}
                        data={addMoreList.length > 0 ? addMoreList : pofileData?.user?.workExperience}
                        renderItem={renderItem_didNumber}
                        keyExtractor={(item, index) => index.toString()} />

                    <TouchableOpacity
                        onPress={() => { navigation.navigate("Certification") }}

                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>{name}</Text>
                        <Image
                            style={{ borderWidth: 2, borderColor: ColorCode.blue_Button_Color, padding: 2, right: 20, position: 'absolute' }}
                            source={require('../../assets/images/send.png')}
                        />

                    </TouchableOpacity>

                    <View style={[styles.inputView, { height: hp(54) }]}>
                        <InputText

                            onChange={(text) => { setPosition(text) }}
                            value={position}
                            placeholder={"Position"} />

                        <InputText

                            onChange={(text) => { setCompany(text) }}
                            value={company}
                            placeholder={"Company"} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                            {/* <InputText

                                onChange={(text) => { setStart(text) }}
                                value={start }
                                keyboardType={'number-pad'}
                                placeholder={"Start Date"} style={{ width: "40%" }} />

                            <InputText

                                keyboardType={'number-pad'}
                                onChange={(text) => { setEnd(text) }}
                                value={end }
                                placeholder={"End Date"} style={{ width: "40%" }} /> */}

                            <TouchableOpacity
                                onPress={() => { openCalenderPicker("Start") }}
                                style={[styles.calender, { justifyContent: 'space-between' }]}
                                activeOpacity={1}>
                                <Text style={{
                                    fontFamily: 'ComicNeue-Bold',
                                    paddingLeft: 10,
                                    color: 'grey'
                                }}>{start != null ?
                                    moment(start.toString()).format('YYYY-MM-DD ') :

                                    "Start Date"}</Text>
                                <Image
                                    style={{ transform: [{ rotate: '90deg' }], marginRight: 10 }}
                                    source={require('../../assets/images/ArrowRight.png')}
                                />
                            </TouchableOpacity>


                            <TouchableOpacity
                            onPress={() => { openCalenderPicker("end") }}
                            style={[styles.calender, { justifyContent: 'space-between' }]}
                            activeOpacity={1}>
                            <Text style={{
                                fontFamily: 'ComicNeue-Bold',
                                paddingLeft: 10,
                                color: 'grey'
                            }}>{end != null ?
                                moment(end.toString()).format('YYYY-MM-DD ') :

                                "End Date"}</Text>
                            <Image
                                style={{ transform: [{ rotate: '90deg' }], marginRight: 10 }}
                                source={require('../../assets/images/ArrowRight.png')}
                            />
                        </TouchableOpacity>

                        </View>
                        <InputText

                            onChange={(text) => { setDescription(text) }}
                            value={description}
                            placeholder={"Description"} />

                        {/* <InputText placeholder={"Skills"} /> */}
                        {
                            selectedImage?.uri?.uri ?
                                <Image
                                    resizeMode='center'
                                    style={styles.upload}
                                    source={selectedImage?.uri} />

                                :
                                <TouchableOpacity onPress={() => { showAlert() }}
                                    style={styles.upload}>
                                    <Image
                                        tintColor={'grey'}
                                        source={require('../../assets/images/personalcard.png')}
                                    />
                                    <Text numberOfLines={3}
                                        style={[{
                                            width: 120, textAlign: 'center',
                                            fontFamily: 'ComicNeue-Bold'
                                        }]}>{`Upload your \nresume \n(Max Size 20 MB)`}</Text>
                                </TouchableOpacity>
                        }

                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <OpacityButton
                        pressButton={() => { navigation.goBack() }}
                        name={"Back"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                        button={{
                            width: '44%',
                            backgroundColor: ColorCode.white_Color,
                            borderColor: ColorCode.blue_Button_Color, borderWidth: 1
                        }} />
                    <OpacityButton
                        pressButton={() => {
                            updateBasicUserDetail()
                        }}
                        name={"Save & Next"} btnTextStyle={{ color: ColorCode.yellowText, }}
                        button={{ width: '44%' }} />

                </View>
                <View style={styles.inputView}>

                    <OpacityButton
                        pressButton={() => { addBasicUserDetail() }}
                        name={"Add More"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                        button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                </View>
            </View>

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
    text: {

        fontSize: 12,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.white_Color,
        paddingHorizontal: 15,
        fontWeight: '400'

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
       
        
    }


})

export default WorkDetails;