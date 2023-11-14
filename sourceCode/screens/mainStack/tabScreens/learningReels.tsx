import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView, ImageBackground, Dimensions
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
import { videos } from "../../../constants/commonFuntions";
import Video from 'react-native-video';
import { addComment, allPostData, sendLikeRequest, sendUnLikeRequest } from "../../../utils/apiHelpers";
import { setLoading } from "../../../redux/reducer";
import Loader from "../../../components/loader";
import CommentModal from "../../../components/commetModal";

const LearningReels = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const { pofileData,loading} = useSelector<any, any>((store) => store.sliceReducer);
    const [post, setPost] = useState([])
    const [showComment, setCommment] = useState(false)
    const [commentArray, setArray] = useState(null)
    useEffect(() => {
        dispatch(setLoading(true))
        allPostData().then((res) => {
            dispatch(setLoading(false))
            setPost(res.data.content)
        })
    }, [])


    const SCREEN_WIDTH = Dimensions.get('window').width;
    const SCREEN_HEIGHT = Dimensions.get('window').height;
    const renderItem_didNumber = ({ item, index }: any) => {
     console.log(item, "itemmmm=======>",item?.contentType == "Video")
        return (
            item?.contentType == "Video" &&
                <View style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT-70}}>

                {item?.contentType == "Video" ?
                    <Video
                        resizeMode='contain'
                        source={{ uri: item?.contentURL }}
                        paused={false}
                        style={styles.backgroundVideo}
                        repeat={true}   
                    >
                    </Video>
                    :
                    // <ImageBackground
                    //    resizeMode='cover'
                    //     // resizeMode={Platform.OS === "ios" ? 'cover' : 'contain'}
                    //     style={{ width:SCREEN_WIDTH,height:SCREEN_HEIGHT-70}}
                    //     source={{ uri: item?.contentURL }}
                    // >
                    // </ImageBackground>

                    null
                }
                <View style={{ position: 'absolute', bottom:Platform.OS === 'ios' ? 80 : 20, left: 20 }}>
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
                            <Text style={[styles.boldStyle,{color:ColorCode.white_Color }]}>{item?.username}</Text>
                            <Text style={[styles.smalltxt,{color:ColorCode.white_Color }]}>{item?.captions}</Text>
                        </View>
                        <View style={{ width: '40%', justifyContent: 'space-between', marginTop: 25 }}>
                        <TouchableOpacity
                            onPress={() => { likeThisPost(item) }}
                        >
                            <Image  style={{ top: -20 }}
                            tintColor={item?.likes.includes(pofileData?.user?._id) ? ColorCode.blue_Button_Color : 'white'}
                             source={require('../../../assets/images/heart.png')} 
                             
                             />
                             </TouchableOpacity>
                            <Text style={[styles.boldStyle, { top: -20, paddingLeft: 10,color:ColorCode.white_Color }]}>{item?.likes.length}</Text>
                           <TouchableOpacity 
                           onPress={()=>{openCoomentSection(item)}}
                           >
                            <Image  tintColor={'white'}  style={{ top: -20 }} 
                            source={require('../../../assets/images/image_message.png')} />
                            </TouchableOpacity>
                            
                            <Text style={[styles.boldStyle, { top: -20, paddingLeft: 10 ,color:ColorCode.white_Color}]}>{item?.comments?.length}</Text>

                        </View>
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
            {/* <TabHeader

                myHeading={"Learning Reels"}
                imge={require('../../../assets/images/arrow-left.png')}
            /> */}

            <View style={[styles.reelsStyle,]}>

                <FlatList
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    data={post}
                    renderItem={renderItem_didNumber}
                    keyExtractor={(item, index) => index.toString()} />

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
        backgroundColor:ColorCode.black_Color


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
    backgroundVideo: {
        height: '100%',
        width: '100%',

    },




})

export default LearningReels;