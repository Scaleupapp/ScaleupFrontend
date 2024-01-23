//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import TabNavigator from './tabNavigator';
import { TouchableOpacity } from 'react-native';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Home, Profile } from '../screens/mainStack/tabScreens';
import BlockList from '../screens/mainStack/drawerScreens/blockList';
import Setting from '../screens/mainStack/drawerScreens/settingScreen';
import ColorCode from '../constants/Styles';
import EditProfile from '../screens/mainStack/drawerScreens/editProfile';

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();



  return (
    <Drawer.Navigator
      initialRouteName={'TabNavigator'}
      screenOptions={() => ({
        swipeEnabled: true,
        headerShown: false,
        drawerType: 'front',
        drawerActiveBackgroundColor: '#012B73',
        drawerItemStyle: {
          height: 50, justifyContent: 'flex-start',
          left: 5, width: 200, borderRadius: 10
        },
        drawerHideOnKeyboard: true,

        drawerStyle: {
          height: '100%', width: '50%', backgroundColor: '#ffffff'
        },
        drawerActiveTintColor: '#012B73',
      })}

    // drawerContent={props => <TouchableOpacity style={{
    //   borderWidth: 1,
    //   borderColor: 'red', backgroundColor: '#ffffff',
    //   position: 'absolute', bottom: '10%', alignSelf: 'center',
    //   width: '80%', borderRadius: 15, paddingVertical: 10
    // }}>
    //   <Text style={{ fontSize: 16, alignSelf: 'center', fontWeight: '500', color: 'red' }}>Logout</Text></TouchableOpacity>}

    >

      <Drawer.Screen
        options={{
          drawerLabel: '',
          drawerActiveTintColor: 'white',
          drawerItemStyle: { backgroundColor: 'white', },
        }}
        name="TabNavigator"
        component={TabNavigator} />
      <Drawer.Screen
        options={{
          drawerLabel: 'Profile',
          drawerActiveTintColor: 'white',
          drawerItemStyle: { backgroundColor: ColorCode.white_Color },
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold', lineHeight: 16,
            color: ColorCode.blue_Button_Color, width: 200,
          },
          drawerInactiveTintColor: 'red',

        }}
        name="Profile"
        component={Profile}
      />
      <Drawer.Screen
        options={{
          drawerLabel: 'Home',
          drawerActiveTintColor: 'white',
          drawerItemStyle: { backgroundColor: ColorCode.white_Color },
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold', lineHeight: 16,
            color: ColorCode.blue_Button_Color, width: 80,
          },
          drawerInactiveTintColor: 'red',

        }}
        name="Home"
        component={Home}
      />

      <Drawer.Screen
        options={{
          drawerLabel: 'EditProfile',
          drawerActiveTintColor: 'white',
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold', lineHeight: 16,
            color: ColorCode.blue_Button_Color, width: 80,
          },
          drawerItemStyle: { backgroundColor: ColorCode.white_Color },
          drawerInactiveTintColor: 'red',

        }}
        name="EditProfile"
        component={EditProfile}
      />
      <Drawer.Screen
        options={{
          drawerLabel: 'Settings',
          drawerActiveTintColor: 'white',
          drawerItemStyle: { backgroundColor: ColorCode.white_Color },
          drawerLabelStyle: {
            fontSize: 14,
            fontWeight: 'bold', lineHeight: 16,
            color: ColorCode.blue_Button_Color, width: 80,
          },
          drawerInactiveTintColor: 'red',

        }}
        name="Settings"
        component={Setting}
      />





    </Drawer.Navigator>
  );
};
export default DrawerNavigator;