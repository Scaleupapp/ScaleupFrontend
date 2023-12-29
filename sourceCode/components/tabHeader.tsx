import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';



const TabHeader = (props: any) => {
    const navigation = useNavigation<any>()
    const { pofileData, loading } = useSelector<any, any>((store) => store.sliceReducer);
    return (
        <View style={[styles.container, props.contain]}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                activeOpacity={1}
                onPress={() => {props?.go() ? props?.go() : null}}>
                <Image
                    style={{ tintColor: ColorCode.blue_Button_Color }}
                    source={props?.imge}
                />
                <Text style={styles.myText}>{props?.myHeading}</Text>
            </TouchableOpacity>

            <View style={styles.latView}>

                {
                    pofileData?.user?.role == "Subject Matter Expert" &&
                    <TouchableOpacity
                        onPress={() => { navigation.navigate("ValidateContent") }}
                        style={[styles.btnStyle, props?.relative]}>
                        <Image
                            tintColor={ColorCode.yellowText}
                            source={props?.imge1}
                        />
                    </TouchableOpacity>
                }

                <TouchableOpacity
                    onPress={() => { navigation.navigate("NotificationList") }}
                    style={styles.btnStyle}>
                    <Image

                        style={{ tintColor: ColorCode.blue_Button_Color }}
                        source={props?.imge2}
                    />
                </TouchableOpacity>

            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: '8%',
        width: '100%',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        backgroundColor: ColorCode.white_Color,
        flexDirection: 'row',
        alignItems: 'center'

    },
    myText: {
        color: ColorCode.blue_Button_Color,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 34,
        fontFamily: 'ComicNeue-Bold',
        marginLeft: 15
    },
    latView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: '18%',

    },
    btnStyle: {
        margin: 5

    }

});

export default TabHeader;