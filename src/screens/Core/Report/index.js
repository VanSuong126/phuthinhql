import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';

import styles from './styles';
import HeaderMain from '~components/headers/HeaderMain';
import {MyView, MySafeAreaView} from '~components/MyStyles';
import TabControl from '~components/TabControl';
import FastMenu from '~screens/Core/FastMenu';
import TypeReport from './TypeReport';
import ReferenceReport from './ReferenceReport';
const Index = () => {
  const {t} = useTranslation();

  const [tabSelected, setTabSelected] = useState(0);

  const tabs = [t('type'), t('compare')];
  return (
    <MySafeAreaView style={styles.container}>
      <HeaderMain title={t('report')} />
      <TabControl
        tabs={tabs}
        selectedIndex={tabSelected}
        onTabPress={setTabSelected}
      />
      <MyView style={styles.body}>
        {tabSelected === 0 && <TypeReport />}
        {tabSelected === 1 && <ReferenceReport />}
      </MyView>
      <FastMenu />
    </MySafeAreaView>
  );
};

export default Index;
