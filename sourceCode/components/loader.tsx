import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ColorCode from '../constants/Styles';
import { Modal } from 'react-native';



const Loader = (props: any) => {


    return (

        <Modal 
        transparent
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center',backgroundColor:ColorCode.modalBgColor }}>
           <View style={{flex:1, alignItems: 'center', justifyContent: 'center',backgroundColor:ColorCode.modalBgColor}}>
            <ActivityIndicator
                color={ColorCode.blue_Button_Color}
                size={'large'}
            />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {

    },


});

export default Loader;