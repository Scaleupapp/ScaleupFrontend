
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
import { MenuProvider } from 'react-native-popup-menu';
import * as Sentry from '@sentry/react-native';
function App(): JSX.Element {
 




useEffect(()=>{
  Sentry.init({
    dsn: "https://94e54e754d92a04e2a1c378dcec4e366@o4506403653222400.ingest.sentry.io/4506428446343168",
  
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  
  Sentry.setTag("myTag", "tag-value");
  Sentry.setExtra("myExtra", "extra-value");
  Sentry.addBreadcrumb({ message: "test" });
  
  Sentry.captureMessage("Hello Sentry!");
},[])

  return (
    // <SafeAreaView style={{flex:1}}>
    <Provider store={Store}>
       <MenuProvider>
    <PersistGate loading={null} persistor={persistor}>
      <RootSiblingParent>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </RootSiblingParent>
    </PersistGate>
    </MenuProvider>
 </Provider>
//  </SafeAreaView>
  );
}



export default App;





