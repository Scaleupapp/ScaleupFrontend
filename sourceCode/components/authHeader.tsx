import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';
import { useNavigation } from '@react-navigation/native';



const AuthHeader = (props: any) => {
    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{}}
                onPress={() => { navigation.goBack() }}>
                <Image
                    source={props?.imge} />
            </TouchableOpacity>
            <Image
                style={{ alignSelf: 'center', height: '30%', width: 100 }}
                source={require('../assets/images/demoImage.png')}/>
            <Text style={styles.myText}>{props?.myHeading}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 180,
        width: '100%',
        paddingHorizontal: 15,
        justifyContent: 'space-between',
        backgroundColor: ColorCode.blue_Button_Color,
       
        
    },
    myText: {

        marginBottom: 30,
        color: ColorCode.yellowText,
        textAlign: 'center',
        fontSize: 24,
        fontWeight: '500',
        lineHeight: 34,
        fontFamily: 'ComicNeue-Bold'




    }

});

export default AuthHeader;