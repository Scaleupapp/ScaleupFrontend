//@ts-nocheck
import {
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
    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    
    const renderItem_didNumber = ({ item, index }: any) => {
        console.log(item, "itemmmm=======>")
        return (
            item?.contentType == "Video" &&
            <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 70 }}>

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