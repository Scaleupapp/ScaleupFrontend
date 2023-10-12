import React ,{useState}from 'react';
import { View, Text, StyleSheet,Image,TextInput, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';

const InputText = (props:any) => {

  return (
    <View style={[styles.container,props?.style]}>
    <Image
    source={props.img}
    />
     <TextInput 
     placeholder={props.placeholder}
     placeholderTextColor={props?.placeholderTextColor? props?.placeholderTextColor:'grey'}
     maxLength={props?.length}
     keyboardType={props.keyboardType}
     onChangeText= {props.onChange}
     value={props.Value}
     autoCapitalize={props.autoCapitalize}
     secureTextEntry={props.secureTextEntry}
     style={styles.input}
     />
     <TouchableOpacity style={{alignItems:'center',
     justifyContent:'center',right:30}}
     onPress={()=>{props.show()}}
     >
     <Image
    source={props.img2}
    />
     </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
       height: 50,
       width:'90%',
       backgroundColor:ColorCode.white_Color ,
       alignSelf:'center',
       borderRadius:hp(8),
       elevation: 20,
        shadowColor:ColorCode.white_Color ,
       shadowOffset: { width: 0, height: 10 },
       shadowOpacity: 0.6,
       borderColor: '#ddd',
       borderWidth:1,
       paddingLeft:15,
       fontWeight: '600',
       fontSize: 14,
       color: ColorCode.black_Color,
       flexDirection:'row',
       alignItems:'center'
  },
  input:{
    width:'90%',
    fontFamily:'ComicNeue-Bold',
    paddingLeft:10
  }
 
});

export default InputText;