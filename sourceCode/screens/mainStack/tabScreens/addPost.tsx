import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Switch
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

const AddPost = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [enable, setEnable] = useState(false)

    const toggleSwitch = () => {
        setEnable(!enable)
    }

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader myHeading={"New Post"}
                imge={require('../../../assets/images/arrow-left.png')}
            />
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
                <Text style={[styles.smalltxt]}>Add a caption</Text>
                <View style={styles.inputfield}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="Type here...."
                            placeholderTextColor={ColorCode.gray_color}
                            style={styles.textInput}
                        />
                        <Text style={[styles.smalltxt]}>0/140</Text>
                    </View>
                    <View style={styles.line} />
                </View>

            </View>
            <Text style={[styles.smalltxt, { marginTop: 20 }]}>Select an option</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10, padding: 5 }}>
                <TouchableOpacity >
                    <Image source={require('../../../assets/images/imagebutton_.png')}
                    />
                    <Text style={[styles.smalltxt, { fontSize: 12 }]}>Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity >
                    <Image source={require('../../../assets/images/video_.png')}
                    />
                    <Text style={[styles.smalltxt, { fontSize: 12 }]}>Video</Text>
                </TouchableOpacity>

                <TouchableOpacity >
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
                </TouchableOpacity>
            </View>

            <Text style={[styles.smalltxt, { marginTop: 20, fontSize: 18, }]}>Add hashtags</Text>

            <View style={{ paddingHorizontal: 10 }}>
                <View style={[styles.inputfield, { justifyContent: 'flex-start' }]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <TextInput
                            placeholder="Type here...."
                            placeholderTextColor={ColorCode.gray_color}
                            style={styles.textInput}
                        />
                        {/* <Text style={[styles.smalltxt]}>0/140</Text> */}
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{
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
                            alignItems: 'center', justifyContent: 'center', borderRadius: 35, flexDirection: 'row',marginLeft:10
                        }}>
                            <Text style={[styles.smalltxt, { padding: 5, color: ColorCode.yellowText }]}>Nature Photography</Text>
                            <Image
                                source={require('../../../assets/images/Vector.png')}
                            />
                        </TouchableOpacity>


                    </View>



                </View>

            </View>

            <View style={[{
                flexDirection: 'row',
                justifyContent: 'space-between', paddingHorizontal: 15,
                marginTop:30
            }]}>
                <OpacityButton name={"Cancel"} btnTextStyle={{ color: ColorCode.blue_Button_Color}} button={{ width: '48%',backgroundColor:ColorCode.white_Color,borderColor:ColorCode.blue_Button_Color,borderWidth:1 }} />
                <OpacityButton name={"Post"} btnTextStyle={{ color: ColorCode.yellowText, }} button={{ width: '48%' }} />
            </View>

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
        height: 130,
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
        height: 40

    },
    line: {
        height: 1,
        backgroundColor: ColorCode.gray_background_color,
        width: '100%',
        marginBottom: 10
    }




})

export default AddPost;