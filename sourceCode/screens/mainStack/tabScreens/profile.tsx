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
import { getMyProfile } from "../../../utils/apiHelpers";

const Profile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [progress, setProgress] = useState(0);
    const [pofileData, setProfileData] = useState([])

    useEffect(() => {

        getMyProfile().then((res) => {
            setProfileData((res?.data))
            console.log("res?.data=====>", res?.data, "res?.data=====>")
        })
    }, [])

    const slicedData = pofileData?.user?.bio?.bioInterests.slice(0, 4);

    const renderItem_didNumber = ({ item, index }: any) => {
       
        return (
            
            <TouchableOpacity style={[styles.button, { marginLeft: 5 }]}
            onPress={() => { navigation.navigate('BlockList') }}>
            <Text style={styles.text}>{item}</Text>
        </TouchableOpacity>
        )
    }




    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color} />
            <TabHeader myHeading={"Profile"} imge={require('../../../assets/images/arrow-left.png')} />
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.cards}>
                    <View style={[styles.info, { paddingHorizontal: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                            {pofileData?.user?.profilePicture ? <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: pofileData?.user?.profilePicture }}
                            /> :
                                <View style={styles.profileImg}>
                                </View>
                            }
                            <View style={[styles.nameType, { marginLeft: 30 }]}>
                                <Text style={styles.boldStyle}>{pofileData?.user?.firstname + " " + pofileData?.user?.lastname}</Text>
                                <Text numberOfLines={1}
                                style={styles.smalltxt}>{pofileData?.user?.workExperience[0]?.description}</Text>
                                <Text style={styles.smalltxt}>{pofileData?.user?.email}</Text>
                            </View>
                        </View>
                    </View>
                    {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                        <TouchableOpacity style={styles.button}
                            onPress={() => { navigation.navigate('BlockList') }}>
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
                    </View> */}

                    <View style={[styles.reelsStyle,]}>
                        <FlatList
                             scrollEnabled
                             showsVerticalScrollIndicator={false}
                             horizontal
                             contentContainerStyle={{ justifyContent: 'space-between' }}
                            data={slicedData}
                            renderItem={renderItem_didNumber}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                    <View style={styles.line} />
                    <Text style={[styles.smalltxt, { marginTop: 10 }]}>I am a UI/UX designer with 6 years of experience. Currently working in ABC Design Studio. Apart from work I enjoy photography, as I am active member of Wildlife Photographers community. See More</Text>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }]}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode='contain'
                                style={{ marginLeft: 10 }}
                                source={require('../../../assets/images/Posts_.png')} />
                            <Text style={[styles.smalltxt, { color: ColorCode.black_Color }]}>{pofileData?.userContent?.length}</Text>
                            <Text style={[styles.smalltxt,]}>Posts</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                resizeMode='contain'
                                style={{ marginLeft: 10 }}
                                source={require('../../../assets/images/following_.png')} />
                            <Text style={[styles.smalltxt, { color: ColorCode.black_Color }]}>{pofileData?.user?.followingCount}</Text>
                            <Text style={[styles.smalltxt,]}>Following</Text>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                resizeMode='contain'
                                style={{ marginLeft: 10 }}
                                source={require('../../../assets/images/followers_.png')} />
                            <Text style={[styles.smalltxt, { color: ColorCode.black_Color }]}>{pofileData?.user?.followersCount}</Text>
                            <Text style={[styles.smalltxt,]}>Followers</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10 }}>
                    <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.black_Color }]}>Badge :</Text>
                    <Text style={[styles.smalltxt, { fontSize: 16, }]}>{pofileData?.user?.badges}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                    <Text style={[styles.smalltxt, { fontSize: 16, }]}>My Account</Text>
                    <Image
                        style={{ transform: [{ rotate: '90deg' }] }}
                        source={require('../../../assets/images/ArrowRight.png')}
                    />
                </View>

                <View style={[styles.cards, { backgroundColor: ColorCode.lightGrey }]}>
                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, }}>
                        <Image
                            source={require('../../../assets/images/ArrowRight.png')} />
                        <Text style={[styles.smalltxt, { fontSize: 16, }]}>Basic Details</Text>

                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, }}>
                        <Image
                            source={require('../../../assets/images/ArrowRight.png')} />
                        <Text style={[styles.smalltxt, { fontSize: 16, }]}>Educational Details</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, }}>
                        <Image
                            source={require('../../../assets/images/ArrowRight.png')} />
                        <Text style={[styles.smalltxt, { fontSize: 16, }]}>Professional Details</Text>

                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, }}>
                        <Image
                            source={require('../../../assets/images/ArrowRight.png')} />
                        <Text style={[styles.smalltxt, { fontSize: 16, }]}>Course and Certifications</Text>

                    </View>
                </View>




                <View style={styles.cards}>
                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Connections") }}
                        >
                            <Text style={[styles.smalltxt, { fontSize: 16, }]}>Connections</Text>
                        </TouchableOpacity>


                        <Image

                            source={require('../../../assets/images/ArrowRight.png')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.smalltxt, { fontSize: 16, }]}>Educational Details</Text>
                        <Image

                            source={require('../../../assets/images/ArrowRight.png')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.smalltxt, { fontSize: 16, }]}>Professional Details</Text>
                        <Image

                            source={require('../../../assets/images/ArrowRight.png')}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10, justifyContent: 'space-between' }}>
                        <Text style={[styles.smalltxt, { fontSize: 16, }]}>Course and Certifications</Text>
                        <Image

                            source={require('../../../assets/images/ArrowRight.png')}
                        />
                    </View>
                </View>

                <View style={{ height: 100 }}></View>











                {/* <View style={styles.line} />
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
                </View> */}
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
   
        width:250

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
    cards: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginLeft: 8,
        marginRight: 8,
        marginTop: 10,
        // height: 80,
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


export default Profile;