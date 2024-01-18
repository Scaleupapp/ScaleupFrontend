//@ts-nocheck
import {
    Image, StyleSheet, Text,
    TouchableOpacity, View,
    StatusBar, FlatList,
    SafeAreaView, ImageBackground
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import ColorCode from "../../../constants/Styles";
import OpacityButton from "../../../components/opacityButton";
import { TabHeader } from "../../../components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { followUnList, unfollowUser } from "../../../utils/apiHelpers";
const Connections = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [fllow, setFollow] = useState([])
    const [unFollow, setUnfollow] = useState([])
    const [type, setType] = useState(true)

    useEffect(() => {
        followUnList().then((res) => {
            setFollow(res?.data?.followerList)
            setUnfollow(res?.data?.followingList)
        })
    }, [])

    const Unfolow=(item)=>{
        unfollowUser(item).then((res) => {
            // console.log(res?.data,"resdata------->")
            followUnList().then((res) => {
                setFollow(res?.data?.followerList)
                setUnfollow(res?.data?.followingList)
            })
        })
    }

    const renderItem_didNumber = ({ item, index }: any) => {
        // console.log(item, "iiiii=====>")
        return (
            <View
                style={[styles.postStyle, { marginTop: 10 }]}>
                <TouchableOpacity style={styles.info}
                    onPress={() => { navigation.navigate("Connections") }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        {item?.profilePicture ?
                            <Image
                                resizeMode='cover'
                                style={styles.profileImg}
                                source={{ uri: item?.profilePicture }} />
                            :
                            <View style={styles.profileImg} />
                        }
                        <View style={styles.nameType}>
                            <Text style={styles.boldStyle}>{item?.username}</Text>
                            <Text style={styles.smalltxt}>{item?.firstname + " " + item?.lastname}</Text>
                        </View>
                    </View>

                    {/* <LinearGradient
                        colors={['#043142', '#043142','#6200EA']}
                        start={{x: 0.1, y: 1.5}} end={{x:0.5, y: 0.5}}
                        locations={[1.,1.4,0.5]}
                        style={styles.color}>
                        <Text style={[styles.smalltxt, { color: ColorCode.yellowText ,marginHorizontal:20}]}>{'Unfollow'}</Text>
                    </LinearGradient> */}

                    <TouchableOpacity
                    onPress={()=>{Unfolow(item?._id)}}
                    >
                        <ImageBackground
                            resizeMode='contain'
                            style={styles.color}
                            source={require("../../../assets/images/button_.png")}>
                            <Text style={[styles.smalltxt, { color: ColorCode.yellowText, paddingLeft: 0 }]}>{type ? 'Unfollow' : "Remove"}</Text>
                        </ImageBackground>
                    </TouchableOpacity>


                </TouchableOpacity>



            </View>
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color} />
            <TabHeader 
            go={()=>navigation.goBack()}
            myHeading={"Connections"}
                imge={require('../../../assets/images/arrow-left.png')} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <OpacityButton
                    pressButton={() => { setType(false) }}
                    name={"Followers-" + unFollow?.length}
                    btnTextStyle={{ color: type ? ColorCode.blue_Button_Color : ColorCode.yellowText, }}
                    button={{ width: '48%', backgroundColor: type ? ColorCode.white_Color : ColorCode.blue_Button_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
                <OpacityButton
                    pressButton={() => { setType(true) }}
                    name={"Following-" + fllow?.length}
                    btnTextStyle={{ color: !type ? ColorCode.blue_Button_Color : ColorCode.yellowText, }}
                    button={{ width: '48%', backgroundColor: !type ? ColorCode.white_Color : ColorCode.blue_Button_Color, borderColor: ColorCode.blue_Button_Color, borderWidth: 1 }} />
            </View>
            <View style={[styles.reelsStyle,]}>
                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={type ? fllow : unFollow}
                    renderItem={renderItem_didNumber}
                    keyExtractor={(item, index) => index.toString()} />
            </View>
        </SafeAreaView>

    )

}



const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: ColorCode.white_Color
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

    },
    boldStyle: {
        paddingLeft: 10,
        fontSize: 16,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.black_Color

    },

    smalltxt: {
         paddingLeft: 10,
        fontSize: 13,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

    },
    color: {
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width: 80,
        marginTop: 10

    },

})

export default Connections;