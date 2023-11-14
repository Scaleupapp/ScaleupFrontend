//@ts-ignore
//@ts-nocheck


import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Alert
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
const BasicDetail = (props) => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const { loginUser } = useSelector<any, any>((store) => store.cookies);
    const [selectedImage, setSelectedImage] = useState(null)
    const [location, setLocation] = useState("")
    const [date, setDate] = useState("")
    const [about, setAbout] = useState("")
    const [intrust, setIntrust] = useState("")
    const data= props?.route?.params?.data?.username

    console.log(selectedImage, 'selectedImage======>',data)



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
                    console.log('permisson ---------------__---------->', result)
                }).catch((err) => {
                    console.log('onRequestPermissionCatchError ->', err)
                })
            } else {
                console.log('updateImage ----------->')
                pickImageByCamera()
            }
        }).catch((err) => {
            console.log('onCheckPermissionCatchError ->', err)
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
            console.log(response, "response======>")
            if (response?.didCancel) {
                // props.close()
                console.log('User cancelled image picker');
            } else if (response?.error) {
                console.log('ImagePicker Error: ', response?.error);
            } else if (response?.customButton) {
                console.log('User tapped custom button: ', response?.customButton);
            } else {
                console.log('else ------>', response?.assets[0])
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
            console.log(response.assets, "response======>")
            if (response?.didCancel) {
                // props.close()
                console.log('User cancelled image picker');
            } else if (response?.error) {
                console.log('ImagePicker Error: ', response?.error);
            } else if (response?.customButton) {
                console.log('User tapped custom button: ', response.customButton);
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
         const data = { name: 'file.jpg', uri: selectedImage?.uri?.uri, type: "image/png"}
        formData.append('profilePicture', data);
        formData.append('location', location);
        formData.append('dateOfBirth', date);
        formData.append('bioAbout', about);
        formData.append('bioInterests', intrust);
        console.log(formData, "formData============>")
        dispatch(setLoading(true))
        basicDetail(formData).then((res) => {
            dispatch(setLoading(false))
            console.log("res======>", res?.data)
            Show_Toast(res?.data?.message)
            navigation.navigate("EducationDetail")
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
                    contentContainerStyle={{ justifyContent: 'space-between' }}
                    automaticallyAdjustKeyboardInsets
                    keyboardShouldPersistTaps
                >
                    <Text style={styles.myText}>{"Basic  Details"}</Text>
                    <Text style={styles.txt}>{Strings.FillOut}</Text>
                    <TouchableOpacity onPress={() => { showAlert() }}
                        style={styles.profile}>

                        <Image
                        resizeMode='center'
                            style={{ marginBottom: -20, height: 50, width: 50, borderRadius: 25 }}
                            source={selectedImage?.uri ? selectedImage?.uri : require('../../assets/images/personalcard.png')} />
                        <Image
                            style={{ marginLeft: 70, bottom: -5 }}
                            source={require('../../assets/images/EditSquare.png')}
                        />
                    </TouchableOpacity>
                    <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>{data}</Text>
                    <View style={[styles.inputView, { height: hp(35) }]}>
                        <InputText
                            length={16}
                            onChange={(text) => { setLocation(text) }}
                            value={location}
                            placeholder={"location"} />

                        <InputText
                            length={16}
                            onChange={(text) => { setDate(text) }}
                            value={date}
                            keyboardType={'number-pad'}
                            placeholder={"Date of Birth"} />
                        <InputText
                            length={26}
                            onChange={(text) => { setIntrust(text) }}
                            value={intrust}

                            placeholder={"Interest"} />
                        <InputText
                            length={26}
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
                        name={"Save & Next"} btnTextStyle={{ color: ColorCode.yellowText, fontFamily: 'ComicNeue-Bold' }} button={{ width: '44%' }} />
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
    }

})

export default BasicDetail;