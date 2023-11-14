import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Modal, TextInput, Keyboard, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useSelector } from 'react-redux';



const CommentModal = (props: any) => {
    const navigation = useNavigation<any>()

    const [comentText, setCommentText] = useState("")
    const { loginUser } = useSelector<any, any>((store) => store.cookies);
    const [myComment, setComments]=useState(props?.value?.comments)
    const add = () => {
        const d = {
            "contentId": props?.value?._id,
            "commentText": comentText
        }
        props?.post(d)
    }


    const renderItem_didNumber = ({ item, index }) => {
        return (
            <TouchableOpacity 
            style={{ flexDirection: 'row',
             marginTop: 10, paddingHorizontal: 10,height:60 }}>
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
                <View style={{ marginLeft: 10, }}>
                    <Text style={styles.boldStyle}>{item.username}</Text>
                    <Text style={styles.smalltxt}>{item.commentText}</Text>
                </View>

            </TouchableOpacity>
        )
    }





    return (
        <Modal transparent={true} animationType="slide" style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps="handled">
                <TouchableOpacity style={styles.main} activeOpacity={1} onPress={() => { props.close() }} >
                    <View style={styles.inner}>
                        <TouchableOpacity onPress={() => { props.close() }} style={styles.middleButton} />
                        <View style={{
                            alignItems: 'center', justifyContent: 'space-between',
                            backgroundColor: '#FFFFFF', borderRadius: 5, height: 40, marginTop: 15,
                            flexDirection: 'row', paddingHorizontal: 15
                        }}>
                            <Text style={{ fontSize: 15, color: 'black', fontWeight: '600', textAlign: 'center', width: '100%' }}>Comments</Text>
                            <TouchableOpacity activeOpacity={1} onPress={() => { props.close() }} >
                                {/* <CancelIcon /> */}
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: "100%", height: 1, backgroundColor: ColorCode.gray_background_color }} />
                        <View style={{  marginTop: 10 ,flex:1}}>
                            <FlatList
                                scrollEnabled
                                showsVerticalScrollIndicator={false}
                                data={myComment}
                                renderItem={renderItem_didNumber}
                                keyExtractor={(item, index) => index.toString()} />

                        </View>
                        <View style={styles.buttonView}>

                            <TextInput
                                keyboardType="email-address"
                                placeholder='Comment....'
                                value={comentText}
                                onChangeText={(text) => { setCommentText(text) }}
                                style={{
                                    height: 38,
                                    width: '72%',
                                    marginHorizontal: '4%',
                                    borderColor: ColorCode.blue_Button_Color,
                                    borderRadius: 5, borderWidth: 1,
                                    paddingLeft: 10, color: ColorCode?.black_Color
                                }} />

                            <TouchableOpacity
                                onPress={() => { add() }}
                            >
                                <Image
                                    style={{}}
                                    source={require('../assets/images/send.png')}

                                />
                            </TouchableOpacity>

                        </View>
                    </View>

                </TouchableOpacity >
            </KeyboardAwareScrollView>
        </Modal>
    );
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: ColorCode.modalBgColor,
    },
    inner: {
        height: '50%',
        width: '100%',
        backgroundColor: 'white',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
    },
    smallText: {
        color: ColorCode.gray_color,
        fontSize: 14,
        fontFamily: "Poppins",
        fontWeight: '500'
    },
    middleButton: {
        alignSelf: "center",
        marginTop: 5,
        height: 5,
        width: 80,
        alignItems: "center",
        backgroundColor: ColorCode.gray_background_color,
        borderRadius: 5,
        
    },
    buttonView: {
        height: Platform.OS === 'android' ? 40 : 70,
        width: '100%',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    button: {
        height: 38,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        width: "60%"
    },
    btnText: {
        fontFamily: 'Poppins',
        fontSize: 14,
        fontWeight: '500'
    },
    profileImg: {
        height: 60,
        width: 60,
        borderRadius: 30,
        backgroundColor: ColorCode.lightGrey
    },
    boldStyle: {

        fontSize: 18,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.black_Color

    },

    smalltxt: {
        fontSize: 14,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

    }

});

export default CommentModal;









