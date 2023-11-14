//@ts-ignore
import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, ImageBackground
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../../constants/Styles";
import { AuthHeader, TabHeader } from "../../../components";
import { addComment, bockUser, followUser, getUserData, sendLikeRequest, sendUnLikeRequest, unfollowUser } from "../../../utils/apiHelpers";
import moment from "moment";
import CommentModal from "../../../components/commetModal";
import { Show_Toast } from "../../../components/toast";
import ProfileHeader from "../../../components/profileHeader";
import Video from 'react-native-video';
const OtherProfile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [progress, setProgress] = useState(0);
    const [allData, setAllData] = useState(null)
    const { other } = useSelector<any, any>((store) => store.sliceReducer);
    const { pofileData } = useSelector<any, any>((store) => store.sliceReducer);
    const [showComment, setCommment] = useState(false)
    const [commentArray, setArray] = useState(null)
    const [button, setButton] = useState(allData?.isFollowing ? "Unfollow" : 'Follow')


    const get = () => {
        getUserData(other).then((res) => {
            setAllData(res?.data)
        })
    }

    const openCoomentSection = (data) => {
        setArray(data)
        setCommment(true)
    }

    useEffect(() => {
        get()
    }, [])



    const postComment = (data) => {
        addComment(data).then((res) => {
            setCommment(false)
            Show_Toast(res?.data?.message)
        })
    }


    const renderItem_didNumber = ({ item, index }: any) => {
        return (
            <View
                style={[styles.postStyle, styles.iosShadow]}>
                <TouchableOpacity style={styles.info}
                    onPress={() => { navigation.navigate("Connections") }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {allData?.profilePicture ?
                            <Image

                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: allData?.profilePicture }}
                            />
                            :
                            <View style={styles.profileImg}>
                            </View>
                        }
                        <View style={[styles.nameType, { width: '55%' }]}>
                            <Text style={styles.boldStyle}>{allData?.username}</Text>
                            <Text numberOfLines={2}
                            style={styles.smalltxt}>{item?.captions}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'flex-start', width: '28%' }}>
                        <Text numberOfLines={1} style={[styles.smalltxt, { marginTop: 12, }]}>{moment(item?.postdate).fromNow()}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={[styles.smalltxt, { textAlign: 'left', marginTop: 15, width: '90%' }]}>{item?.postText}</Text>
                    <Image style={{ top: -20 }} source={item?.typeImg} />
                </View>
                {item?.contentType == "Video" ?
                    <Video
                        resizeMode='contain'
                        source={{ uri: item?.contentURL }}
                        paused={false}
                        style={{ width: '100%', height: 250, backgroundColor: ColorCode.lightGrey, borderRadius: 15, marginVertical: 20 }}
                        repeat={true}   
                    >
                    </Video>
                    :
                    <Image
                    resizeMode={Platform.OS === "ios" ? 'cover' : 'contain'}
                    style={{ width: '100%', height: 250, backgroundColor: ColorCode.lightGrey, borderRadius: 15, marginVertical: 20 }}
                    source={{ uri: item?.contentURL }}
                />}
               
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-between', marginTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => { likeThisPost(item) }}
                        >
                            <Image style={{ top: -20 }}
                                //tintColor={item?.likes.includes(pofileData?.user?._id) ? ColorCode.blue_Button_Color : 'grey'}
                                source={require('../../../assets/images/heart.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.boldStyle, { top: -20, paddingLeft: 0 }]}>{item?.likes?.count}</Text>
                        <TouchableOpacity
                            onPress={() => { openCoomentSection(item) }}
                        >
                            <Image style={{ top: -20 }} source={require('../../../assets/images/image_message.png')} />
                        </TouchableOpacity>


                        <Text style={[styles.boldStyle, { top: -20, paddingLeft: 0 }]}>{item?.comments?.length}</Text>

                    </View>


                </View>
            </View>
        )
    }


    const foloowThisUser = () => {
        if (allData?.isFollowing) {
            unfollowUser(allData?.userId).then((res) => {
                setButton("Follow")
            })
        } else {
            followUser(allData?.userId).then((res) => {
                setButton("Unfollow")
            })
        }
    }

    const likeThisPost = (item) => {
        if (item?.likes.includes(pofileData?.user?._id)) {
            sendUnLikeRequest(item?._id).then((res) => {
            })
        } else {
            sendLikeRequest(item?._id).then(() => {
            })
        }
    }


    const renderItem = ({ item, index }: any) => {
        return (
            <TouchableOpacity style={[styles.button, { marginLeft: 5 }]}
                onPress={() => { navigation.navigate('BlockList') }}>
                <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
        )
    }


    const wantToBlock=()=>{
        bockUser(allData?.userId).then((res)=>{
            console.log(res?.data,"blockuserData=====d>")
        })
    }


    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <ProfileHeader
                myHeading={"Profile"}
                imge={require('../../../assets/images/arrow-left.png')} 
                button={()=>{wantToBlock()}}
                />
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}>
                <View style={[styles.info, { paddingHorizontal: 15 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {allData?.profilePicture ?
                            <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: allData?.profilePicture }}
                            />
                            :
                            <View style={styles.profileImg}>

                            </View>
                        }
                        <View style={[styles.nameType, { marginLeft: 30 }]}>
                            <Text style={styles.boldStyle}>{allData?.username}</Text>
                            <Text
                                style={styles.smalltxt}>{allData?.workExperience[0]?.description}</Text>
                            <Text style={styles.smalltxt}>{allData?.email}</Text>
                        </View>
                    </View>

                </View>


                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 15, marginTop: 30 }}>

                    <FlatList
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        horizontal
                        contentContainerStyle={{ justifyContent: 'space-between' }}
                        data={allData?.bioInterests}
                        renderItem={renderItem}
                        keyExtractor={(item, index) => index.toString()} />

                </View>

                <View style={{ marginTop: 30, flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => { foloowThisUser() }}
                    >
                        <ImageBackground
                            source={require('../../../assets/images/folow_button_.png')}
                            style={[{ marginTop: -30, height: 47, width: 144, alignItems: 'center', justifyContent: 'center' }]}>
                            <Text style={[styles.boldStyle,
                            { color: ColorCode.yellowText, marginHorizontal: 20 }]}>{button}</Text>
                        </ImageBackground>
                    </TouchableOpacity>

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
                    <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[styles.smalltxt, { color: ColorCode.black_Color, fontSize: 18 }]}>{allData?.totalPosts}</Text>
                        <Text style={[styles.smalltxt,]}>Posts</Text>
                    </View>

                    <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[styles.smalltxt, { color: ColorCode.black_Color, fontSize: 18 }]}>{allData?.following?.length}</Text>
                        <Text style={[styles.smalltxt,]}>Following</Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={[styles.smalltxt, { color: ColorCode.black_Color, fontSize: 18 }]}>{allData?.followers?.length}</Text>
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
                        data={allData?.content}
                        renderItem={renderItem_didNumber}
                        keyExtractor={(item, index) => index.toString()} />
                </View>


            </ScrollView>

            {showComment &&
                <CommentModal
                    close={() => { setCommment(false) }}
                    value={commentArray}
                    post={(t) => { postComment(t) }}

                />
            }
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