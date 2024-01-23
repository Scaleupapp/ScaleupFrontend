//@ts-nocheck
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
import { getAllNotification, markAsReact } from "../../../utils/apiHelpers";
import Loader from "../../../components/loader";
import { setLoading } from "../../../redux/reducer";
const NotificationList = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation<any>()
    const [progress, setProgress] = useState(0);
    const [userData, setUserData] = useState([])
    const { loading } = useSelector<any, any>((store) => store.sliceReducer);

    //    console.log("userData====>",userData,"userData====>")
    useEffect(() => {

        getAllNotification().then((res) => {
            //  console.log(res.data,"notification=====>")
            setUserData(res.data)
        })
    }, [])


    const readNotification = (item) => {
        dispatch(setLoading(true))
        const data = {
            "notificationIds":
                [item]
        }
        markAsReact(data).then((res) => {
            dispatch(setLoading(false))
            // console.log(res?.data, "resdata========>")
            getAllNotification().then((res) => {
                //  console.log(res.data,"notification=====>")
                setUserData(res.data)
            })
        })
    }



    const readAll = () => {
        const newArray = userData.map(({ _id }) => ({ _id }));
        dispatch(setLoading(true))
        const data = {
            "notificationIds":
                newArray
        }
        markAsReact(data).then((res) => {
            dispatch(setLoading(false))
            // console.log(res?.data, "resdata========>")
            getAllNotification().then((res) => {
                //  console.log(res.data,"notification=====>")
                setUserData(res.data)
            })
        })
    }


    const renderItem_didNumber = ({ item, index }: any) => {
        //  console.log(item, "item===============>")
        return (
            <TouchableOpacity style={[styles.listStyle,
            item.isRead ? styles.noelivation : styles.cards]}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.boldStyle}>{item?.content}</Text>
                    {item?.isRead === false &&
                        <TouchableOpacity
                            onPress={() => { readNotification(item?._id) }}>
                            <Text style={[styles.smalltxt,
                            { color: ColorCode.blue_Button_Color }]}>{"Read"}</Text>
                        </TouchableOpacity>}
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
            {loading && <Loader />}
            <TabHeader myHeading={"Notifications"}
                go={() => navigation.goBack()}
                imge={require('../../../assets/images/arrow-left.png')} />
           {userData.length > 0 &&
            <TouchableOpacity
                onPress={() => { readAll() }}
                style={{ position: 'absolute', right: 20, top: Platform.OS === 'android' ? 20 : 80 }}>
                <Text style={[styles.smalltxt,
                { color: ColorCode.blue_Button_Color }]}>Mark All As Read</Text>
            </TouchableOpacity>
           } 
            

            {/* <InputText placeholder={"Search"} /> */}
            <View style={[styles.reelsStyle,]}>
                <FlatList
                    scrollEnabled
                    showsVerticalScrollIndicator={false}
                    data={userData}
                    renderItem={renderItem_didNumber}
                    keyExtractor={(item, index) => index.toString()} 
                    ListEmptyComponent={<View style={styles.emptyList}>
                    <Text style={{
                        color: ColorCode.gray_color, width: '100%',
                        textAlign: 'center', fontSize: 20, fontWeight: '500'
                    }}>{'No New Notifications'}</Text>
                </View>}
                    />
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
        minHeight: 40,
        width: '96%',
        marginTop: 8,
        justifyContent: 'center'
    },
    noelivation: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 16,
        marginLeft: 8,
        marginRight: 8,
        minHeight: 40
    },
    circle: {
        height: 20,
        width: 20,
        backgroundColor: ColorCode.blue_Button_Color,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'

    },

    cards: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 6,
        marginLeft: 8,
        marginRight: 8,
        minHeight: 40,
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
    },
    emptyList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: hp(28)
    },

})


export default NotificationList;