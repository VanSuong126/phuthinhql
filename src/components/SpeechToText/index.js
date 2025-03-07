import React, {useState, useEffect, useRef} from 'react';
import {TouchableOpacity, Platform, Linking} from 'react-native';
import Voice from '@react-native-voice/voice';
import {useTranslation} from 'react-i18next';

import ModalConfirm from '~modals/ModalConfirm';
import Icon from '~components/IconXML';
import {checkPermission} from '~helper/permission';
import Toast from 'react-native-toast-message';
import {MyView} from '~components/MyStyles';
const Index = ({onSpeech, getSpeechResults, styleSpeech}) => {
  const [isListening, setIsListening] = useState(false);
  const [modalNotifi, setModalNotifi] = useState(false);
  const {t} = useTranslation();
  const speechTimeoutRef = useRef(null);
  const textListen = useRef('');

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = onSpeechError;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
      if (speechTimeoutRef.current) {
        clearTimeout(speechTimeoutRef.current);
      }
    };
  }, []);

  const onSpeechStart = event => {
    console.log('Start Recording...:', event);
  };

  const onSpeechEnd = event => {
    console.log('Stop Recording...:', event);
    setIsListening(false);
    // Đẩy giá trị textListen ra ngoài
    getSpeechResults(textListen.current); // Lấy giá trị từ ref
    onSpeech(false);
  };

  const onSpeechResults = event => {
    console.log('onSpeechResults...:', event);
    let text = event.value[0];
    if (text) {
      clearTimeout(speechTimeoutRef.current);
      textListen.current = text; // Cập nhật giá trị ref với chuỗi văn bản
      if (Platform.OS === 'android') {
        getSpeechResults(textListen.current);
      }
    } else {
      stopListening();
    }
  };

  const onSpeechError = error => {
    console.log('onSpeechError: ', error);
    setIsListening(false);
    clearTimeout(speechTimeoutRef.current);
    onSpeech(false);
  };

  const startListening = async () => {
    textListen.current = ''; // Reset lại giá trị ref khi bắt đầu lắng nghe
      const permissionAudio = await checkPermission('audio');
      if (!permissionAudio) {
        Toast.show({
          type: 'error',
          props: {
            message:
              'Bạn chưa cấp quyền Record audio để chạy chức năng chuyển giọng nói thành text',
          },
        });
        return;
      }
    try {
      setIsListening(true);
      onSpeech(true);
      await Voice.start('vi-VN');

      // Thiết lập thời gian chờ 3 giây
      speechTimeoutRef.current = setTimeout(() => {
        if (isListening) {
          stopListening();
        }
      }, 10000);

      setTimeout(() => {
        stopListening();
      }, 5000);
    } catch (error) {
      console.log('Start listening error: ', error);
      setIsListening(false);
      onSpeech(false);
    }
  };

  const stopListening = async () => {
    try {
      await Voice.stop();
      setIsListening(false);
      onSpeech(false);
    } catch (error) {
      console.log('Stop listening error: ', error);
    }
  };

  const handleCLickSetting = () => {
    if (Platform.OS === 'android') {
      Linking.openSettings();
      setModalNotifi(false);
    } else {
      Linking.openURL('app-settings');
      setModalNotifi(false);
    }
  };

  return (
    <MyView>
      <TouchableOpacity
        style={styleSpeech}
        onPress={() => (isListening ? stopListening() : startListening())}>
        <Icon
          name={isListening ? 'microphoneLinear' : 'microphone'}
          width="24"
          height="24"
        />
      </TouchableOpacity>
      <ModalConfirm
        isVisible={modalNotifi}
        onClose={() => setModalNotifi(false)}
        title={t('notification')}
        content={t('warningPermission')}
        onConfirm={handleCLickSetting}
      />
    </MyView>
  );
};

export default Index;
