import {check, request, PERMISSIONS} from 'react-native-permissions';
import {Platform} from 'react-native';

const platform = Platform.OS;
const permissions = {
  camera: {
    android: 'CAMERA',
    ios: 'CAMERA',
  },
  library: {
    android: 'READ_EXTERNAL_STORAGE',
    ios: 'PHOTO_LIBRARY',
  },
  audio: {
    android: 'RECORD_AUDIO',
    ios: 'MICROPHONE',
  },
  location: {
    android: 'ACCESS_FINE_LOCATION',
    ios: 'LOCATION_WHEN_IN_USE',
  },
};

export const checkPermission = async permission => {
  return check(
    PERMISSIONS[platform.toUpperCase()][permissions[permission][platform]],
  )
    .then(response => {
      // type status used in permission response |'unavailable' | 'denied' | 'blocked' | 'granted'|
      console.log('Check [PERMISSION]:', permission, response);
      if (response == 'granted') {
        return true;
      } else if (response == 'blocked') {
        return false;
      } else {
        return requestPermission(permission);
      }
    })
    .catch(e => {
      console.log('Permissions check error: ', e);
      return false;
    });
};

export const requestPermission = permission => {
  return request(
    PERMISSIONS[platform.toUpperCase()][permissions[permission][platform]],
  )
    .then(response => {
      console.log('Request [PERMISSION]:', permission, response);
      return response === 'granted';
    })
    .catch(e => {
      console.log('Permissions request error: ', e);
      return false;
    });
};

// Check type permission want to request
//Params are...
// Android permissions
PERMISSIONS.ANDROID.ACCEPT_HANDOVER;
PERMISSIONS.ANDROID.ACCESS_BACKGROUND_LOCATION;
PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION;
PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
PERMISSIONS.ANDROID.ACTIVITY_RECOGNITION;
PERMISSIONS.ANDROID.ADD_VOICEMAIL;
PERMISSIONS.ANDROID.ANSWER_PHONE_CALLS;
PERMISSIONS.ANDROID.BODY_SENSORS;
PERMISSIONS.ANDROID.CALL_PHONE;
PERMISSIONS.ANDROID.CAMERA;
PERMISSIONS.ANDROID.GET_ACCOUNTS;
PERMISSIONS.ANDROID.PROCESS_OUTGOING_CALLS;
PERMISSIONS.ANDROID.READ_CALENDAR;
PERMISSIONS.ANDROID.READ_CALL_LOG;
PERMISSIONS.ANDROID.READ_CONTACTS;
PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
PERMISSIONS.ANDROID.READ_PHONE_NUMBERS;
PERMISSIONS.ANDROID.READ_PHONE_STATE;
PERMISSIONS.ANDROID.READ_SMS;
PERMISSIONS.ANDROID.RECEIVE_MMS;
PERMISSIONS.ANDROID.RECEIVE_SMS;
PERMISSIONS.ANDROID.RECEIVE_WAP_PUSH;
PERMISSIONS.ANDROID.RECORD_AUDIO;
PERMISSIONS.ANDROID.SEND_SMS;
PERMISSIONS.ANDROID.USE_SIP;
PERMISSIONS.ANDROID.WRITE_CALENDAR;
PERMISSIONS.ANDROID.WRITE_CALL_LOG;
PERMISSIONS.ANDROID.WRITE_CONTACTS;
PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE;

// iOS permissions
PERMISSIONS.IOS.CALENDARS;
PERMISSIONS.IOS.CAMERA;
PERMISSIONS.IOS.LOCATION_ALWAYS;
PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
PERMISSIONS.IOS.MEDIA_LIBRARY;
PERMISSIONS.IOS.PHOTO_LIBRARY;
PERMISSIONS.IOS.MICROPHONE;
