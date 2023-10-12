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
import LinearGradient from 'react-native-linear-gradient';
const OtherProfile = () => {
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
            <TabHeader myHeading={"Profile"} imge={require('../../../assets/images/arrow-left.png')} />
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

                <View style={{ marginTop: 30, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>

                    <LinearGradient
                        colors={['#043142', '#6200EA', '#6200EA']}
                        start={{ x: 0.1, y: 1.5 }} end={{ x: 0.5, y: 1.0 }}
                        locations={[1., 1.4, 0.5]}
                        style={[styles.color, { marginTop: -30 }]}>
                        <Text style={[styles.smalltxt,
                        { color: ColorCode.yellowText, marginHorizontal: 20 }]}>{'Follow'}</Text>
                    </LinearGradient>


                    <Image
                        resizeMode='contain'
                        source={require('../../../assets/images/group_MessageButton.png')}
                    />

                    <Image
                        resizeMode='cover'
                        source={require('../../../assets/images/medal-star.png')}
                        style={{ height: 50, width: 50, marginTop: -25 }}
                    />
                </View>
                <View style={[styles.cards, { flexDirection: 'row', justifyContent: 'space-between' }]}>
                    <View style={{alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={[styles.smalltxt,{color:ColorCode.black_Color}]}>118</Text>
                        <Text style={[styles.smalltxt,]}>Posts</Text>
                    </View>

                    <View style={{alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={[styles.smalltxt,{color:ColorCode.black_Color}]}>450</Text>
                        <Text style={[styles.smalltxt,]}>Following</Text>
                    </View>
                    <View style={{alignItems:'center',justifyContent:'space-between'}}>
                        <Text style={[styles.smalltxt,{color:ColorCode.black_Color}]}>320</Text>
                        <Text style={[styles.smalltxt,]}>Followers</Text>
                    </View>

                    <Image
                    resizeMode='contain'
                    source={require('../../../assets/images/group_p.png')}
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
    },
    color: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 150

    },

    cards: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginLeft: 8,
        marginRight: 8,
        height: 80,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 4,
            },
            android: {
                elevation: 4, // Elevation for Android
            },
        }),
    }




})


export default OtherProfile;