//@ts-nocheck

import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView
} from "react-native"
import React, { useEffect, useState } from "react"
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import ColorCode from "../../../constants/Styles";
import InputText from "../../../components/textInput";
import { TabHeader } from "../../../components";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import reelsData from "../../../constants/helpers";
import LinearGradient from 'react-native-linear-gradient';
import { blockUSerList, getMyProfile, userUnBlock } from "../../../utils/apiHelpers";
const BlockList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [pofileData, setProfileData] = useState([])

    useEffect(() => {
        blockUSerList().then((res) => {
            setProfileData((res?.data))
        })
    }, [])


const unBlockUesrList=(item)=>{
    userUnBlock(item).then((res)=>{
        blockUSerList().then((res) => {
            setProfileData((res?.data))
        })
    })
}


    const renderItem_didNumber = ({ item, index }: any) => {
        return (
            <View
                style={[styles.postStyle, { marginTop: 10 }]}>
                <TouchableOpacity style={styles.info}>
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
                            <Text style={styles.smalltxt}>{item?.type}</Text>
                        </View>
                    </View>
                    <TouchableOpacity
                          onPress={()=>{unBlockUesrList(item?._id)}} 
                          style={styles.color}>
                        <Text style={[styles.smalltxt,
                        { color: ColorCode.yellowText, paddingLeft: 0,}]}>{'Unblock'}</Text>
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
            <TabHeader myHeading={"Block List"}
            go={()=>navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')} />
            <InputText placeholder={"Search"} />
            <View style={[styles.reelsStyle,]}>
                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={pofileData}
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
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        backgroundColor:'#043142',
        width:75

    },

})

export default BlockList;