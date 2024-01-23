//@ts-nocheck
import {
<<<<<<< HEAD
    Image, Platform, ScrollView, StyleSheet, Text,
=======
    Image, Platform, ScrollView, StyleSheet, Text, AppState,
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Alert, BackHandler, RefreshControl
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../../constants/Styles";
import { AuthHeader, TabHeader } from "../../../components";
import { addComment, allPostData, getHomePageData, sendLikeRequest, sendUnLikeRequest } from "../../../utils/apiHelpers";
import moment from "moment";
import CommentModal from "../../../components/commetModal";
import Loader from "../../../components/loader";
import { setLoading, setOther } from "../../../redux/reducer";
import Video from 'react-native-video';
import HomeHeader from "../../../components/homeHeader";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import FullImageModal from "../../../components/fullImageModal";
const Home = () => {


    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [home, setHome] = useState([])
    const [hasMore, setHasMore] = useState(true);
    const [showComment, setCommment] = useState(false)
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [commentArray, setArray] = useState(null)
    const { pofileData, loading } = useSelector<any, any>((store) => store.sliceReducer);
    const [captionLine, setCaptionLine] = useState(2)
    const [refreshing, setRefreshing] = useState(false);
    const [imageUlr, setImageUrl] = useState(null)
    const [showImage, setShowImage] = useState(false)
<<<<<<< HEAD
=======
    
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
    // console.log("pofileData---->",pofileData,"pofileData---->")

    const loadMorePosts = () => {
        if (hasMore) {
            setPage(prevPage => {
                const newPage = prevPage + 1;
                console.log("Loading more posts, Page:", newPage);
                homePageData(newPage, pageSize); // Fetch new data with the updated page
                return newPage;
            });
        }
    }       
      

    useEffect(() => {
        setPage(1); // Reset page number to 1
        homePageData(1, pageSize); // Load first page
    }, []);


    useEffect(() => {
        // getPhoneConatcts()
        const backAction = () => {
            Alert.alert('Exit App', 'Do you want to exit the app?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'Exit',
                    onPress: () => BackHandler.exitApp(),
                },
            ]);
            return true; // Prevent default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener when the component unmounts
    }, []);


    useEffect(() => {
        // getPhoneConatcts()
        const backAction = () => {
            Alert.alert('Exit App', 'Do you want to exit the app?', [
                {
                    text: 'Cancel',
                    onPress: () => null,
                    style: 'cancel',
                },
                {
                    text: 'Exit',
                    onPress: () => BackHandler.exitApp(),
                },
            ]);
            return true; // Prevent default behavior (exit the app)
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove(); // Cleanup the event listener when the component unmounts
    }, []);

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

<<<<<<< HEAD
    const homePageData = () => {
=======
/*const homePageData = () => {
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
        setRefreshing(true)
        dispatch(setLoading(true))
        getHomePageData().then((res) => {
            console.log(res?.data,"res?.data?.content=====>")
            setHome(res?.data?.content)
            dispatch(setLoading(false))
            setRefreshing(false)
        })
    }
*/

<<<<<<< HEAD
=======
const homePageData = (page, pageSize) => {
    console.log("Fetching data for Page:", page); 
    setRefreshing(true);
    dispatch(setLoading(true));
    getHomePageData(page, pageSize).then((res) => {
            if(res?.data?.content.length > 0){
                // Append new posts to the existing ones
                setHome(prevPosts => [...prevPosts, ...res.data.content]);
            } else {
                // No more posts to load
                setHasMore(false);
            }
            dispatch(setLoading(false));
            setRefreshing(false);
        })
        .catch((error) => {
            // Handle any errors here
            dispatch(setLoading(false));
            setRefreshing(false);
        });
}
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
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

    const showFullImage = (item) => {
        setImageUrl(item)
        setShowImage(!showImage)
    }


    const renderItem_didNumber = ({ item, index }: any) => {
        //  console.log("done====>", item?.userId?.profilePicture, "item=======>",)
        return (
            <View
                style={[styles.postStyle, styles.iosShadow]}>
                <TouchableOpacity style={styles.info}
                    onPress={() => { setUserData(item?.userId?._id) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item?.userId?.profilePicture != null ?
                            <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: item?.userId?.profilePicture }} />
                            :
                            <View style={styles.profileImg} >
                                <Text style={[styles.boldStyle, { paddingLeft: 0 }]}>{item?.username?.substring(0, 2).toUpperCase()}</Text>
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

                        {item?.isVerified &&
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
                                    }]}>{item}</Text>
                            )
                        })
                        }
                    </View>

                    <Image style={{}} source={item?.typeImg} />
                </View>
                {item?.contentType == "Video" ?
                    <TouchableOpacity
                    style={{alignItems:'center'}}
                        activeOpacity={1}
<<<<<<< HEAD
                        onPress={() => { showFullImage(item) }}>
=======
                       // onPress={() => { showFullImage(item) }}
                        >
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                        <Video
                            resizeMode='cover'
                            
                            source={{ uri: item?.contentURL }}
                            paused={true}
                            style={{
                                width: '100%', height: 250,
                                backgroundColor: ColorCode.lightGrey,
                                borderRadius: 15, marginVertical: 10
                            }}
<<<<<<< HEAD
                            repeat={true}>
                        </Video>
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
                            repeat={true}
                            controls={true}
                            
                            >
                        </Video>
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
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => { showFullImage(item) }}
                        style={{
                            width: '100%',
                            height: 250,
                            backgroundColor: ColorCode.lightGrey,
                            borderRadius: 15, marginVertical: 10
                        }}>
                        <Image
                            style={{ height: '100%', width: '100%' }}
                            resizeMode='contain'
                            source={{ uri: item?.contentURL }} />
                    </TouchableOpacity>
                }
                <View style={{ width: '100%' }}>
                    <Text
                        numberOfLines={captionLine}
                        style={[styles.smalltxt, {
                            textAlign: 'left',
                        }]}
                    >{item?.captions}</Text>

                    {item?.captions.length > 38 &&
                        <TouchableOpacity onPress={() => { captionLine === 2 ? setCaptionLine(100) : setCaptionLine(2) }}
                            style={{}}>
                            <Text style={[styles.smalltxt, { color: ColorCode.blue_Button_Color }]}>{captionLine === 2 ? 'see more' : 'show less'}</Text>
                        </TouchableOpacity>
                    }



                </View>
                <View style={styles.line} />

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
                    {/* {item?.isVerified &&
                        <Image
                            source={require('../../../assets/images/security-user.png')}
                        />
                    } */}
                </View>
                <View style={[styles.info, { marginTop: 10 }]}>
                    <View style={{ flexDirection: 'row', width: '40%', justifyContent: 'space-between', marginTop: 15 }}>
                        <TouchableOpacity
                            onPress={() => { likeThisPost(item) }}>
                            <Image style={{ top: -20 }}
                                tintColor={item?.likes.includes(pofileData?.user?._id) ? ColorCode.blue_Button_Color : 'grey'}
                                source={require('../../../assets/images/heart.png')} />
                        </TouchableOpacity>
                        <Text style={[styles.boldStyle, { top: -20, paddingLeft: 0 }]}>{item?.likes.length}</Text>
                        <TouchableOpacity
                            onPress={() => { openCoomentSection(item) }}>
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
            <HomeHeader
                myHeading={"ScaleUp"}
                imge2={require('../../../assets/images/Notification.png')}
                imge1={require('../../../assets/images/crown-2.png')} />

            <View style={[styles.reelsStyle,]}>

                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={home}
                    renderItem={renderItem_didNumber}
                    keyExtractor={(item, index) => index.toString()}
<<<<<<< HEAD
=======
                    onEndReached={loadMorePosts}
                    onEndReachedThreshold={0.5} // Adjust as needed
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={homePageData}
                    />}
                    ListEmptyComponent={


                        <View style={styles.emptyList}>
                            {!loading &&
                                <Text style={{
                                    color: ColorCode.gray_color, width: '100%',
                                    textAlign: 'center', fontSize: 20, fontWeight: '500'
                                }}>{'Your Home Feed is empty right now. Start exploring and following users  from the search page to see their content here!'}</Text>
                            }
                        </View>

                    }
                />
            </View>


            {showComment &&
                <CommentModal
                    close={() => { setCommment(false) }}
                    value={commentArray}
                    post={(t) => { postComment(t) }}
                />
            }
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
        // marginTop: 10

    },
    profileImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: ColorCode.lightGrey,
        alignItems: 'center',
        justifyContent: 'center'
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
    line: {
        height: 2,
        backgroundColor: ColorCode.lightGrey,
        width: '95%',
        marginTop: 5,
        marginHorizontal: 10
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(28)
    },




})

export default Home;