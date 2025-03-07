import {StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Toast from 'react-native-toast-message';

import FastMenu from '~screens/Core/FastMenu';
import HeaderMain from '~components/headers/HeaderMain';
import {
  MyScrollView,
  MySafeAreaView,
  MyTouchableOpacity,
  MyText,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Icon from '~components/IconXML';
import ModalItemSelector from '~modals/ModalItemSelector';

const Index = () => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [modalItemSelector, setModalItemSelector] = useState(false);

  const dataMenu = [
    {
      value: 'quan-tri-khach-hang',
      title: t('manageCustomer'),
      nameIcon: 'customer',
      widthIcon: 30,
      heightIcon: 20,
    },
    {
      value: 'quan-tri-san-pham',
      title: t('manageProduct'),
      nameIcon: 'product',
      widthIcon: 30,
      heightIcon: 20,
    },
    {
      value: 'don-hang',
      title: t('manageOrder'),
      nameIcon: 'file',
      widthIcon: 30,
      heightIcon: 20,
    },
    {
      value: 'quan-tri-cua-hang',
      title: t('manageBranch'),
      nameIcon: 'location',
      widthIcon: 24,
      heightIcon: 24,
    },

    {
      value: 'quan-tri-nguoi-dung',
      title: t('manageEmployee'),
      nameIcon: 'employee',
      widthIcon: 30,
      heightIcon: 20,
    },
    {
      value: 'gui-thong-bao',
      title: t('sendNotifi'),
      nameIcon: 'bell',
      widthIcon: 30,
      heightIcon: 20,
    },
    {
      value: '',
      title: t('sendReview'),
      nameIcon: 'evaluate',
      widthIcon: 30,
      heightIcon: 20,
    },
    {
      value: 'quan-tri-khuyen-mai',
      title: t('createPromotion'),
      nameIcon: 'discount',
      widthIcon: 30,
      heightIcon: 20,
    },
  ];
  const dataNotifi = [
    {
      id: 1,
      label: t('sendToCustomerApp'),
      nameIcon: 'bell',
      navigate: 'tao-thong-bao',
    },
    {
      id: 2,
      label: t('sendtoCusomerEmail'),
      nameIcon: 'gmail',
      navigate: 'thong-bao-mail',
    },
    {
      id: 3,
      label: t('sendToZaloOA'),
      nameIcon: 'zalo',
      navigate: 'zalo-oa',
    },
  ];
  const handleSelectItem = item => {
    if (item?.value) {
      if (item.value === 'gui-thong-bao') {
        setModalItemSelector(true);
      } else {
        navigation.navigate(item?.value);
      }
    } else {
      Toast.show({
        type: 'warning',
        props: {message: t('featureNotYet')},
      });
    }
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderMain title={t('manage')} />
      <MyScrollView style={styles.content}>
        {/* Render dataMenu here */}
        {dataMenu.map((item, index) => (
          <MyTouchableOpacity
            key={index}
            style={[
              styles.wrapDropDown,
              {marginTop: index === 0 ? 0 : parseSizeHeight(24)},
            ]}
            onPress={() => handleSelectItem(item)}>
            <Icon
              name={item.nameIcon}
              width={item.widthIcon}
              height={item.heightIcon}
            />
            <MyText style={styles.textItem}>{item.title}</MyText>
            <Icon name="arrowRight" width="18" height="18" />
          </MyTouchableOpacity>
        ))}
      </MyScrollView>
      <ModalItemSelector
        isVisible={modalItemSelector}
        onClose={() => setModalItemSelector(false)}
        data={dataNotifi}
        onPress={item => {
          navigation.navigate(item?.navigate), setModalItemSelector(false);
        }}
      />
      <FastMenu />
    </MySafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: Sizes.paddingWidth,
    marginBottom: parseSizeHeight(40),
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
  },
  wrapDropDown: {
    height: parseSizeHeight(64),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.paddingWidth,
    borderColor: Colors.neutrals_300,
    borderRadius: 12,
    shadowColor: Colors.black,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#dddde3',
  },
  textItem: {
    flex: 1,
    marginLeft: parseSizeWidth(23),
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_subtitle1,
    color: Colors.neutrals_700,
  },
});
