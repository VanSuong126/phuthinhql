import React, {useState, useEffect} from 'react';
import {Animated, Text} from 'react-native';
import RNRestart from 'react-native-restart';
import NetInfo from '@react-native-community/netinfo';

import {Colors, Sizes} from '~theme';

const Network = () => {
  const opacity = new Animated.Value(0);
  const [isConnect, setStatusNetwork] = useState(true);
  const height = Sizes.tab;

  useEffect(() => {
    onChangeHeight();
  }, [isConnect]);

  useEffect(() => {
    NetInfo.addEventListener(async state => {
      console.log('Is network connected?', state.isConnected);
      const currentStatus = state.isConnected;

      if (currentStatus === isConnect) return;
      await setStatusNetwork(currentStatus);
      // Reload app when network is connect return
      if (currentStatus) {
        RNRestart.Restart();
      }
    });
  });

  const onChangeHeight = () => {
    Animated.timing(opacity, {
      toValue: isConnect ? 0 : height,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  return (
    <Animated.View style={[{height: opacity}, styles.container]}>
      <Text style={{textAlign: 'center', color: Colors.white}}>
        {'Mất kết nối internet'}
      </Text>
    </Animated.View>
  );
};

const styles = {
  container: {
    backgroundColor: Colors.dark,
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default Network;
