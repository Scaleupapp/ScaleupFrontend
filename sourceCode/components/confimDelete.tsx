import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Modal, TextInput, Keyboard, FlatList } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';
import { useNavigation } from '@react-navigation/native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useDispatch, useSelector } from 'react-redux';
import OpacityButton from './opacityButton';
import { setLoginUser } from '../redux/cookiesReducer';
import { deleteAccont } from '../utils/apiHelpers';
import Loader from './loader';
import { setLoading } from '../redux/reducer';



const ConfirmDelete = (props: any) => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch();
    const [password, setPassword] = useState('')
    const [comentText, setCommentText] = useState("")
    const { loginUser } = useSelector<any, any>((store) => store.cookies);
    const { pofileData, loading } = useSelector<any, any>((store) => store.sliceReducer);
    const deleteA = () => {
        dispatch(setLoading(true))
        const data = { "password": password }
        deleteAccont(data).then((res) => {
            dispatch(setLoading(false))
            // console.log(res?.data,"data======>")
            if (res?.data?.message === "Account deleted successfully") {
                // dispatch(setLoginUser({}))
                props.close()
                setPassword('')
                logout()

            }

        })

    }


    const logout = () => {

        navigation.reset({
            index: 0,
            routes: [{ name: 'SignIn' }] // Replace 'Home' with the screen you want to reset to
        });

    }


    return (
        <Modal transparent={true} animationType="slide" style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps="handled">

                {loading && <Loader />}
                <TouchableOpacity style={styles.main}
                    activeOpacity={1}
                    onPress={() => { props.close() }} >

                    <View style={styles.inner}>
                        <Text style={styles.boldStyle}>Please enter your password to delete account.</Text>


                        <TextInput
                            value={password}
                            onChangeText={(t) => { setPassword(t) }}
                            placeholder='Password'
                            style={styles.enter}
                        />


                        <OpacityButton
                            pressButton={() => { deleteA() }}
                            name={"Delete"}
                            btnTextStyle={{ color: ColorCode.yellowText, }}
                            button={{ width: '80%', marginTop: 20 }}

                        />
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
        justifyContent: 'center',
        backgroundColor: ColorCode.modalBgColor,
    },
    inner: {
        height: 240,
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center'


    },

    boldStyle: {

        fontSize: 18,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.black_Color,
        textAlign: 'center',
        marginTop: 20

    },

    smalltxt: {
        fontSize: 14,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,

    },
    enter: {
        height: 50,
        width: '80%',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 20,
        padding: 10

    }

});

export default ConfirmDelete;









