//@ts-nocheck
import {
    Image, Platform, ScrollView, StyleSheet, Text,Modal,
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
import { addComment, allPostData, getHomePageData, getUserData, sendLikeRequest, sendUnLikeRequest, verifyContent,getPendingVerifyData } from "../../../utils/apiHelpers";
import moment from "moment";
import CommentModal from "../../../components/commetModal";
import Loader from "../../../components/loader";
import { setLoading, setOther } from "../../../redux/reducer";
import VarifyContentHeader from "../../../components/verifyContentHeader";
import { AirbnbRating } from "react-native-ratings";
import Video from 'react-native-video';


const ValidateContent = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const { other, loading } = useSelector<any, any>((store) => store.sliceReducer);
    const [home, setHome] = useState([])
    const [rating, setrating] = useState(null)
    const [cmt, setCmt] = useState('')
    const [acp, setacp]=useState(false)
    const [captionLine, setCaptionLine] = useState(2)
    const [imageUlr, setImageUrl] = useState(null)
    const [showImage, setShowImage] = useState(false)
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [currentPlayingVideo, setCurrentPlayingVideo] = useState(null);
    const [showFullContent, setShowFullContent] = useState(false);

    const get = () => {
        dispatch(setLoading(true));
        getPendingVerifyData().then((res) => {
           console.log("API Response:", res); // Log the complete response
            setHome(res.data.pendingContent); // Access the pendingContent array
            dispatch(setLoading(false));
        }).catch((error) => {
            console.error('API Error:', error);
            dispatch(setLoading(false));
        });
    };
      
    useEffect(() => {
        get();
        return () => {
            setIsVideoPlaying(false); // Stop video playback when navigating away
        };
    }, []);

        // Function to open full-screen content
        const openFullContent = (item) => {
            setImageUrl(item);
            setShowFullContent(true);
        };

        const handleViewableItemsChangedRef = React.useRef(({ viewableItems }) => {
            if (viewableItems.length > 0) {
                const index = viewableItems[0].index;
                const currentItem = home[index];
        
                if (currentItem && currentPlayingVideo !== currentItem._id) {
                    setIsVideoPlaying(false);
                    setCurrentPlayingVideo(null);
                }
            }
        });
        
        const showFullImage = (item) => {
            setImageUrl(item);
            setShowImage(true);
        };
        
       const viewabilityConfigRef= React.useRef({ itemVisiblePercentThreshold: 50 });

        const FullImageModal = ({ imageUrl, close }) => {
            if (!imageUrl || typeof imageUrl !== 'object') {
                return null; // Or some error component
            }
            return (
                <Modal visible={true} transparent={false}>
                    {imageUrl?.contentType === "Video" ?
                        <Video
                            source={{ uri: imageUrl?.contentURL }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain"
                            controls={true}
                        />
                        :
                        <Image
                            source={{ uri: imageUrl?.contentURL }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain"
                        />
                    }
                    <TouchableOpacity onPress={close}>
                        <Text>Close</Text> 
                    </TouchableOpacity>
                </Modal>
            );
        };
    
    // console.log(cmt,"cmt------>")


    const contentVarification = (payload) => {
        dispatch(setLoading(true));
        const data = {
            "rating": rating,
            "smeVerify": acp === true ? "Accepted" : "Rejected",
            "smeComments": cmt
        };
    
        verifyContent(data, payload).then((res) => {
            console.log(res?.data, "data----->");
            // Clear states
            setCmt('');
            setrating(null);
            setacp(false); // Reset to default state
            dispatch(setLoading(false));
            // Call function to remove the item from the list
            removeItemFromView(home.findIndex((item) => item._id === payload));
        });
    };

    const removeItemFromView = (index) => {
        const updatedHome = [...home];
        updatedHome.splice(index, 1);
        setHome(updatedHome);
    };

    const setUserData = (item) => {
        dispatch(setOther(item))
        navigation.navigate("OtherProfile")
    }

    const renderItem_didNumber = ({ item, index }: any) => {
        // ... (other code)
    
        const handleSubmit = (itemId, itemIndex) => {
            contentVarification(itemId);
            removeItemFromView(itemIndex);
        };
    
        // ... (other code)
    
        return (
            <View
                style={[styles.postStyle, styles.iosShadow]}>
                <TouchableOpacity style={styles.info}
                    onPress={() => { setUserData(item.userId._id) }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item.userId.profilePicture ?
                            <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: item.userId.profilePicture }} />
                            :
                            <View style={styles.profileImg} />}
    
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
                {item.contentType == "Video" ?
                    <TouchableOpacity
                        style={{ width: '100%', height: 250 }}
                        activeOpacity={1}
    
                        onPress={() => {
                            setIsVideoPlaying(currentPlayingVideo !== item._id);
                            setCurrentPlayingVideo(item._id);
                        }}>
    
                        <Video
                            source={{ uri: item.contentURL }}
                            paused={currentPlayingVideo !== item._id || !isVideoPlaying}
                            style={{ width: '100%', height: 235, borderRadius: 15, marginVertical: 10 }}
                            resizeMode='cover'
                            controls={true}
                        />
                    </TouchableOpacity>
    
                    :
                    <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => showFullImage(item)}
                        style={styles.imageContainer}>
                        <Image
                            style={styles.imageStyle}
                            resizeMode='contain'
                            source={{ uri: item.contentURL }}
                        />
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
                </View>
                <View style={[styles.info, { paddingHorizontal: 15 }]}>
                    <Text style={{}} >Verified :</Text>
                    <TouchableOpacity onPress={() => setacp(true)}>
                        <Image source={require('../../../assets/images/check_24px.png')} />
                    </TouchableOpacity>
    
                    <TouchableOpacity onPress={() => setacp(false)}>
                        <Image source={require('../../../assets/images/close_24px.png')} />
                    </TouchableOpacity>
    
                    <Text style={{}}>Rating</Text>
    
                    <AirbnbRating
                        starContainerStyle={{ marginBottom: 30 }}
                        count={5}
                        defaultRating={0}
    
                        onFinishRating={(t) => { setrating(t) }}
                        size={15}
                    />
    
                </View>
    
    
                <TextInput
                    onChangeText={(t) => { setCmt(t) }}
                    value={cmt}
                    placeholder={'Provide your Comments'}
                    keyboardType={'default'}
                    style={{
                        height: 50, width: '90%',
                        alignSelf: 'center', backgroundColor: "#F6F6F6",
                        borderRadius: 10, paddingLeft: 10, marginTop: -20, marginBottom: 10
                    }}
                />
                <TouchableOpacity onPress={() => handleSubmit(item._id, index)} style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
    
            </View>
        );
    }
    

    return (
        <SafeAreaView style={styles.main}>

            {loading && <Loader />}

            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color} />
            <VarifyContentHeader />
            <View style={[styles.reelsStyle,]}>

            <FlatList
                scrollEnabled
                showsVerticalScrollIndicator={false}
                data={home}
                renderItem={renderItem_didNumber}
                keyExtractor={(item, index) => index.toString()}
                onViewableItemsChanged={handleViewableItemsChangedRef.current}
                viewabilityConfig={viewabilityConfigRef.current}
            />
            </View>


            {showImage && (
                <FullImageModal 
                    imageUrl={home.find(item => item._id === currentPlayingVideo)} 
                    close={() => setShowImage(false)} 
                />
            )}

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
    videoStyle: {
        width: '100%', 
        height: 250,
        backgroundColor: ColorCode.lightGrey,
        borderRadius: 15, 
        marginVertical: 10
    },
    imageContainer: {
        width: '100%',
        height: 250,
        backgroundColor: ColorCode.lightGrey,
        borderRadius: 15, 
        marginVertical: 10
    },
    imageStyle: {
        height: '100%', 
        width: '100%'
    },

        submitButton: {
        backgroundColor: 'blue', // Choose your color
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: 10,
    },
    submitButtonText: {
        color: 'white', // Choose your text color
        fontSize: 16,
    },

})

export default ValidateContent;