import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BasicDetail, Certification, EducationDetail, ForgotPassword, PasswordOtp, SignIn, SignUp, Terms, WorkDetails } from "../screens/authStack";
import TabNavigator from "./tabNavigator";
import { useSelector } from "react-redux";
import DrawerNavigator from "./drawerNavigation";
import Connections from "../screens/mainStack/drawerScreens/connections";
import BlockList from "../screens/mainStack/drawerScreens/blockList";
import Setting from "../screens/mainStack/drawerScreens/settingScreen";
import { NotificationList, OtherProfile, ValidateContent } from "../screens/mainStack/tabScreens";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { loginUser } = useSelector<any, any>((store) => store.cookies);
console.log(loginUser,"login--------->")
  return (
    <Stack.Navigator
    
      initialRouteName={
        loginUser?.token ? "DrawerNavigator" :
         "SignIn"}
      screenOptions={{ headerShown: false, gestureEnabled: false, gestureDirection: 'horizontal', }} >
     <Stack.Screen name="DrawerNavigator" component={DrawerNavigator} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Terms" component={Terms} />
      <Stack.Screen name="BasicDetail" component={BasicDetail} />
      <Stack.Screen name="EducationDetail" component={EducationDetail} />
      <Stack.Screen name="WorkDetails" component={WorkDetails} />
      <Stack.Screen name="Certification" component={Certification} />
      <Stack.Screen name="Connections" component={Connections} />
      <Stack.Screen name="BlockList" component={BlockList} />
      <Stack.Screen name="Setting" component={Setting} />
      <Stack.Screen name="OtherProfile" component={OtherProfile} />
      <Stack.Screen name="NotificationList" component={NotificationList} />
      <Stack.Screen name="ValidateContent" component={ValidateContent} />
      <Stack.Screen name="PasswordOtp" component={PasswordOtp} />
    </Stack.Navigator>
  );
};
export default StackNavigator;