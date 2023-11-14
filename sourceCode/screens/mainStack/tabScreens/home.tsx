import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Alert
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
import axios from 'axios';
import { addComment, allPostData, getHomePageData, sendLikeRequest, sendUnLikeRequest } from "../../../utils/apiHelpers";
import moment from "moment";
import CommentModal from "../../../components/commetModal";
import Loader from "../../../components/loader";
import { setLoading, setOther } from "../../../redux/reducer";
import Video from 'react-native-video';

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [music, setMusic] = useState([])
    const [post, setPost] = useState([])
    const [home, setHome] = useState([])
    const [showComment, setCommment] = useState(false)
    const [commentArray, setArray] = useState(null)
    const { pofileData, loading } = useSelector<any, any>((store) => store.sliceReducer);

// console.log("pofileData---->",pofileData,"pofileData---->")

    useEffect(() => {
        homePageData()
    }, [])

    const postComment = (data) => {
        addComment(data).then((res) => {
            getHomePageData().then((res) => {
                setHome(res.data.content)
                setCommment(false)
            })
        })
    }


    const openCoomentSection = (data) => {
        setArray(data)
        setCommment(true)
    }

   

    const homePageData = () => {
        dispatch(setLoading(true))
        getHomePageData().then((res) => {
            setHome(res?.data?.content)
            dispatch(setLoading(false))
        })
    }


    const likeThisPost = (item) => {
        if (item?.likes.includes(pofileData?.user?._id)) {
            sendUnLikeRequest(item?._id).then((res) => {
                getHomePageData().then((res) => {
                    setHome(res?.data?.content)
                })
            })
        } else {

            sendLikeRequest(item?._id).then(() => {
                getHomePageData().then((res) => {
                    setHome(res?.data?.content)
                })
            })

        }
    }




    const setUserData = (item) => {
        dispatch(setOther(item))
        navigation.navigate("OtherProfile")
    }



    const renderItem_didNumber = ({ item, index }: any) => {
         console.log("done====>", item, "item=======>",)
        return (
            <View
                style={[styles.postStyle, styles.iosShadow]}>
                <TouchableOpacity style={styles.info}
                    onPress={() => { setUserData(item?.userId?._id) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item?.userId?.profilePicture ?
                            <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: item?.userId?.profilePicture }}/>
                            :
                            <View style={styles.profileImg}/>}

                        <View style={[styles.nameType, { width: '55%' }]}>
                            <Text style={styles.boldStyle}>{item?.username}</Text>
                            <Text
                            numberOfLines={2}
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
                        resizeMode='cover'
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
                                tintColor={item?.likes.includes(pofileData?.user?._id) ? ColorCode.blue_Button_Color : 'grey'}
                                source={require('../../../assets/images/heart.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.boldStyle, { top: -20, paddingLeft: 0 }]}>{item?.likes.length}</Text>
                        <TouchableOpacity
                            onPress={() => { openCoomentSection(item) }}
                        >
                            <Image style={{ top: -20 }} source={require('../../../assets/images/image_message.png')} />
                        </TouchableOpacity>


                        <Text style={[styles.boldStyle, { top: -20, paddingLeft: 0 }]}>{item?.comments?.length}</Text>
                        {/* <Image style={{ top: -20 }} source={item?.ShareImage} /> */}
                    </View>

                    {/* <Image style={{ top: -20 }} source={item?.SaveImage} /> */}
                </View>
            </View>


        )
    }

    return (
        <SafeAreaView style={styles.main}>

            {loading && <Loader />}

            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader myHeading={"ScaleUp"}
                // imge1={require('../../../assets/images/filter-remove.png')}
                imge2={require('../../../assets/images/Notification.png')}
                imge1={require('../../../assets/images/crown-2.png')}
            />

            <View style={[styles.reelsStyle,]}>

                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={home}
                    renderItem={renderItem_didNumber}
                    keyExtractor={(item, index) => index.toString()} />
            </View>


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

    }




})

export default Home;