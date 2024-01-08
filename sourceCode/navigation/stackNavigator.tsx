import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BasicDetail, Certification, ChangePassword, EducationDetail, ForgotPassword, PasswordOtp, SignIn, SignUp, Terms, WorkDetails } from "../screens/authStack";
import TabNavigator from "./tabNavigator";
import { useSelector } from "react-redux";
import DrawerNavigator from "./drawerNavigation";
import Connections from "../screens/mainStack/drawerScreens/connections";
import BlockList from "../screens/mainStack/drawerScreens/blockList";
import Setting from "../screens/mainStack/drawerScreens/settingScreen";
import { NotificationList, OtherProfile, ValidateContent } from "../screens/mainStack/tabScreens";
import EditProfile from "../screens/mainStack/drawerScreens/editProfile";
import HelpCenter from "../screens/mainStack/tabScreens/helpCenter";
import PrivacyPolicy from "../screens/authStack/privacyPolicy";
import Faqs from "../screens/authStack/faqs";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { loginUser } = useSelector<any, any>((store) => store.cookies);
  // console.log(loginUser,"login--------->")
  return (
    <Stack.Navigator

      initialRouteName={
        loginUser?.token ? "TabNavigator" :
          "SignIn"
      }
      screenOptions={{ headerShown: false, gestureEnabled: false, gestureDirection: 'horizontal', }} >
      <Stack.Screen name="TabNavigator" component={TabNavigator} />
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
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="HelpCenter" component={HelpCenter} />
      <Stack.Screen name="Faqs" component={Faqs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};
export default StackNavigator;