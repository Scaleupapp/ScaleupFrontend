import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity ,Image} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';
import { useNavigation } from '@react-navigation/native';



const TabHeader = (props: any) => {
    const navigation = useNavigation<any>()

    return (
        <View style={styles.container}>
            <TouchableOpacity style={{flexDirection:'row',alignItems:'center'}}
               activeOpacity={1}
               onPress={()=>{navigation.goBack()}}>
                <Image
                style={{tintColor:ColorCode.blue_Button_Color}}
                source={props?.imge}
                    
                    // require('../assets/images/arrow-left.png')
            /> 
            <Text style={styles.myText}>{props?.myHeading}</Text>
            </TouchableOpacity>

            <View style={styles.latView}>
            <TouchableOpacity style={[styles.btnStyle,props?.relative]}>
            <Image
                style={{tintColor:ColorCode.blue_Button_Color}}
                source={props?.imge1}
            />
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStyle}>
             <Image
             
                style={{tintColor:ColorCode.blue_Button_Color}}
                source={props?.imge2}
            /> 
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btnStyle,{paddingLeft:0}]}>
             <Image
                style={{tintColor:ColorCode.blue_Button_Color}}
                source={props?.imge3}
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
        justifyContent:'space-between',
        backgroundColor:ColorCode.white_Color,
        flexDirection:'row',
        alignItems:'center'

    },
    myText: {
        color: ColorCode.blue_Button_Color,
        textAlign:'center',
        fontSize:24,
        fontWeight:'500',
        lineHeight:34,
        fontFamily:'ComicNeue-Bold',
        marginLeft:15
    },
    latView:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        minWidth:'15%',
        maxWidth:'45%',
    },
    btnStyle:{
        paddingRight:15
    }

});

export default TabHeader;