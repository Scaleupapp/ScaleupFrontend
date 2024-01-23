//@ts-nocheck
import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, TextInput
} from "react-native"
import React, { useEffect, useState } from "react"
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../../constants/Styles";
import { TabHeader } from "../../../components";
import { AirbnbRating, Rating } from 'react-native-ratings';
import { addComment, getMyProfile, sendLikeRequest, sendUnLikeRequest } from "../../../utils/apiHelpers";
import moment from "moment";
import Video from "react-native-video";
import { setLoginUser } from "../../../redux/cookiesReducer";
import Loader from "../../../components/loader";
import { setLoading, setProfileDat } from "../../../redux/reducer";
import CommentModal from "../../../components/commetModal";
import FullImageModal from "../../../components/fullImageModal";

const Profile = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [pofileData, setProfileData] = useState({ user: {}, pagination: {} });
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);
    const [showComment, setCommment] = useState(false)
    const [commentArray, setArray] = useState(null)
    const [captionLine, setCaptionLine] = useState(2)
    const isFocused = useIsFocused();
    const [profile,setProfileDats]=useState('')
    const [cacheBuster, setCacheBuster] = useState(0);
    const [imageUlr, setImageUrl] = useState(null)
    const [showImage, setShowImage] = useState(false)
    useEffect(() => {
        dispatch(setLoading(true))
        getMyProfile().then((res) => {
            clearImageCache()
            dispatch(setLoading(false))
            setProfileData((res?.data))
            // console.log(res?.data?.user?.profilePicture,"res?.data?.user?.profilePicture====>")
            setProfileDats(res?.data?.user?.profilePicture)
            // console.log("res?.data=====>", res?.data, "res?.data=====>")
        })

    }, [isFocused])

     console.log(pofileData?.user?.bio,"pofileData=====>")

    const clearImageCache = () => {
        // Increment the cacheBuster value to force a re-fetch of the image
        setCacheBuster((prev) => prev + 1);
      };
    const slicedData = pofileData?.user?.bio?.bioInterests.slice(0, 4);


    const postComment = (data) => {
        addComment(data).then((res) => {
            getMyProfile().then((res) => {
                dispatch(setLoading(false))
                setProfileData((res?.data))
                setCommment(false)
                // console.log("res?.data=====>", res?.data, "res?.data=====>")
            })
        })
    }


    const likeThisPost = (item) => {
        if (item?.likes.includes(pofileData?.user?._id)) {
            sendUnLikeRequest(item?._id).then((res) => {
                getMyProfile().then((res) => {
                    dispatch(setLoading(false))
                    setProfileData((res?.data))
                    // console.log("res?.data=====>", res?.data, "res?.data=====>")
                })
            })
        } else {
            sendLikeRequest(item?._id).then(() => {
                getMyProfile().then((res) => {
                    dispatch(setLoading(false))
                    setProfileData((res?.data))
                    // console.log("res?.data=====>", res?.data, "res?.data=====>")
                })
            })
        }
    }

    const openCoomentSection = (data) => {
        setArray(data)
        setCommment(true)
    }

    const renderItem_didNumber = ({ item, index }: any) => {
        return (
            <TouchableOpacity style={[styles.button, { marginLeft: 5 }]}
                onPress={() => { }}>
                <Text style={styles.text}>{item}</Text>
            </TouchableOpacity>
        )
    }
    const showFullImage = (item) => {
        setImageUrl(item)
        setShowImage(!showImage)
    }

    const renderItem = ({ item, index }: any) => {
        //  console.log("done====>", item?.smeVerify, "item=======>",)
        return (
            <View
                style={[styles.postStyle, styles.iosShadow]}>
                <TouchableOpacity style={styles.info}
                    onPress={() => { }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    {profile ?
                                <Image
                                    resizeMode='cover'
                                    style={styles.profileImg}
                                    source={{ uri: `${profile}?${cacheBuster}`}}
                                /> :
                                <View style={styles.profileImg}>
                                    <Text style={[styles.boldStyle, { paddingLeft: 0 }]}>{pofileData?.user?.firstname + " " + pofileData?.user?.lastname?.substring(0, 2).toUpperCase()}</Text>
                                </View>
                            }

                        <View style={[styles.nameType, { width: '55%' }]}>
                            <Text style={styles.boldStyle}>{item?.username}</Text>
                            <Text
                                numberOfLines={2}
                                style={styles.smalltxt}>{item?.heading}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'flex-start', width: '28%' }}>
                        <Text numberOfLines={1} style={[styles.smalltxt,
                        { marginTop: 12, }]}>{moment(item?.postdate).fromNow()}</Text>

                        {item?.smeVerify === "Accepted" &&
                            <Image
                                style={{ alignSelf: 'flex-end', marginRight: 10 }}
                                source={require('../../../assets/images/security-user.png')}
                            />
                        }
                    </View>

                </TouchableOpacity>
                <View style={styles.info}>
                    <View style={{ flexDirection: 'row', }}>
                        {item?.relatedTopics.map((item) => {
                            // console.log(item,'hastgas=====>')
                            return (
                                <Text
                                    numberOfLines={2}
                                    style={[styles.smalltxt, {
                                        textAlign: 'left',
                                        marginTop: 5,

                                    }]}>{item}</Text>)
                        })
                        }
                    </View>
                    <Image style={{}} source={item?.typeImg} />
                </View>
                {item?.contentType == "Video" ?
<<<<<<< HEAD
                  <TouchableOpacity onPress={()=>{showFullImage(item)}} style={{alignItems:'center'}}>
=======
                  <TouchableOpacity 
                 // onPress={()=>{showFullImage(item)}} 
                  style={{alignItems:'center'}}>
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                     <Video
                        resizeMode='cover'
                        source={{ uri: item?.contentURL }}
                        paused={true}
                        style={{ width: '100%', height: 250, backgroundColor: ColorCode.lightGrey, borderRadius: 15, marginVertical: 10 }}
                        repeat={true}
                        controls={true}
                    >
                    </Video>

<<<<<<< HEAD
                    <TouchableOpacity 
                        style={{height:40,width:40,position:'absolute',
                        top:125,alignItems:'center',justifyContent:'center',borderRadius:25,backgroundColor:ColorCode.blue_Button_Color,borderWidth:1,borderColor:'white'}}
                        onPress={()=>{showFullImage(item)}}>
                            <Image
                            style={{height:12,width:12,tintColor:'white'}}
                            source={require('../../../assets/images/Polygon1.png')}
                            />
                        </TouchableOpacity>
=======
                    <View
                            style={{
                                position: 'absolute',
                                top: -10, // Shifted to the top
                                right: 9, // Shifted to the right
                                //left: 90,
                                width: 20,
                                height: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 25,
                                backgroundColor: ColorCode.blue_Button_Color,
                                borderWidth: 1,
                                borderColor: 'white',
                            }}
                            >
                            <Image
                                style={{ height: 12, width: 12, tintColor: 'white' }}
                                source={require('../../../assets/images/Polygon1.png')}
                            />
                            </View>
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                  </TouchableOpacity>
                 

                    :
                    <Image
                        resizeMode={Platform.OS === "ios" ? 'cover' : 'contain'}
                        style={{ width: '100%', height: 250, backgroundColor: ColorCode.lightGrey, borderRadius: 15, marginVertical: 10 }}
                        source={{ uri: item?.contentURL }}
                    />}


                <View style={{ flexDirection: 'row' }}>
                    {item?.hashtags.map((item) => {
                        // console.log(item,'hastgas=====>')
                        return (
                            <Text
                                numberOfLines={2}
                                style={[styles.smalltxt, {
                                    textAlign: 'left',
                                }]}>{item}</Text>
                        )
                    })
                    }
                </View>
                <View style={styles.line} />
                <View style={{ width: '100%' }}>
                    <Text
                        numberOfLines={captionLine}
                        style={[styles.smalltxt, {
                            textAlign: 'left',
                        }]}
                    >{item?.captions}</Text>

                    {item?.captions?.length > 38 &&
                        <TouchableOpacity onPress={() => { captionLine === 2 ? setCaptionLine(100) : setCaptionLine(2) }}
                            style={{}}>
                            <Text

                                style={[styles.smalltxt, { color: ColorCode.blue_Button_Color }]}>{captionLine === 2 ? 'see more' : 'show less'}</Text>
                        </TouchableOpacity>
                    }
                </View>
                <View style={styles.line} />
                <View style={[styles.info, { alignItems: 'center', height: 30, }]}>
                    <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-between', }}>
                        <TouchableOpacity
                            onPress={() => { likeThisPost(item) }}>
                            <Image
                                tintColor={item?.likes.includes(pofileData?.user?._id) ? ColorCode.blue_Button_Color : 'grey'}
                                source={require('../../../assets/images/heart.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.boldStyle, { paddingLeft: 0 }]}>{item?.likes.length}</Text>
                        <TouchableOpacity
                            onPress={() => { openCoomentSection(item) }}>
                            <Image source={require('../../../assets/images/image_message.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.boldStyle, { paddingLeft: 0 }]}>{item?.comments?.length}</Text>
                        {/* <Image style={{ top: -20 }} source={item?.ShareImage} /> */}
                    </View>
                    {/* <Image style={{ top: -20 }} source={item?.SaveImage} /> */}
                </View>
                <View style={styles.line} />
                {item?.verify === "Yes" &&
                    <View style={[styles.info, { height: 30 }]}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.smalltxt} >{item?.smeVerify === "Pending" ?`Verified : Verification Pending` : "Verified :"}</Text>

                            <Image style={{ marginLeft: 10 }}
                                source={item?.smeVerify === "Accepted" ?
                                    require('../../../assets/images/check_24px.png')
                                    : item?.smeVerify === "Rejected"? require("../../../assets/images/close_24px.png"):null
                                } />
                        </View>

                       
                      {item?.smeVerify != "Pending" &&
                      <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.smalltxt}>Rating</Text>
                            <Rating
                                style={{ marginLeft: 10 }}
                                type="star"
                                ratingCount={5}
                                startingValue={item?.rating}
                                imageSize={20}
                                readonly
                            />
                        </View>
                      }  

                    </View>}

                {item?.smeComments && <View style={styles.line} />}
                {item?.smeComments &&

                    <TextInput
                        // onChangeText={(t) => { setCmt(t) }}
                        value={item?.smeComments}
                        placeholder={'Provide your Comments'}
                        editable={false}
                        style={{
                            height: 50, width: '95%',
                            alignSelf: 'center', backgroundColor: "#F6F6F6",
                            borderRadius: 10, paddingLeft: 10,
                            fontFamily: 'ComicNeue-Bold',
                            color: ColorCode.gray_color,
                        }}
                    />

                }

            </View>
        )
    }

    const logout = () => {
        dispatch(setLoginUser({}))
        dispatch(setProfileDat([]))
        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }] 
        });
    }

    return (
        <SafeAreaView style={styles.main}>
            {loading && <Loader />}
            {showComment &&
                <CommentModal
                    close={() => { setCommment(false) }}
                    value={commentArray}
                    post={(t) => { postComment(t) }}

                />
            }
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color} />
            <TabHeader myHeading={"Profile"}
                go={() => navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')} />
            <ScrollView style={{ flex: 1 }} nestedScrollEnabled={true}
                showsVerticalScrollIndicator={false}>
                <View style={styles.cards}>
                    <View style={[styles.info, { paddingHorizontal: 15 }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>

                            {profile ?
                                <Image
                                    resizeMode='cover'
                                    style={styles.profileImg}
                                    source={{ uri: `${profile}?${cacheBuster}`}}
                                /> :
                                <View style={styles.profileImg}>
                                    <Text style={[styles.boldStyle, { paddingLeft: 0 }]}>{pofileData?.user?.firstname + " " + pofileData?.user?.lastname?.substring(0, 2).toUpperCase()}</Text>
                                </View>
                            }
                            <View style={[styles.nameType, { marginLeft: 30 }]}>
                                <Text style={styles.boldStyle}>{pofileData?.user?.firstname + " " + pofileData?.user?.lastname}</Text>
                               
                                <Text style={styles.smalltxt}>{pofileData?.user?.email}</Text>

                            </View>



                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: 30 }}>
                                <TouchableOpacity
                                    style={{ height: 50 }}
                                    onPress={() => { navigation.navigate("Setting") }}>
                                    <Image
                                        tintColor={'black'}
                                        source={require('../../../assets/images/regular_settings.png')}
                                    />
                                </TouchableOpacity>

                                {/* <TouchableOpacity
                                    onPress={() => { logout() }}
                                    style={{ height: 50, }}>
                                    <Image
                                        source={require('../../../assets/images/Logout.png')}
                                    />
                                </TouchableOpacity> */}
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
                            data={ pofileData?.user?.bio?.bioInterests}
                            renderItem={renderItem_didNumber}
                            keyExtractor={(item, index) => index.toString()} />
                    </View>
                    <View style={styles.line} />
                    <Text style={[styles.smalltxt, { marginTop: 10 }]}>{pofileData?.user?.bio?.bioAbout}</Text>
                    <View style={[{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: 20 }]}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                resizeMode='contain'
                                style={{ marginLeft: 10 }}
                                source={require('../../../assets/images/Posts_.png')} />
                            <Text style={[styles.smalltxt, { color: ColorCode.black_Color }]}>{pofileData?.pagination.totalItems}</Text>
                            <Text style={[styles.smalltxt,]}>Posts</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Connections") }}
                            style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                resizeMode='contain'
                                style={{ marginLeft: 10 }}
                                source={require('../../../assets/images/following_.png')} />
                            <Text style={[styles.smalltxt, { color: ColorCode.black_Color }]}>{pofileData?.user?.followingCount}</Text>
                            <Text style={[styles.smalltxt,]}>Following</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate("Connections") }}
                            style={{ alignItems: 'center', justifyContent: 'space-between' }}>
                            <Image
                                resizeMode='contain'
                                style={{ marginLeft: 10 }}
                                source={require('../../../assets/images/followers_.png')} />
                            <Text style={[styles.smalltxt, { color: ColorCode.black_Color }]}>{pofileData?.user?.followersCount}</Text>
                            <Text style={[styles.smalltxt,]}>Followers</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 20, paddingHorizontal: 10 }}>
                <Text style={[styles.smalltxt, { fontSize: 18, color: ColorCode.black_Color }]}>Badge :</Text>
                <Text style={[styles.smalltxt, { fontSize: 16, }]}>
                    {pofileData?.user?.role === 'Subject Matter Expert' ? pofileData?.user?.role : pofileData?.user?.badges}
                </Text>
                </View>
                <View style={[styles.reelsStyle,]}>
                    <FlatList
                    
                        scrollEnabled
                        showsVerticalScrollIndicator={false}
                        data={pofileData?.userContent}
                        renderItem={renderItem}
                        
                        keyExtractor={(item, index) => index.toString()} />
                </View>
            </ScrollView>

            {showImage &&
                <FullImageModal
                    imageUrl={imageUlr}
                    close={() => { setShowImage(false) }}
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
        width: 180,


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
        marginTop: 5,
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