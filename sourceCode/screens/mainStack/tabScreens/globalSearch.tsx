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
import LinearGradient from "react-native-linear-gradient";
import reelsData from "../../../constants/helpers";

const GlobalSearch = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()

    const renderItem_didNumber = ({ item, index }: any) => {
        return (
            <View
                style={[styles.postStyle, { marginTop: 10 }]}>
                <TouchableOpacity style={styles.info} onPress={() => { navigation.navigate("Connections") }}
                >
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={styles.profileImg}>
                        </View>
                        <View style={styles.nameType}>
                            <Text style={styles.boldStyle}>{item?.name}</Text>
                            <Text style={styles.smalltxt}>{item?.type}</Text>

                            <LinearGradient
                                colors={['#043142', '#043142', '#6200EA']}
                                start={{ x: 0.1, y: 1.5 }} end={{ x: 0.5, y: 0.5 }}
                                locations={[1., 1.4, 0.5]}
                                style={styles.color}>
                                <Text style={[styles.smalltxt, { color: ColorCode.yellowText, }]}>{'follow'}</Text>
                            </LinearGradient>
                        </View>
                    </View>

              <View style={{flexDirection:'row',justifyContent:'space-between',width:wp(35)}}>
                <TouchableOpacity style={{alignItems:'center'}}

                onPress={()=>{navigation.navigate('Setting')}}
                >
                    <Image
                    source={require('../../../assets/images/Posts_.png')}
                    />
                    <Text style={styles.smalltxt}>20</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}}
                onPress={()=>{navigation.navigate("OtherProfile")}}
                >
                    <Image
                    source={require('../../../assets/images/following_.png')}
                    />
                    <Text style={styles.smalltxt}>200</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}}>
                    <Image
                    source={require('../../../assets/images/followers_.png')}
                    />
                    <Text style={styles.smalltxt}>220</Text>
                </TouchableOpacity>
              </View>



                </TouchableOpacity>



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
            <TabHeader myHeading={"Search"} imge={require('../../../assets/images/arrow-left.png')} />
            <InputText placeholder={"Search"}/>

            <View style={{flexDirection:'row',justifyContent:'space-between',width:'96%',
                    marginTop:10,borderBottomColor:ColorCode.lightGrey,
                    borderBottomWidth:2,paddingVertical:5,paddingHorizontal:15,marginHorizontal:5}}>
                <TouchableOpacity style={{alignItems:'center',
                    }}>
                    <Image
                    source={require('../../../assets/images/Group.png')}
                    />
                   
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}}>
                    <Image
                    source={require('../../../assets/images/star3.png')}
                    />
                    
                </TouchableOpacity>

                <TouchableOpacity style={{alignItems:'center'}}>
                    <Image
                    source={require('../../../assets/images/location.png')}
                    />
                 
                </TouchableOpacity>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <Image
                    source={require('../../../assets/images/image_personalcard.png')}
                    />
                 
                </TouchableOpacity>
              </View>
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
        backgroundColor: ColorCode.white_Color,
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
        paddingLeft: 10,
    },
    boldStyle: {
       
        fontSize: 16,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.black_Color

    },

    smalltxt: {
        // paddingLeft: 10,
        fontSize: 13,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

    },
    color: {
        height: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15,
        width:80,
        marginTop:10

    },

})

export default GlobalSearch;