import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';
import { useNavigation } from '@react-navigation/native';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';


const ProfileHeader = (props: any) => {
    const navigation = useNavigation<any>()

    return (
        <View style={[styles.container, props.contain]}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                activeOpacity={1}
                onPress={() => { navigation.goBack() }}>
                <Image
                    style={{ tintColor: ColorCode.blue_Button_Color }}
                    source={props?.imge}

                // require('../assets/images/arrow-left.png')
                />
                <Text style={styles.myText}>{props?.myHeading}</Text>
            </TouchableOpacity>

            <View style={styles.latView}>
                <Menu>
                    <MenuTrigger
                        customStyles={{
                            optionsWrapper: { padding: 2 },
                            TriggerTouchableComponent: ({ onPress }) => {
                                return (
                                    <TouchableOpacity onPress={onPress} style={{
                                        height: 45, alignItems: 'center', borderRadius: 5,
                                        borderColor: "white", borderWidth: 1, backgroundColor: ColorCode.white_Color,
                                        paddingHorizontal: 4,
                                    }}>
                                        <Image
                                            tintColor={'grey'}
                                            style={{ tintColor: ColorCode.blue_Button_Color, borderRadius: 5, marginTop: 5 }}
                                            source={require('../assets/images/folow_123folow_group_.png')}
                                        />


                                    </TouchableOpacity>);
                            },
                        }} />
                    <MenuOptions
                        optionsContainerStyle={{ right: -80 }}
                        customStyles={{
                            optionsContainer: {
                                // width: wp('80%'),
                                backgroundColor: ColorCode.white_Color,
                                height: 40, width: 100, marginTop: 20
                            }
                        }}>

                        <MenuOption
                            onSelect={() => {props.button() }}
                            style={styles.menuOption}>
                            <Text style={styles.menuText}>Block User</Text>
                        </MenuOption>

                    </MenuOptions>
                </Menu>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        minWidth: '15%',
        maxWidth: '45%',
    },
    btnStyle: {
        paddingRight: 15
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        justifyContent: 'center'
    },
    menuText: {
        color: 'red',
        fontSize: 12,
        fontWeight: '400',
        marginLeft: 5
    },

});

export default ProfileHeader;