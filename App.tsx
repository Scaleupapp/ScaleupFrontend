
import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { RootSiblingParent } from "react-native-root-siblings";
import { SafeAreaView } from "react-native";
import { StackNavigator } from "./sourceCode/navigation";
import { Store } from "./sourceCode/redux";
import { persistor } from "./sourceCode/redux/store";
import Loader from "./sourceCode/components/loader";


function App(): JSX.Element {
  

  return (
    // <SafeAreaView style={{flex:1}}>
    <Provider store={Store}>
      
    <PersistGate loading={null} persistor={persistor}>
      <RootSiblingParent>
        <NavigationContainer>
       
          <StackNavigator/>
        </NavigationContainer>
      </RootSiblingParent>
    </PersistGate>
 </Provider>
//  </SafeAreaView>
  );
}



export default App;





