
import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Text, TextInput } from 'react-native'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import SplashScreenNavigator from './navigations/splash';
import { NavigationContainer } from '@react-navigation/native';
import { useAppSelector } from './store/hook';
import SliderScreenNavigator from './navigations/slider';
import AuthScreenNavigator from './navigations/authNavigation';
import HomeStackScreen from './navigations/Stacks/homeStack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BLACK } from './util/color';

interface TextWithDefaultProps extends Text {
  defaultProps?: { allowFontScaling?: boolean,color?:string };
}
interface TextInputWithDefaultProps extends TextInput {
  defaultProps?: { allowFontScaling?: boolean,color?:string };
}





const AppUI = () => {
  const [splashShown, setSplashShow] = useState(true)
  const auth = useAppSelector(state => state.auth)
  useEffect(() => {
    ((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
    ((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;
    ((Text as unknown) as TextWithDefaultProps).defaultProps!.color = BLACK;
    ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps = ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps || {};
    ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
    ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.color = BLACK
    setTimeout(() => {
      console.log("timeout runs")
      LayoutAnimation.easeInEaseOut()
      setSplashShow(false)
    }, 4000)
    // return (
    //   clearTimeout(timeout)
    // )
  }, [])
  console.log("splash Screen", splashShown)
  return (
    <NavigationContainer>
      {
        splashShown ? <SplashScreenNavigator /> :
            !auth.isSingin ?
              <AuthScreenNavigator /> : <HomeStackScreen/>}
    </NavigationContainer>
  )
}

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppUI />
        </PersistGate>
      </Provider>
    </SafeAreaProvider>
  );
}



export default App;
