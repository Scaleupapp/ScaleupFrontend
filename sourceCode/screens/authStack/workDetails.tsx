import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Button, Alert
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
const WorkDetails = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const[position, setPosition]=useState("")
    const[company, setCompany]=useState("")
    const[start,setStart]=useState("")
    const [end, setEnd]=useState("")
    const [description,setDescription]=useState("")
    const [selectedImage, setSelectedImage] = useState(null)

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
        formData.append('resume', data);
        formData.append('description', description);
        formData.append('company', company);
        formData.append('startDate', start);
        formData.append('endDate', end);
        formData.append('description', description);
        console.log(formData, "formData============>")
        dispatch(setLoading(true))
        addWorkExperience(formData).then((res) => {
            dispatch(setLoading(false))
            console.log("res======>", res?.data)
            Show_Toast(res?.data?.message)
            navigation.navigate("Certification")
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
                    <Text style={styles.myText}>{"Work Details"}</Text>
                    <Text style={styles.txt}>{Strings.FillOut}</Text>

                    <View style={styles.profile}>
                        <Image
                            resizeMode='center'
                            style={{ marginBottom: -20, height: 50, width: 50, borderRadius: 25 }}
                            source={require('../../assets/images/personalcard.png')}
                        />
                        <Image
                            style={{ marginLeft: 70, bottom: -5 }}
                            source={require('../../assets/images/EditSquare.png')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={[styles.myText, { fontSize: 16, marginTop: 20 }]}>John Smith</Text>
                        <Image
                            style={{ borderWidth: 2, borderColor: ColorCode.blue_Button_Color, padding: 2, right: 20, position: 'absolute' }}
                            source={require('../../assets/images/send.png')}
                        />

                    </View>

                    <View style={[styles.inputView, { height: hp(54) }]}>
                        <InputText
                        length={26}
                        onChange={(text) => { setPosition(text) }}
                        value={position}
                            placeholder={"Position"} />

                        <InputText
                        length={26}
                        onChange={(text) => { setCompany(text) }}
                        value={company}
                            placeholder={"Company"} />
                       
                        <View style={{flexDirection:'row',justifyContent:'space-evenly'}}>
                       
                        <InputText 
                        length={16}
                        onChange={(text) => { setStart(text) }}
                        value={start}
                        keyboardType={'number-pad'}
                        placeholder={"Start Date"} style={{width:"40%"}}/> 
                        
                        <InputText 
                        length={16}
                        keyboardType={'number-pad'}
                        onChange={(text) => { setEnd(text) }}
                        value={end}
                        placeholder={"End Date"} style={{width:"40%"}}/>
                        </View>
                        <InputText 
                        length={16}
                        onChange={(text) => { setDescription(text) }}
                        value={description}
                        placeholder={"Description"} />

                        {/* <InputText placeholder={"Skills"} /> */}

                        <TouchableOpacity onPress={()=>{showAlert()}}
                        style={styles.upload}>
                            <Image
                                tintColor={'grey'}
                                source={require('../../assets/images/personalcard.png')}
                            />
                            <Text numberOfLines={3} style={[{ width: 120, textAlign: 'center', fontFamily: 'ComicNeue-Bold' }]}>{`Upload your \nresume \n(Max Size 20 MB)`}</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                    <OpacityButton
                        pressButton={() => { navigation.navigate("BasicDetail") }}
                        name={"Back"} btnTextStyle={{ color: ColorCode.blue_Button_Color, }}
                        button={{ width: '44%', backgroundColor: ColorCode.white_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                    <OpacityButton
                        pressButton={() => { 
                            updateBasicUserDetail() }}
                        name={"Save & Next"} btnTextStyle={{ color: ColorCode.yellowText, }}
                        button={{ width: '44%' }} />

                </View>
                <View style={styles.inputView}>

                    <OpacityButton
                        pressButton={() => { navigation.navigate("Certification") }}
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

export default WorkDetails;