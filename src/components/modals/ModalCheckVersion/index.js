import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, Platform,BackHandler, Linking} from 'react-native';
import Modal from 'react-native-modal';
import Toast from 'react-native-toast-message';

import {checkVersion} from 'react-native-check-version';

import {VERSION} from '@env';
import {Colors, Sizes, parseSize} from '~theme';
import Button from '~buttons/MyButton';

const Index = () => {
  const [visible, setVisible] = useState(false);
  const [urlUpdate, setUrlUpdate] = useState('');
  const [newVersion, setNewVersion] = useState('');
  //check version app
  useEffect(() => {
    const options = {
      platform: Platform.OS, // or 'android'
      country: 'vn', // App Store specific country
      bundleId:'vn.phuthinh.manager',
      currentVersion: VERSION, // Your app's current version
    };
    // Assuming checkVersion is an async function that returns a Promise
    checkVersion(options)
      .then(version => {
        console.log(version);
        if (version?.needsUpdate === true) {
            setUrlUpdate(version?.url);
            setNewVersion(version?.version);
            setVisible(true);
        }
      })
      .catch(error => {
        console.error('Error checking version:', error);
        Toast.show({
          type: 'error',
          props: {message: error},
        });
      });
  }, []);

  const handleConfirm =()=>{
    setVisible(false);
    if (Platform.OS === 'android') {
      BackHandler.exitApp();
    }
    Linking.openURL(urlUpdate).catch(err =>
        console.error('Không thể mở liên kết:', err),
      );
  }
  return (
      <Modal
        animationIn="zoomIn"
        animationOut="zoomOut"
        transparent={true}
        isVisible={visible}
        animationOutTiming={150}
        animationInTiming={250}
        backdropOpacity={0.3}>
        <View style={styles.modal}>
          <View style={styles.container}>
            <View style={styles.wrapContent}>
              <Text style={styles.textTitle}>Thông báo</Text>
              <View
                padding={Sizes.padding}
                paddingX={Sizes.padding * 2}
                alignItems="center">
                <Text style={styles.textContent}>
                  Ứng dụng đã phát hành phiên bản mới {newVersion}. Hãy cập nhật để có trải
                  nghiệm tốt hơn
                </Text>
              </View>
              <View
                style={[
                  styles.wrapBtn,
                  {justifyContent: 'space-between'},
                ]}>
                  <Button size="small" title={'Cập nhật'} onPress={handleConfirm} />
                  <Button size="small" title={'Để sau'} onPress={()=>{setVisible(false)}} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: Sizes.margin,
  },
  wrapContent: {
    width: '100%',
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Sizes.padding,
    borderRadius: Sizes.radius,
  },
  textTitle: {
    fontFamily: 'Hahmlet-Regular',
    fontWeight: 'bold',
    fontSize: 18,
    color: Colors.default,
  },
  wrapBtn: {
    flexDirection: 'row',
    width: '95%',
    alignItems: 'center',
  },
  btn: {
    width: '48%',
    height:parseSize(35),
  },
  textContent: {
    textAlign: 'center',
    fontFamily: 'Hahmlet-Regular',
    fontSize: 10,
    color: Colors.dark,
  },
});
