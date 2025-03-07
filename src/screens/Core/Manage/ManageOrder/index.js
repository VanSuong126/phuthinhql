import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { MySafeAreaView, MyView } from '~components/MyStyles';
import TabControl from '~components/TabControl'; 
import HeaderToolBar from '~components/headers/HeaderToolBar';
import HandleOrder from './HandleOrder';
import ToolHandleOrder from './ToolHandleOrder';

const Index = () => {
    const { t } = useTranslation();
    const [index, setIndex] = useState(0);

    return (
        <MySafeAreaView style={styles.container}>
             <HeaderToolBar nameHeaderTitle={t('orderManagement')} />
            <TabControl
                tabs={[t('hanldeOrder'), t('tool')]}
                selectedIndex={index}
                onTabPress={setIndex}
            />
            <MyView style={styles.content}>
                {index === 0 ? <HandleOrder /> : <ToolHandleOrder />}
            </MyView>
        </MySafeAreaView>
    );
};

export default Index;

import {
    Sizes,
    Colors,
    parseSizeHeight,
    parseSizeWidth,
    Width,
} from '~theme';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap:parseSizeHeight(24),
    },
    content: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});
