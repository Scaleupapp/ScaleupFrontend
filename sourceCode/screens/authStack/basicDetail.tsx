
//@ts-nocheck
import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Alert, Modal
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
import { basicDetail } from "../../utils/apiHelpers";
import { setLoading } from "../../redux/reducer";
import axios from "axios";
import { Show_Toast } from "../../components/toast";
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment";
import Loader from "../../components/loader";

const BasicDetail = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const { loginUser } = useSelector<any, any>((store) => store.cookies);
    const { name } = useSelector<any, any>((store) => store.sliceReducer);
    const [selectedImage, setSelectedImage] = useState(null)
    const [location, setLocation] = useState(pofileData?.user?.location)
    const [date, setDate] = useState("")
    const [about, setAbout] = useState("")
    const [intrust, setIntrust] = useState("")
    const [showcalenderPicker, setshowcalenderPicker] = useState(false)
    const data = props?.route?.params?.data?.username
    const [selectedStartDate, setselectedStartDate] = useState(null)
    // console.log(selectedImage, 'selectedImage======>', data)
    const { pofileData } = useSelector<any, any>((store) => store.sliceReducer);
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);
   
    //  console.log("pofileData=====>",pofileData?.user?.dateOfBirth,"pofileData=====>",intrust)


useEffect(()=>{
    setSelectedImage(pofileData?.user?.profilePicture)
    setLocation(pofileData?.user?.location ? pofileData?.user?.location : "")
    setIntrust(pofileData?.user?.bio?.bioInterests?.join(', '))
    setAbout(pofileData?.user?.bio?.bioAbout)
    setselectedStartDate(moment(pofileData?.user?.dateOfBirth?.toString()).format('YYYY-MM-DD'))
},[])


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
        formData.append('profilePicture', data);
        formData.append('location', location);
        formData.append('dateOfBirth', moment(selectedStartDate.toString()).format('YYYY-MM-DD'));
        formData.append('bioAbout', about);
        formData.append('bioInterests', intrust);
        // console.log(formData, "formData============>")
        dispatch(setLoading(true))
        basicDetail(formData).then((res) => {
            dispatch(setLoading(false))
            // console.log("res======>", res?.data)
            Show_Toast(res?.data?.message)
            navigation.navigate("EducationDetail")
        })
    }


    const openCalenderPicker = () => {
        setshowcalenderPicker(true)

    }
    const onDateChange = (date: any) => {
        setselectedStartDate(date)
        setshowcalenderPicker(false)
    }



    return (
        <SafeAreaView style={styles.main}>
             {loading && <Loader />}
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color} />
            <View style={styles.body}>
                <ScrollView style={{ flex: 1 }}
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                    automaticallyAdjustKeyboardInsets
                    keyboardShouldPersistTaps>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, }}>

                        <TouchableOpacity
                        onPress={()=>{navigation.goBack()}}
                        >
                            <Image
                                tintColor={'black'}
                                source={require('../../assets/images/arrow-left.png')}
                            />
                        </TouchableOpacity>

                        <Text style={[styles.myText, { alignSelf: 'center',marginRight:15}]}>{"Basic  Details"}</Text>
                        <View></View>
                    </View>
                    <Text style={styles.txt}>{Strings.FillOut}</Text>
                    <TouchableOpacity onPress={() => { showAlert() }}
                        style={styles.profile}>

                        <Image
                            resizeMode='cover'
                            style={{ marginBottom: -20, height: '100%', width:'100%', borderRadius: 30 }}
                            source={selectedImage?.uri ? selectedImage?.uri :
                                selectedImage ? {uri:selectedImage} :
                                require('../../assets/images/personalcard.png')} />
                        <Image
                            style={{ marginLeft: 70, bottom: -5 }}
                            source={require('../../assets/images/EditSquare.png')}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>{name != '' ?name : pofileData?.user?.username  }</Text>
                    <View style={[styles.inputView, { height: hp(35) }]}>
                        <InputText
                            length={16}
                            onChange={(text) => { setLocation(text) }}
                            value={location}
                            placeholder={"location"}
                             />

                        {/* <InputText
                            length={16}
                            onChange={(text) => { setDate(text) }}
                            value={date}
                            keyboardType={'number-pad'}
                            placeholder={"Date of Birth"} /> */}
                        <TouchableOpacity
                            onPress={() => { openCalenderPicker() }}
                            style={[styles.calender, { justifyContent: 'space-between' }]}
                            activeOpacity={1}>
                            <Text style={{
                                fontFamily: 'ComicNeue-Bold',
                                paddingLeft: 10,
                                color: 'grey'
                            }}>{selectedStartDate != null ?
                                moment(selectedStartDate.toString()).format('YYYY-MM-DD ') :
                                
                                 "Date of Birth"}</Text>
                            <Image
                                style={{ transform: [{ rotate: '90deg' }], marginRight: 10 }}
                                source={require('../../assets/images/ArrowRight.png')}
                            />
                        </TouchableOpacity>
                        <InputText
                            onChange={(text) => {setIntrust(text) }}
                            value={intrust}
                            placeholder={"Enter interests comma separated "} />

                        {intrust.length > 0 &&
                            <View style={{
                                flexDirection: 'row',
                                 paddingHorizontal: 15
                            }}>
                                {intrust.split(',').map((interest, index) => (
                                    <TouchableOpacity key={index} style={{
                                        padding: 5,
                                        margin: 5, borderWidth: 1, borderRadius: 5
                                    }}>
                                        <Text>{interest.trim()}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>}


                        <InputText

                            onChange={(text) => { setAbout(text) }}
                            value={about}
                            placeholder={"About You"} />
                    </View>
                </ScrollView>
                <View style={styles.inputView}>
                    <OpacityButton
                        pressButton={() => {
                            updateBasicUserDetail()
                        }}
                        name={"Save & Next"}
                        btnTextStyle={{
                            color: ColorCode.yellowText,
                            fontFamily: 'ComicNeue-Bold'
                        }}
                        button={{ width: '44%' }} />
                </View>

                {showcalenderPicker &&
                    <Modal isVisible={showcalenderPicker}
                        animationIn={'zoomIn'} animationOut={'zoomOut'} backdropOpacity={0.1}
                        onBackdropPress={() => setshowcalenderPicker(false)} transparent={true}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                            <View style={{ height: hp(45), backgroundColor: 'white', justifyContent: 'center',
                             alignItems: 'center', borderRadius: 10, elevation: 10 }}>
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
                        </View>
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
        fontFamily: 'ComicNeue-Bold'

    },
    profile: {
        height: 65,
        width: 65,
        backgroundColor: ColorCode.blue_Button_Color,
        borderRadius: 32,
        alignSelf: 'center',
        marginTop: 50,
        opacity: 10,
        elevation: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    calender: {
        height: 50,
        width: '90%',
        backgroundColor: ColorCode.white_Color,
        alignSelf: 'center',
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
        alignItems: 'center'
    }

})

export default BasicDetail;
