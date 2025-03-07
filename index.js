/**
 * @format
 */
import {AppRegistry, LogBox} from 'react-native';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from "react-native-push-notification";

import App from './App';
import {name as appName} from './app.json';
import {enableScreens} from 'react-native-screens'; //Optimize memory usage and performance react-navigation
enableScreens();


import _, {isEmpty} from 'lodash';
global._ = _;

// ignore specific yellowbox warnings
LogBox.ignoreAllLogs();

if (__DEV__) {
  console.log('I am in debug');
  // console.log = () => {};
}

// Register background handler
// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
//   if (!isEmpty(remoteMessage)) {
//     const parseData = await JSON.parse(remoteMessage?.data?.body);
//     let badgeCount = await parseData?.badge || 1;
//     // update notification badge count
//     PushNotification.setApplicationIconBadgeNumber(badgeCount);
//   }
// });

AppRegistry.registerComponent(appName, () => App);
