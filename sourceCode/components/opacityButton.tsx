import React ,{useCallback, useEffect, useState}from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';



const OpacityButton = (props:any) => {


  return (
    <TouchableOpacity style={[styles.container,props.button]} 
    onPress={props.pressButton}>
     <Text style={[styles.myText,props.btnTextStyle]}>{props.name}</Text>
    </TouchableOpacity>
   
  );
};

const styles = StyleSheet.create({
  container: {
       height: 50,
       width:'90%',
       backgroundColor:ColorCode.blue_Button_Color ,
       alignSelf:'center',
       borderRadius:hp(8),
       elevation: 20,
        shadowColor:ColorCode.white_Color ,
       shadowOffset: { width: 0, height: 10 },
       shadowOpacity: 0.6,
       fontWeight: '600',
       fontSize: 14,
       color: ColorCode.black_Color,
       justifyContent:'center',
       alignItems:'center'
  },
  myText:{
    color: ColorCode.white_Color,
    fontWeight: '400',
    textAlign: 'center',
    fontSize: hp("2.4%"),
    fontFamily:'ComicNeue-Bold'
  }
 
});

export default OpacityButton;