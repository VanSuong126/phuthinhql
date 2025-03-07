import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import i18n from 'i18next';
import _ from 'lodash';

import { Colors } from '~theme';
import Network from '~components/Network';
import Navigation from '~navigator';
import ModalCheckVersion from '~components/modals/ModalCheckVersion';
import LocalDB from '~data/asyncStorage';
import { toastConfig } from '~helper/toastConfig';

const Index = () => {
  const [skipScreen, setSkipScreen] = useState('default');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Lấy giá trị skipScreen từ LocalDB
        const screen = await LocalDB.getSkipScreen();
        setSkipScreen(screen);

        // Lấy ngôn ngữ từ LocalDB và cập nhật i18n
        const language = await LocalDB.getLanguage();
        if (language) {
          i18n.changeLanguage(_.lowerCase(language));
        } else {
          i18n.changeLanguage(_.lowerCase('vi'));
          await LocalDB.setLanguage('vi');
        }
      } catch (error) {
        console.error('Error loading data', error);
      } finally {
        setIsLoading(false); 
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return null; 
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <Network />
      <Navigation skipScreen={skipScreen} />
      <Toast config={toastConfig} />
      <ModalCheckVersion />
    </SafeAreaView>
  );
};

export default Index;
