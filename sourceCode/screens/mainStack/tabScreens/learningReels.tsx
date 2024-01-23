//@ts-nocheck
import {
<<<<<<< HEAD
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, ImageBackground, Dimensions
} from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
import { addComment, allPostData, sendLikeRequest, sendUnLikeRequest } from "../../../utils/apiHelpers";
import { setLoading } from "../../../redux/reducer";
import Loader from "../../../components/loader";
import CommentModal from "../../../components/commetModal";

const LearningReels = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const { pofileData, loading } = useSelector<any, any>((store) => store.sliceReducer);
    const [post, setPost] = useState([])
    const [showComment, setCommment] = useState(false)
    const [commentArray, setArray] = useState(null)
    const [paly, setPlay] = useState(false)
    const videoRefs = useRef(post.map(() => React.createRef()));
    const [currentIndex, setCurrentIndex] = useState(0);
    const [viewableIndex, setViewableIndex] = useState(null);

    




=======
    Image, Platform, StyleSheet, Text,
    TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, Dimensions
  } from "react-native";
  import React, { useEffect, useState, useRef } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import ColorCode from "../../../constants/Styles";
  import Video from 'react-native-video';
  import { allPostData, sendLikeRequest, sendUnLikeRequest } from "../../../utils/apiHelpers";
  import { setLoading } from "../../../redux/reducer";
  import Loader from "../../../components/loader";
  import CommentModal from "../../../components/commetModal";
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  import LinearGradient from 'react-native-linear-gradient';
  
  const LearningReels = () => {
    const dispatch = useDispatch();
    const { pofileData, loading } = useSelector((store) => store.sliceReducer);
    const [post, setPost] = useState([]);
    const [showComment, setComment] = useState(false);
    const [commentArray, setArray] = useState(null);
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);
    const [page, setPage] = useState(1); // Track the current page
    const [pageSize, setPageSize] = useState(10); // Set the page size
    const [hasMore, setHasMore] = useState(true); // Track if there are more records to load
    const [captionLine, setCaptionLine] = useState(2)
  
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
    useEffect(() => {
        dispatch(setLoading(true));
        loadMoreData(); // Initial load of data
      }, []);
      
      const loadMoreData = () => {
        // Fetch content for the current page and page size
        allPostData(page, pageSize)
          .then((res) => {
            dispatch(setLoading(false));
            const newPosts = res.data.content;
            if (newPosts.length === 0) {
              // No more records to load
              setHasMore(false);
            } else {
              // Append the new data to the existing posts
              setPost([...post, ...newPosts]);
              setPage(page + 1);
            }
          })
          .catch((error) => {
            console.error("Error loading more data:", error);
          });
      };
      
                // Listen for scroll events to trigger loading more data
        const handleScroll = ({ nativeEvent }) => {
            const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
            const isCloseToBottom =
            layoutMeasurement.height + contentOffset.y >= contentSize.height - 50;
            if (isCloseToBottom && hasMore) {
            loadMoreData();
            }
        };

<<<<<<< HEAD
    useEffect(() => {
        // Pause all videos when no items are in view
        if (viewableIndex === null) {
          videoRefs.current.forEach((ref) => {
            if (ref.current) {
              ref.current.seek(0); // Rewind the video to the beginning
              ref.current.pause();
            }
          });
        }
      }, [viewableIndex]);
      const handleViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
          const index = viewableItems[0].index;
          setViewableIndex(index);
        } else {
          // No viewable items, pause the current video
          setViewableIndex(null);
        }
      };

      const onViewableItemsChanged = useRef(handleViewableItemsChanged);
=======
    const handleViewableItemsChanged = ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const index = viewableItems[0].index;
        const currentItem = post[index];
  
        if (currentItem && currentPlayingVideo !== currentItem._id) {
          setIsVideoPlaying(false);
          setCurrentPlayingVideo(null);
        }
      }
    };
  
    const onViewableItemsChanged = useRef(handleViewableItemsChanged);
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    
    const renderItem_didNumber = ({ item, index }: any) => {
<<<<<<< HEAD
        // console.log(item, "itemmmm=======>")
=======
        console.log(item, "itemmmm=======>")
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
        return (
            item?.contentType == "Video" &&
            <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 70 }}>

<<<<<<< HEAD
                {item?.contentType == "Video" &&
                    <Video
                        resizeMode="contain"
                        ref={videoRefs.current[index]}
                        paused={viewableIndex !== index}
                        source={{ uri: item?.contentURL }}
                        style={styles.backgroundVideo}


                    >
                    </Video>

                }
=======
        <TouchableOpacity
          style={{ width: '100%', height: '100%' }}
          activeOpacity={1}
         /* onPress={() => {
            setIsVideoPlaying(currentPlayingVideo !== item._id);
            setCurrentPlayingVideo(item._id);
          }} */
        >
          <Video
            resizeMode="contain"
            source={{ uri: item?.contentURL }}
           // paused={currentPlayingVideo !== item._id || !isVideoPlaying}
           paused={true} 
           style={styles.backgroundVideo}
           repeat={true}
           controls={true}
          />
                    <LinearGradient
            colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,1)']}
            style={styles.gradientOverlay}
          />
        </TouchableOpacity>
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                <View style={{ position: 'absolute', bottom: Platform.OS === 'ios' ? 80 : 20, left: 20 }}>
                    <View style={{ flexDirection: 'row' }}>
                        {item?.userId?.profilePicture ?
                            <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: item?.userId?.profilePicture }}
                            />
                            :
                            <View style={styles.profileImg}>

                            </View>

                        }

                        <View style={[styles.nameType, { width: '60%' }]}>
                            <Text style={[styles.boldStyle, { color: ColorCode.white_Color }]}>{item?.username}</Text>
                            <Text style={[styles.smalltxt, { color: ColorCode.white_Color }]}>{item?.heading}</Text>
                        </View>
                        <View style={{ width: '40%', justifyContent: 'space-between', marginTop: 25 }}>
                        {item?.isVerified  && (
                    <Image
                    resizeMode='contain'
                    tintColor={'#F6BE00'}
                        source={require('../../../assets/images/security-user.png')}
                        style={{ width: 20, height: 20 , right: 20}} // Adjust size as needed
                    />
                )}
                            <TouchableOpacity
                                onPress={() => { likeThisPost(item) }}
                            >
                                <Image style={{ top: -20 }}
                                    tintColor={item?.likes.includes(pofileData?.user?._id) ? ColorCode.blue_Button_Color : 'white'}
                                    source={require('../../../assets/images/heart.png')}

                                />
                            </TouchableOpacity>
                            <Text style={[styles.boldStyle, { top: -20, paddingLeft: 10, color: ColorCode.white_Color }]}>{item?.likes.length}</Text>
                            <TouchableOpacity
                                onPress={() => { openCoomentSection(item) }}
                            >
                                <Image tintColor={'white'} style={{ top: -20 }}
                                    source={require('../../../assets/images/image_message.png')} />
                            </TouchableOpacity>

                            <Text style={[styles.boldStyle, { top: -20, paddingLeft: 10, color: ColorCode.white_Color }]}>{item?.comments?.length}</Text>

                        </View>




                    </View>
                    <View style={{ flexDirection: 'row', width: '70%', marginTop: -50 }}>
                        {item?.relatedTopics.map((item) => {
                            //  console.log(item,'hastgas=====>')
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
                    <View style={{ flexDirection: 'row', width: '70%', }}>
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
<<<<<<< HEAD
=======
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
                            <Text style={[styles.smalltxt, { color: ColorCode.white_Color }]}>{captionLine === 2 ? 'see more' : 'show less'}</Text>
                        </TouchableOpacity>
                    }
                    </View>
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                </View>

            </View>



        )
    }


    const openCoomentSection = (data) => {
        setArray(data)
        setCommment(true)
    }

    const postComment = (data) => {
        addComment(data).then((res) => {
            allPostData().then((res) => {
                dispatch(setLoading(false))
                setPost(res.data.content)
                setCommment(false)
            })
        })
    }


    const likeThisPost = (item) => {
        if (item?.likes.includes(pofileData?.user?._id)) {
            sendUnLikeRequest(item?._id).then((res) => {
                allPostData().then((res) => {
                    dispatch(setLoading(false))
                    setPost(res.data.content)

                })
            })
        } else {
            sendLikeRequest(item?._id).then(() => {
                allPostData().then((res) => {
                    dispatch(setLoading(false))
                    setPost(res.data.content)

                })
            })

        }






    }

    return (
        <SafeAreaView style={styles.main}>
<<<<<<< HEAD
            {loading && <Loader />}
            <StatusBar

                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            {showComment &&
                <CommentModal
                    close={() => { setCommment(false) }}
                    value={commentArray}
                    post={(t) => { postComment(t) }}

                />
            }


            <View style={[styles.reelsStyle,]}>
                <FlatList
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={post}
                    renderItem={renderItem_didNumber}
                    keyExtractor={(item) => item?._id}
                    horizontal
                    pagingEnabled
                    onViewableItemsChanged={onViewableItemsChanged?.current}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 1,
                    }}
                    ListEmptyComponent={<View style={styles.emptyList}>

                        {!loading && <Text style={{
                            color: ColorCode.gray_color, width: '100%',
                            textAlign: 'center', fontSize: 20, fontWeight: '500'
                        }}>{'Sorry , no Content Available that matches your interests. Try adding more areas of interests in the profile page to see relevant content.'}</Text>}
                    </View>}

                />

            </View>




        </SafeAreaView>
=======
        {loading && <Loader />}
        <StatusBar barStyle={'dark-content'} animated={true} backgroundColor={ColorCode.white_Color} />
        {showComment &&
          <CommentModal
            close={() => { setComment(false) }}
            value={commentArray}
            post={(t) => { postComment(t) }}
          />
        }
  
        <View style={styles.reelsStyle}>
          <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            data={post}
            renderItem={renderItem_didNumber}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            onScroll={handleScroll}
            onViewableItemsChanged={onViewableItemsChanged.current}
            viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          />
        </View>
      </SafeAreaView>
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331

    )

}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorCode.black_Color
    },
    reelsStyle: {
        flex: 1,
        backgroundColor: ColorCode.black_Color


    },
    postStyle: {
        // height: 300,
        width: "100%",
        backgroundColor: ColorCode.white_Color,
        borderRadius: 15,

    },
    gradientOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '50%', // Adjust as needed
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
        color: ColorCode.white_Color,

    },
    backgroundVideo: {
        height: '100%',
        width: '100%',

    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(28)
    },





})

export default LearningReels;