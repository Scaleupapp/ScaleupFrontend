import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';
import { AddPost, ChatList, GlobalSearch, Home, LearningReels, Profile } from '../screens/mainStack/tabScreens';
import { Image } from 'react-native';
import ColorCode from '../constants/Styles';
import { getMyProfile } from '../utils/apiHelpers';
import { setProfileDat } from '../redux/reducer';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const dispatch = useDispatch();

  useEffect(() => {

    getMyProfile().then((res) => {
      dispatch(setProfileDat(res?.data))
      // setProfileDat((res?.data))
      // console.log("res?.data=====>",res?.data,"res?.data=====>")
    })
  }, [])


  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={() => ({
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          // borderTopWidth: 5,
          height: '10%',
          paddingBottom: '5%',
        },
        tabBarActiveTintColor: ColorCode.blue_Button_Color,
      })}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarActiveTintColor: ColorCode.blue_Button_Color,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500', lineHeight: 16, fontFamily: 'ComicNeue-Bold' },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require('../assets/images/imagebutton_personalcard.png')}
              style={{ tintColor: focused ? ColorCode.blue_Button_Color : 'grey', height: 25, width: 25 }}
            />
          ),
        }}
        name="Home"
        component={Home}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Learning',
          tabBarActiveTintColor: ColorCode.blue_Button_Color,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500', lineHeight: 16, fontFamily: 'ComicNeue-Bold' },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../assets/images/brifecase-timer.png")}
              style={{ tintColor: focused ? ColorCode.blue_Button_Color : 'grey', height: 25, width: 25 }}
            />
          ),
        }}
        name="LearningReels" component={LearningReels} />

      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarActiveTintColor: ColorCode.blue_Button_Color,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500', lineHeight: 16, fontFamily: 'ComicNeue-Bold' },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../assets/images/ActionIcons.png")}
              style={{ height: 50, width: 50, position: 'absolute', bottom: 20 }}
            />
          ),
        }}
        name="AddPost" component={AddPost} />
      <Tab.Screen
        options={{
          tabBarLabel: 'Search',
          tabBarActiveTintColor: ColorCode.blue_Button_Color,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500', lineHeight: 16, fontFamily: 'ComicNeue-Bold' },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../assets/images/Search.png")}
              style={{ tintColor: focused ? ColorCode.blue_Button_Color : 'grey', height: 25, width: 25 }}
            />
          ),
        }}
        name="GlobalSearch" component={GlobalSearch} />
      {/* <Tab.Screen
        options={{
          tabBarLabel: 'Messages',
          tabBarActiveTintColor: ColorCode.blue_Button_Color,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500', lineHeight: 16, fontFamily: 'ComicNeue-Bold' },
          tabBarIcon: ({ color, focused }) => (
            <Image
              source={require("../assets/images/imagebutton_message-text.png")}
              style={{ tintColor: focused ? ColorCode.blue_Button_Color : 'grey', height: 25, width: 25 }}
            />
          ),
        }}
        name="ChatList" component={ChatList} /> */}

      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarActiveTintColor: ColorCode.blue_Button_Color,
          tabBarLabelStyle: { fontSize: 12, fontWeight: '500', lineHeight: 16, fontFamily: 'ComicNeue-Bold' },
          tabBarIcon: ({ color, focused }) => (
            <Image

              source={
                  require("../assets/images/image_user.png") 
                //  require("../assets/images/image_user_Light.png")
              }
              style={{ tintColor: focused ? ColorCode.blue_Button_Color : 'grey', height: 25, width: 25 }}
            />
          ),
        }}
        name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
