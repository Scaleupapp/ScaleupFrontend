import {
    Image, Platform, ScrollView, StyleSheet, Text,
    TextInput, TouchableOpacity, View, StatusBar, FlatList, SafeAreaView
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
import * as Progress from 'react-native-progress';
import ProgressBar from "../../../components/progressBar";
import { Rating, AirbnbRating } from 'react-native-ratings';
import LinearGradient from 'react-native-linear-gradient';
import { userData } from "../../../constants/commonFuntions";
const ChatList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [progress, setProgress] = useState(0);
    const renderItem_didNumber = ({ item, index }: any) => {
        return (
            <TouchableOpacity style={[styles.listStyle,
            item.unreadCount > 0 ? styles.cards : styles.noelivation]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.boldStyle}>{item?.name}</Text>

                  {item?.unreadCount > 0&&
                     <View style={styles.circle}>
                     <Text style={[styles.smalltxt,{color:ColorCode.white_Color,paddingLeft:0}]}>
                         {item?.unreadCount}</Text>
                     </View>
                  }  
                  

                </View>
                <View>
                    <Text style={styles.smalltxt}>{item?.messages}</Text>
                </View>

            </TouchableOpacity>
        )
    }




    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader myHeading={"Messages"}
            go={()=>navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')} />
            <InputText placeholder={"Search"} />
            <View style={[styles.reelsStyle,]}>
                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={userData}
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
    reelsStyle: {
        flex: 1,
        margin: 12
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
    listStyle: {
        height: 80,
        width: '96%',
        marginTop: 8
    },
    noelivation: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginLeft: 8,
        marginRight: 8,
        height: 80,
    },
    circle:{
        height:20,
        width:20,
        backgroundColor:ColorCode.blue_Button_Color,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'

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
                elevation: 4,
            },
        }),
    }

})


export default ChatList;