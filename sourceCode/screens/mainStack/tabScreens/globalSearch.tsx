//@ts-nocheck
import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, ImageBackground
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
import LinearGradient from "react-native-linear-gradient";
import reelsData from "../../../constants/helpers";
import { followUser, globalSearch, unfollowUser } from "../../../utils/apiHelpers";
import { setOther } from "../../../redux/reducer";
import { Show_Toast } from "../../../components/toast";

const GlobalSearch = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [data, setData] = useState([])
    const [text, setText] = useState("")


    useEffect(() => {
        if (text.length > 3) {
            const data = { "query": text }
            globalSearch(data).then((res) => {
                setData(res?.data)
            })
        }
    }, [text])



    const setUserData = (item) => {
        dispatch(setOther(item))
        navigation.navigate("OtherProfile")
    }





    const foloowThisUser = (item) => {
        if (item?.isFollowing) {
            unfollowUser(item?.userId).then((res) => {
                // console.log("res----->", res?.data)
                const data = { "query": text }
                globalSearch(data).then((res) => {
                    setData(res?.data)
                })
                Show_Toast(res?.data?.message)
            })
        } else {
            followUser(item?.userId).then((res) => {
                // console.log("res----->", res?.data)
                const data = { "query": text }
                globalSearch(data).then((res) => {
                    setData(res?.data)
                })
                Show_Toast(res?.data?.message)
            })
        }





    }


    const renderItem_didNumber = ({ item, index }: any) => {
        // console.log(item, "value---->")
        return (
            <TouchableOpacity
            onPress={()=>{setUserData(item?.userId)}}
                style={[styles.postStyle, { marginTop: 10 }]}>
                <TouchableOpacity style={styles.info}
                    onPress={() => { setUserData(item?.userId) }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '55%' }}>
                        {item?.profilePicture ?
                            <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: item?.profilePicture }}
                            />
                            :
                            <View style={styles.profileImg}>

                            </View>
                        }
                        <View style={styles.nameType}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={styles.boldStyle}>{item?.username}</Text>
        {item?.role === "SME" && (
            <Image
                resizeMode='contain'
                tintColor={'#F6BE00'}
                source={require('../../../assets/images/medal-star.png')}
                style={{ height: 18, width: 18, marginLeft: 5 }}
            />
        )}
    </View>
                            <Text numberOfLines={1} style={styles.smalltxt}>{item?.firstname + " " + item?.lastname}</Text>

                            {/* <LinearGradient
                                colors={['#043142',]}
                                // start={{ x: 0.1, y: 1.5 }} end={{ x: 0.5, y: 0.5 }}
                                locations={[1., 1.4, 0.5]}
                                style={styles.color}>
                                <Text style={[styles.smalltxt, { color: ColorCode.yellowText, }]}>{'follow'}</Text>
                            </LinearGradient> */}
                            <TouchableOpacity
                                onPress={() => { foloowThisUser(item) }}>
                                <ImageBackground
                                    style={styles.color}
                                    source={require("../../../assets/images/button_.png")}>
                                    <Text style={[styles.smalltxt,
                                    { color: ColorCode.yellowText, }]}>
                                        {item?.isFollowing ? "Unfollow" : 'Follow'}</Text>
                                </ImageBackground>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: "35%", }}>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => {setUserData(item?.userId) }}>
                            <Image
                                source={require('../../../assets/images/folow_group_.png')} />
                            <Text style={styles.smalltxt}>{item?.followersCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ alignItems: 'center' }}
                            onPress={() => { setUserData(item?.userId) }}>
                            <Image
                                source={require('../../../assets/images/following_.png')} />
                            <Text style={styles.smalltxt}>{item?.followingCount}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={()=>{setUserData(item?.userId)}}
                        style={{ alignItems: 'center' }}>
                            <Image
                                source={require('../../../assets/images/followers_.png')} />
                            <Text style={styles.smalltxt}>{item?.totalPosts}</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader myHeading={"Search"}
            go={()=>navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')} />
            <InputText
                placeholder={"Search"}
                length={16}
                onChange={(text) => { setText(text) }}
                value={text}
            />
            {/* {data.length > 0 &&
                <View style={{
                    flexDirection: 'row', justifyContent: 'space-between', width: '96%',
                    marginTop: 10, borderBottomColor: ColorCode.lightGrey,
                    borderBottomWidth: 2, paddingVertical: 5, paddingHorizontal: 15, marginHorizontal: 5
                }}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                    }}>
                        <Image
                            source={require('../../../assets/images/Group.png')}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/images/star3.png')}
                        />

                    </TouchableOpacity>

                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/images/location.png')}
                        />

                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignItems: 'center' }}>
                        <Image
                            source={require('../../../assets/images/image_personalcard.png')}
                        />

                    </TouchableOpacity>
                </View>
            } */}

            <View style={[styles.reelsStyle,]}>

                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem_didNumber}
                    keyExtractor={(item, index) => index.toString()} 
                    ListEmptyComponent={<View style={styles.emptyList}>
                    <Text style={{
                        color: ColorCode.gray_color, width: '100%',
                        textAlign: 'center', fontSize: 20, fontWeight: '500'
                    }}>{'No Search Results'}</Text>
                </View>}
                    />
            </View>




        </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorCode.white_Color,
    },
    body: {
        flex: 1,
        backgroundColor: ColorCode.white_Color,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    txt: {
        fontWeight: '400',
        fontSize: 16,
        lineHeight: 20,
        textAlign: 'center',
        color: ColorCode.black_Color,
        width: '80%',
        alignSelf: 'center',
        marginTop: 20

    },
    input: {
        height: 54,
        width: '47%',
        backgroundColor: ColorCode.white_Color,
        alignSelf: 'center',
        borderRadius: hp(3),
        elevation: 20,
        shadowColor: ColorCode.white_Color,
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.6,
        borderColor: ColorCode.blue_Button_Color,
        borderWidth: 1,
        paddingLeft: 15,
        fontWeight: '600',
        fontSize: 14,
        color: ColorCode.black_Color,
        flexDirection: 'row',
        alignItems: 'center',

    },
    inputStyle: {
        width: '70%',

    },
    inputView: {
        height: hp(23),
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 10

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
        paddingLeft: 10,
        width: '70%'
    },
    boldStyle: {

        fontSize: 16,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.black_Color

    },

    smalltxt: {
        // paddingLeft: 10,
        fontSize: 13,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

    },
    color: {
        height: 18,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 60,
        marginTop: 10

    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(28)
    },

})

export default GlobalSearch;