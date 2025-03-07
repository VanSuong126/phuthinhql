/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from '~redux/store';
import '~helper/i18n';
import Index from '~root';
import {registerListenerWithFCM} from '~helper/notifyFCM';
import LocalDB from '~data/asyncStorage';
import Loading from '~components/Loading';

const App = () => {
  useEffect(() => {
    const prepare = async () => {
      try {
        await LocalDB.initializeDefaults();
        // Các cuộc gọi API sẽ ở đây
        await new Promise(resolve => setTimeout(resolve, 500)); 
      } catch (e) {
        console.warn(e);
      } finally {
        SplashScreen.hide();
      }
    };
    prepare();
  }, []);
  useEffect(() => {
    const unsubscribe = registerListenerWithFCM();
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Index />
        <Loading/>
      </PersistGate>
    </Provider>
  );
};
export default App;
