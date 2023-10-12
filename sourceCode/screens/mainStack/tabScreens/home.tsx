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

const Home = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
const [music, setMusic]=useState([])















    const renderItem_didNumber = ({ item, index }: any) => {
        console.log(item,"item=======>")
        return (
            <View
                style={[styles.postStyle, styles.iosShadow]}>
                <TouchableOpacity style={styles.info} onPress={()=>{navigation.navigate("Connections")}}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.profileImg}>
                        </View>
                        <View style={styles.nameType}>
                            <Text style={styles.boldStyle}>{item?.name}</Text>
                            <Text style={styles.smalltxt}>{item?.type}</Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'flex-start' }}>
                        <Text style={[styles.smalltxt, { marginTop: 12 }]}>{item?.time}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.info}>
                    <Text style={[styles.smalltxt, { textAlign: 'left', marginTop: 15, width: '90%' }]}>{item?.postText}</Text>
                    <Image style={{ top: -20 }} source={item?.typeImg} />
                </View>
                <Image
                    resizeMode='contain'
                    style={{ width: '100%', height: 250, backgroundColor: ColorCode.lightGrey, borderRadius: 15, marginVertical: 20 }}
                    source={item?.typeImg}
                />
                <View style={styles.info}>
                    <View style={{flexDirection:'row',width:'40%',justifyContent:'space-between',marginTop:15}}>
                    <Image style={{ top: -20 }} source={item?.likeImage} />
                    <Image style={{ top: -20 }} source={item?.commentImage} />
                    <Image style={{ top: -20 }} source={item?.ShareImage} />
                    </View>
                    
                    <Image style={{ top: -20 }} source={item?.SaveImage} />
                </View>
            </View>

           
        )
    }

    return (
        <SafeAreaView style={styles.main}>
            <StatusBar
                barStyle={'dark-content'}
                animated={true}
                backgroundColor={ColorCode.white_Color}
            />
            <TabHeader myHeading={"ScaleUp"}
                imge1={require('../../../assets/images/filter-remove.png')}
                imge2={require('../../../assets/images/Notification.png')}
                imge3={require('../../../assets/images/imagebutton_message-text.png')}
            />

            <View style={[styles.reelsStyle,]}>

                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={reelsData}
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
        marginTop:10
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
    shadowOffset: {width: -2, height: 4},
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