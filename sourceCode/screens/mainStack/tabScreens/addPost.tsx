//@ts-ignore
//@ts-nocheck
import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar,
    SafeAreaView, Switch, Alert, KeyboardAvoidingView,

} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../../constants/Styles";
import OpacityButton from "../../../components/opacityButton";
import InputText from "../../../components/textInput";
import { AuthHeader, TabHeader } from "../../../components";
import Strings from "../../../constants/strings";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import reelsData from "../../../constants/helpers";
import { videos } from "../../../constants/commonFuntions";
import Video from 'react-native-video';
import { PERMISSIONS, check, request } from 'react-native-permissions';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Show_Toast } from "../../../components/toast";
import { contentCreate } from "../../../utils/apiHelpers";
import Loader from "../../../components/loader";
import { setLoading } from "../../../redux/reducer";

const AddPost = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [enable, setEnable] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null)
    const [caption, setCaption] = useState('')
    const [hashtag, setHashtags] = useState('')
    const [myType, setMyType] = useState('')
    const [myHeading, setMyHeading] = useState('')
    const [myTopic, setMyTopic] = useState('')
    const { pofileData, loading } = useSelector<any, any>((store) => store.sliceReducer);
    const toggleSwitch = () => {
        setEnable(!enable)
    }

    const setCaptionLength = (t) => {

        setCaption(t)

    }



    const showAlert = (type) => {
        check(Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA })).then((result) => {
            if (result === 'denied') {
                request(Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA })).then((result) => {
                    // console.log('permisson ---------------__---------->', result)
                }).catch((err) => {
                    // console.log('onRequestPermissionCatchError ->', err)
                })

            }
        }).catch((err) => {
            // console.log('onCheckPermissionCatchError ->', err)
        })
        // console.log("type--->", type)
        setMyType(type)
        Alert.alert(
            'Alert',
            'Plaese select the ' + type + ' option',
            [
                { text: 'Camera', onPress: () => { handleChooseCamera(type) } },
                { text: 'Gallery', onPress: () => { handleChooseGallery(type) } },
                { text: 'Back', onPress: () => console.log('Button 3 pressed') },
            ],
            { cancelable: true }
        );
    };



    const handleChooseCamera = (type) => {
        check(Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA })).then((result) => {
            if (result === 'denied') {
                request(Platform.select({ ios: PERMISSIONS.IOS.CAMERA, android: PERMISSIONS.ANDROID.CAMERA })).then((result) => {
                    // console.log('permisson ---------------__---------->', result)
                }).catch((err) => {
                    // console.log('onRequestPermissionCatchError ->', err)
                })
            } else {
                // console.log('updateImage ----------->')
                pickImageByCamera(type)
            }
        }).catch((err) => {
            // console.log('onCheckPermissionCatchError ->', err)
        })
    };

    const pickImageByCamera = (type) => {
        const options = {
            title: 'Select Image',
            mediaType: type,
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

    const handleChooseGallery = (type) => {
        const options = {
            title: 'Select Image',
            mediaType: type,
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
                // console.log(source, "source----->")
                setSelectedImage(source);
                // props.close()
            }
        });
    };

    // console.log(selectedImage?.uri,"11111selectedImage?.uri?.uri===>")

    const addPost = () => {

        // console.log(hashtag, "hashtag---->", typeof hashtag)
        const type = myType === "image" ? "Image" : "Video"
        var dta = ''
        myType === "image" ? dta = "image/png" : 'video/mp4'
        const formData = new FormData();
        const data = { name:  myType === "image"?'file.jpg' : "video.mp4", uri: selectedImage?.uri?.uri, type: "multipart/form-data"}
        formData.append('media', data);
        formData.append('captions', caption);
        formData.append('hashtags', hashtag);
        formData.append('heading', myHeading);
        formData.append('verify', enable ? "Yes" : "No");
        formData.append('relatedTopics', myTopic);
        formData.append('contentType', type);
        dispatch(setLoading(true))
        contentCreate(formData).then((res) => {
            // console.log(res.data, "res=====>")
            Show_Toast(res.data.message)
            setEnable(false)
            setSelectedImage(null)
            setMyType('')
            setCaption('')
            setHashtags('')
            dispatch(setLoading(false))
            navigation.navigate("Home")
        })
    }


    const canCel = () => {
        setEnable(false)
        setSelectedImage(null)
        setMyType('')
        setCaption('')
        setHashtags('')
        navigation.navigate("Home")
    }



    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            <TabHeader myHeading={"New Post"}
                go={() => navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')} />
            {/* <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
             style={{ flex: 1 }}
            > */}
            <ScrollView style={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                automaticallyAdjustKeyboardInsets={true}
                keyboardShouldPersistTaps="always"
                keyboardDismissMode='interactive'
            >

                <StatusBar
                    barStyle={'dark-content'}
                    animated={true}
                    backgroundColor={ColorCode.white_Color} />


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                    <Text style={styles.smalltxt}>Want to verify it ?</Text>

                    <Switch
                        trackColor={{ false: "grey", true: ColorCode.blue_Button_Color }}
                        thumbColor={enable ? "white" : "white"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleSwitch}
                        value={enable}
                    />
                </View>
                <View style={{ justifyContent: 'space-between', paddingHorizontal: 10 }}>

                    <Text style={[styles.smalltxt, { marginTop: 10 }]}>Heading</Text>
                    <View style={styles.inputfield}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                multiline
                                // placeholder="Type here...."
                                placeholderTextColor={ColorCode.gray_color}
                                style={styles.textInput}
                                value={myHeading}
                                maxLength={20}
                                onChangeText={(t) => { setMyHeading(t) }}
                            />
                            <Text style={[styles.smalltxt]}>{myHeading.length + "/20"}</Text>
                        </View>
                        <View style={styles.line} />
                    </View>

                    <Text style={[styles.smalltxt, { marginTop: 10 }]}>Topics</Text>
                    <View style={styles.inputfield}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                multiline
                                placeholder="Enter Comma Sepated Topics..."
                                placeholderTextColor={ColorCode.gray_color}
                                style={styles.textInput}
                                value={myTopic}
                                onChangeText={(t) => { setMyTopic(t) }}
                            />
                            {/* <Text style={[styles.smalltxt]}>{caption.length + "/140"}</Text> */}
                        </View>
                        <View style={styles.line} />
                    </View>
                    {/* <InputText
                            style={{ marginTop: 20 }}
                            value={''}
                            onChange={(t) => { setMyHeading(t) }}
                            placeholder={'Heading'}
                            length={35}
                            keyboardType={'default'}

                        />

                        <InputText
                            style={{ marginTop: 20 }}
                            value={''}
                            onChange={(t) => { setMyTopic(t) }}
                            placeholder={'Topics'}
                            length={35}
                            keyboardType={'default'}

                        /> */}

                    <Text style={[styles.smalltxt, { marginTop: 10 }]}>Caption</Text>
                    <View style={styles.inputfield}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                multiline
                                // placeholder="Type here...."
                                placeholderTextColor={ColorCode.gray_color}
                                style={styles.textInput}
                                value={caption}
                                onChangeText={(t) => { setCaptionLength(t) }}
                            />
                            {/* <Text style={[styles.smalltxt]}>{caption.length + "/140"}</Text> */}
                        </View>
                        <View style={styles.line} />
                    </View>

                </View>
                <Text style={[styles.smalltxt, { marginTop: 10 }]}>Select an option</Text>
                {selectedImage?.uri?.uri ?
                    <View>
                        <TouchableOpacity onPress={()=>setSelectedImage(null)}
                        
                        style={{ height: 50, width: 50,
                            position:'absolute',backgroundColor:'white',
                             zIndex:1,right:20,alignItems:'center',
                             justifyContent:'center',borderRadius:25}}>
                          <Image
                          source={require('../../../assets/images/close_24px.png')}
                          />
                        </TouchableOpacity>
                        <Image
                            resizeMethod='scale'
                            resizeMode={Platform.OS === 'ios' ? 'contain' : 'center'}
                            style={{ width: '95%', alignSelf: 'center', borderRadius: 20, height: 130 }}
                            source={selectedImage?.uri}
                        />



                    </View>
                    :
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10, padding: 5, justifyContent: 'space-around' }}>

                        <TouchableOpacity
                            onPress={() => { showAlert("image") }}
                        >
                            <Image source={require('../../../assets/images/imagebutton_.png')}
                            />
                            <Text style={[styles.smalltxt, { fontSize: 12 }]}>Photo</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { showAlert("video") }}
                        >
                            <Image source={require('../../../assets/images/video_.png')}
                            />
                            <Text style={[styles.smalltxt, { fontSize: 12 }]}>Video</Text>
                        </TouchableOpacity>

                        {/* <TouchableOpacity >
                <Image source={require('../../../assets/images/group_.png')}
                />
                <Text style={[styles.smalltxt, { fontSize: 12 }]}>Event</Text>
            </TouchableOpacity>

            <TouchableOpacity >
                <Image source={require('../../../assets/images/imagepolls_.png')}
                />
                <Text style={[styles.smalltxt, { fontSize: 12 }]}>Poll</Text>
            </TouchableOpacity>

            <TouchableOpacity >
                <Image source={require('../../../assets/images/QNAbutton_.png')}
                />
                <Text style={[styles.smalltxt, { fontSize: 12 }]}>QnA</Text>
            </TouchableOpacity> */}
                    </View>
                }


                <Text style={[styles.smalltxt, { marginTop: 10, fontSize: 18, }]}>Hashtags</Text>
                <View style={{ paddingHorizontal: 10 }}>
                    <View style={[styles.inputfield, { justifyContent: 'flex-start' }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput
                                placeholder="Add comma separated hashtags with # ..."
                                placeholderTextColor={ColorCode.gray_color}
                                style={styles.textInput}
                                value={hashtag}
                                onChangeText={(t) => { setHashtags(t) }}
                            />





                        </View>

                        {hashtag.length > 0 &&
                            <View style={{
                                flexDirection: 'row',
                                flexWrap: 'wrap', paddingHorizontal: 15
                            }}>
                                {hashtag.split(',').map((hashtag, index) => (
                                    <TouchableOpacity key={index} style={{
                                        padding: 5,
                                        margin: 5, borderWidth: 1, borderRadius: 5
                                    }}>
                                        <Text>{hashtag.trim()}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>}
                        <View style={{ flexDirection: 'row' }}>
                            {/* <TouchableOpacity style={{
                                backgroundColor: ColorCode.blue_Button_Color, width: 100,
                                alignItems: 'center', justifyContent: 'center', borderRadius: 35, flexDirection: 'row'
                            }}>
                                <Text style={[styles.smalltxt, { padding: 5, color: ColorCode.yellowText }]}>Nature</Text>
                                <Image
                                    source={require('../../../assets/images/Vector.png')}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity style={{
                                backgroundColor: ColorCode.blue_Button_Color, width: 200,
                                alignItems: 'center', justifyContent: 'center', borderRadius: 35, flexDirection: 'row', marginLeft: 10
                            }}>
                                <Text style={[styles.smalltxt, { padding: 5, color: ColorCode.yellowText }]}>Nature Photography</Text>
                                <Image
                                    source={require('../../../assets/images/Vector.png')}
                                />
                            </TouchableOpacity> */}
                        </View>
                    </View>
                </View>

                <View style={[{
                    flexDirection: 'row',
                    justifyContent: 'space-between', paddingHorizontal: 15,
                    marginTop: 10
                }]}>
                    <OpacityButton name={"Cancel"}
                        pressButton={() => { canCel() }}
                        btnTextStyle={{ color: ColorCode.blue_Button_Color }}
                        button={{
                            width: '48%', backgroundColor: ColorCode.white_Color,
                            borderColor: ColorCode.blue_Button_Color, borderWidth: 1
                        }} />
                    <OpacityButton
                        pressButton={() => { addPost() }}
                        name={"Post"}
                        btnTextStyle={{ color: ColorCode.yellowText, }}
                        button={{ width: '48%' }} />
                </View>

            </ScrollView>
            {/* </KeyboardAvoidingView> */}
        </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorCode.white_Color
    },
    reelsStyle: {
        flex: 1,

    },
    postStyle: {
        // height: 300,
        width: "100%",
        backgroundColor: ColorCode.white_Color,
        borderRadius: 15,

    },
    iosShadow: {
        shadowColor: '#ddd',
        shadowOffset: { width: -2, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 4,
        marginTop: 10
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 8,
        paddingVertical: 45,
        paddingHorizontal: 25,
        width: '100%',
        marginVertical: 10,
    },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    androidShadow: {
        elevation: 10,
    },
    info: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",

    },
    profileImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: ColorCode.lightGrey
    },
    nameType: {

    },
    boldStyle: {
        paddingLeft: 10,
        fontSize: 18,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.black_Color

    },
    smalltxt: {
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

    },
    backgroundVideo: {

        height: hp('100%'),
        width: wp('100%'),

    },

    inputfield: {
        height: 100,
        backgroundColor: ColorCode.lightGrey,
        width: '100%',
        marginTop: 15,
        borderRadius: 5,
        justifyContent: 'space-between',
        padding: 5
    },
    textInput: {
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,
        fontSize: 16,
        minHeight: 40,
        width: '80%'

    },
    line: {
        height: 1,
        backgroundColor: ColorCode.gray_background_color,
        width: '100%',
        marginBottom: 10
    }




})

export default AddPost;