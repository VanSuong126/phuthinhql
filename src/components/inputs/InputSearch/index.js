import React, {useState} from 'react';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';

import Icon from '~components/IconXML';
import styles from './styles';
import {Colors} from '~theme';
import SpeechToText from '~components/SpeechToText';
import {
  MyTextInput,
  MyTouchableOpacity,
  MyView,
  MySafeAreaView,
} from '~components/MyStyles';
import ScanQRCode from '~components/ScanQR';

const Index = props => {
  const {
    value,
    placeholder = null,
    styleInputSearch,
    type,
    onSearch,
    getString,
  } = props;
  const navigation = useNavigation();
  const [isListening, setIsListening] = useState(false);
  const [activeScan, setActiveScan] = useState(false);

  const handleScanQRCode = value => {
    setActiveScan(false);
    getString(value);
  };

  const handleOpenScan = () => {
    if (type === 'wareHouse') {
      navigation.navigate('quet-ma');
    } else {
      setActiveScan(true);
    }
  };
  return (
    <MySafeAreaView style={styleInputSearch || styles.container}>
      <MyView
        style={[
          styles.wrapInputSearch,
          type && styles.wrapInputSearchSecondary,
        ]}>
        {!isListening ? (
          <MyView style={styles.InputOffMic}>
            <MyTouchableOpacity onPress={onSearch}>
              <Icon
                name="search"
                style={styles.searchIcon}
                width="24"
                height="24"
              />
            </MyTouchableOpacity>
            <MyTextInput
              value={value}
              onChangeText={getString}
              onSubmitEditing={onSearch}
              style={styles.InputSearch}
              returnKeyType={'search'}
              placeholderTextColor={Colors.neutrals_700}
              placeholder={placeholder}
            />
          </MyView>
        ) : (
          <MyView style={styles.InputOnMic}>
            <FastImage
              source={require('~assets/images/gif/soundMic.gif')}
              resizeMode={FastImage.resizeMode.cover}
              style={styles.gif}
            />
          </MyView>
        )}
        {value === '' ? (
          <SpeechToText
            getSpeechResults={value => getString(value)}
            onSpeech={value => setIsListening(value)}
            styleSpeech={styles.speechToText}
          />
        ) : (
          <Pressable onPress={() => getString('')}>
            <Icon name="undo" width="24" height="24" />
          </Pressable>
        )}
      </MyView>

      {type && (
        <Pressable style={styles.iconScan} onPress={() => handleOpenScan()}>
          <Icon name="scan" width="24" height="24" />
        </Pressable>
      )}
      <ScanQRCode
        typeData={0}
        visible={activeScan}
        isActive={activeScan}
        handleScan={value => handleScanQRCode(value)}
      />
    </MySafeAreaView>
  );
};

export default Index;
