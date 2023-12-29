import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView
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
import * as Progress from 'react-native-progress';
import ProgressBar from "../../../components/progressBar";
import { Rating, AirbnbRating } from 'react-native-ratings';

const CheckProfile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [progress, setProgress] = useState(0);
    const renderItem_didNumber = ({ item, index }: any) => {
        return (
            <View
                style={[styles.postStyle, styles.iosShadow]}>
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.profileImg}>
                        </View>
                        <View style={styles.nameType}>
                            <Text style={styles.boldStyle}>{item?.name}</Text>
                            <Text style={styles.smalltxt}>{item?.type}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text style={[styles.smalltxt, { marginTop: 12 }]}>{item?.time}</Text>
                    </View>
                </View>
                <View style={styles.info}>
                    <Text style={[styles.smalltxt, { textAlign: 'left', marginTop: 15, width: '90%' }]}>{item?.postText}</Text>
                    <Image style={{ top: -20 }} source={item?.typeImg} />
                </View>

                <Image
                    resizeMode='contain'
                    style={{ width: '100%', height: 250, backgroundColor: ColorCode.lightGrey, borderRadius: 15, marginVertical: 20 }}
                    source={item?.typeImg}
                />

                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-between', marginTop: 15 }}>
                        <Image style={{ top: -20 }} source={item?.likeImage} />
                        <Image style={{ top: -20 }} source={item?.commentImage} />
                        <Image style={{ top: -20 }} source={item?.ShareImage} />
                    </View>

                    <Image style={{ top: -20 }} source={item?.SaveImage} />
                </View>




            </View>
        )
    }




    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader 
            go={()=>navigation.goBack()}
            myHeading={"Profile"} />
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
                <View style={[styles.info, { paddingHorizontal: 15 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.profileImg}>
                        </View>
                        <View style={[styles.nameType, { marginLeft: 30 }]}>
                            <Text style={styles.boldStyle}>{"John Smith"}</Text>
                            <Text style={styles.smalltxt}>{"UI/UX Designer / Photographer"}</Text>
                            <Text style={styles.smalltxt}>{"johnsmith@website.com"}</Text>
                        </View>
                    </View>

                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 30 }}>
                    <TouchableOpacity style={styles.button}
                        onPress={() => { navigation.navigate('BlockList') }}
                    >
                        <Text style={styles.text}>{"Photography"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>{"Football"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>{"Dancing"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.text}>{"Hiking"}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.line} />
                <View style={styles.line} />

                <View style={[styles.nameType, { marginTop: 20 }]}>
                    <Text style={styles.smalltxt}>{"Dear all, \nThis is one of the difficult poll to answer. Und...  see more"}</Text>
                </View>
                <View style={styles.line} />

                <Text style={[styles.smalltxt, { marginTop: 20, marginHorizontal: 10, color: ColorCode.black_Color }]}>{"Reliability check process in UX is carried out for the..."}</Text>

                <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
                    <ProgressBar progress={progress} duration={1000} />
                    <ProgressBar progress={progress} duration={1000} />
                    <ProgressBar progress={progress} duration={1000} />
                    <ProgressBar progress={progress} duration={1000} />
                </View>
                <View style={styles.line} />
                <Text style={[styles.smalltxt, { marginTop: 10, fontSize: 16 }]}>{"160 Votes .Poll Closed"}</Text>
                <View style={[styles.line, { marginTop: 10 }]} />

                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-between', marginTop: 30, paddingHorizontal: 10 }}>
                        <Image style={{ top: -20 }} source={require('../../../assets/images/heart.png')} />
                        <Text style={{ top: -20 }}>223</Text>
                        <Image style={{ top: -20 }} source={require('../../../assets/images/image_message.png')} />
                        <Text style={{ top: -20 }}>34</Text>
                        <Image style={{ top: -20 }} source={require('../../../assets/images/send-2.png')} />
                    </View>


                </View>
                <View style={[styles.info, { marginTop: -30, paddingHorizontal: 15 }]}>
                    <Text style={{ top: 20 }} >Verified :</Text>
                    <Image style={{ top: 20 }} source={require('../../../assets/images/check_24px.png')} />
                    <Image style={{ top: 20 }} source={require('../../../assets/images/close_24px.png')} />
                    <Text style={{ top: 20 }} >Rating</Text>


                    <AirbnbRating
                        count={5}
                        // reviews={["Terrible", "Bad", "Meh", "OK",]}
                        defaultRating={3.5}
                        size={15}

                    />
                </View>


                <View style={[styles.reelsStyle,]}>
                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        data={reelsData}
                        renderItem={renderItem_didNumber}
                        keyExtractor={(item, index) => index.toString()} />
                </View>


            </ScrollView>
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
        margin: 12
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
        fontSize: 14,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

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
    line: {
        height: 2,
        backgroundColor: ColorCode.lightGrey,
        width: '95%',
        marginTop: 30,
        marginHorizontal: 10
    }




})


export default CheckProfile;