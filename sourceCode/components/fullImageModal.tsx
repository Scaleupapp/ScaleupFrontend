<<<<<<< HEAD
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Modal, TextInput, Keyboard, FlatList } from 'react-native';
=======
//@ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, Modal, TextInput, Keyboard, FlatList, ActivityIndicator } from 'react-native';
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
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
import Video from 'react-native-video';

<<<<<<< HEAD


=======
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
const FullImageModal = (props: any) => {
    const navigation = useNavigation<any>()
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const { loginUser } = useSelector<any, any>((store) => store.cookies);

<<<<<<< HEAD
    // console.log(props?.imageUrl?.contentURL, "props?.imageUrl===>")

=======
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
    return (
        <Modal transparent={true} animationType="slide" style={{ flex: 1 }}>
            <KeyboardAwareScrollView
                contentContainerStyle={{ flex: 1 }}
                keyboardShouldPersistTaps="handled">

<<<<<<< HEAD
                {loading && <Loader color ={'white'}/>}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => props.close()}

=======
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => props.close()}
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                    style={{
                        height: 50, width: 50,
                        position: 'absolute', backgroundColor: 'white',
                        zIndex: 1, alignItems: 'center',
                        justifyContent: 'center', borderRadius: 25,
                        top: 50, left: 0
                    }}>
                    <Image
                        source={require('../assets/images/close_24px.png')}
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.main}
                    activeOpacity={1}
                    onPress={() => { props.close() }} >

                    <View style={styles.inner}>
                        {props?.imageUrl?.contentType === "Video" ?

                            <Video
                                resizeMode='contain'
                                source={{ uri: props?.imageUrl?.contentURL }}
<<<<<<< HEAD
                                // paused={false}
                                style={{
                                    width: '100%', height: '100%',
                                    
                                    borderRadius: 15, marginVertical: 10
                                }}
                                repeat={true} 
                                onLoad={() => setLoading(false)}
                                
                                />
=======
                                style={{
                                    width: '100%', height: '100%',
                                    borderRadius: 15, marginVertical: 10
                                }}
                                repeat={true}
                                onLoad={() => setLoading(false)}
                            />
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
                            :

                            <Image
                                resizeMode='center'
                                style={{ height: '100%', width: '100%' }}
                                source={{ uri: props?.imageUrl?.contentURL }}
<<<<<<< HEAD
                                 onLoad={() => setLoading(true)}
                                onLoadEnd={() => setLoading(false)}
                            />


                        }

                    </View>



=======
                                onLoad={() => setLoading(false)}
                            />
                        }

                        {loading && (
                            <View style={styles.loadingContainer}>
                                <ActivityIndicator size="large" color={ColorCode.white_Color} />
                            </View>
                        )}
                    </View>
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
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
        backgroundColor: ColorCode.black_Color,
    },
    inner: {
        height: '80%',
        width: '100%',
        backgroundColor: ColorCode.black_Color,
        borderRadius: 10,
<<<<<<< HEAD
        alignItems: 'center'


    },

    boldStyle: {

=======
        alignItems: 'center',
    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    boldStyle: {
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
        fontSize: 18,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.black_Color,
        textAlign: 'center',
<<<<<<< HEAD
        marginTop: 20

    },

=======
        marginTop: 20,
    },
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
    smalltxt: {
        fontSize: 14,
        fontFamily: 'ComicNeue-Bold',
        color: ColorCode.gray_color,
<<<<<<< HEAD

=======
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
    },
    enter: {
        height: 50,
        width: '80%',
        borderRadius: 25,
        borderWidth: 1,
        borderColor: 'grey',
        marginTop: 20,
<<<<<<< HEAD
        padding: 10

    }

});

export default FullImageModal;









=======
        padding: 10,
    },
});

export default FullImageModal;
>>>>>>> 2c7caaf02a162d577493f347017a38693d5a8331
