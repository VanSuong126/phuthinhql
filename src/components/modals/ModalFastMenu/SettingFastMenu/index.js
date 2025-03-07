import {TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';

import LocalDB from '~data/asyncStorage';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Button from '~buttons/MyButton';
import Icon from '~components/IconXML';
import ModalWarning from '~modals/ModalWarning';
import {
  MyAvoidView,
  MyTextInput,
  MySafeAreaView,
  MyView,
  MyText,
} from '~components/MyStyles';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  Width,
} from '~theme';

const Index = props => {
  const {isVisible, onClose} = props;
  const navigation = useNavigation();
  const {t} = useTranslation();
  const [dataFavMenu, setDataFavMenu] = useState([]);
  const [dataList, setDataList] = useState([]);
  const [dataOrigin, setDataOrigin] = useState([]);
  const [modalvisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState('');
  const lastItemFavMenu = dataFavMenu.length - 1;

  const filteredData = useMemo(() => {
    return dataList.filter(item =>
      item.label.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, dataList]);
  const lastItemListMenu = filteredData.length - 1;

  const handleDelete = value => {
    const checkValue = dataFavMenu.find(item => item.value === value);

    if (checkValue) {
      const updatedItem = {
        icon: checkValue.icon,
        label: checkValue.label,
        selected: false,
        value: checkValue.value,
      };

      setDataFavMenu(prevFavMenu =>
        prevFavMenu.filter(item => item.value !== value),
      );
      setDataList(prevList => [...prevList, updatedItem]);
    }
  };
  const handleAddItem = value => {
    const checkValue = dataList.find(item => item.value === value);
    if (dataFavMenu.length < 4) {
      if (checkValue) {
        const updatedItem = {
          icon: checkValue.icon,
          label: checkValue.label,
          selected: true,
          value: checkValue.value,
        };

        setDataList(prevFavMenu =>
          prevFavMenu.filter(item => item.value !== value),
        );
        setDataFavMenu(prevList => [...prevList, updatedItem]);
      }
    } else {
      setModalVisible(true);
    }
  };

  const handleApply = () => {
    if (dataFavMenu.length === 4) {
      const updatedData = {
        ...dataOrigin,
        Permissions: dataOrigin?.Permissions.map(item => {
          const match = dataFavMenu.find(
            existItem => existItem.value === item.IdchuyenMuc,
          );

          return {...item, IsFastMenu: match ? match.selected : false};
        }),
      };
      LocalDB.setUserData(updatedData);
      onClose();
    } else {
      setModalVisible(true);
    }
  };
  const renderButton = (style, value) => {
    const label = dataFavMenu[value]?.label || '';
    const icon = dataFavMenu[value]?.icon || null;
    let stylesItem, stylesInto;
    switch (style) {
      case 'top':
        stylesItem = styles.itemTop;
        stylesInto = styles.intoTop;
        break;
      case 'bottom':
        stylesItem = styles.itemBottom;
        stylesInto = styles.intoBottom;
        break;
      case 'left':
        stylesItem = styles.itemLeft;
        stylesInto = styles.intoLeft;
        break;
      case 'right':
        stylesItem = styles.itemRight;
        stylesInto = styles.intoRight;
        break;
      default:
        stylesItem = {};
        stylesInto = {};
    }
    return (
      <MyView style={stylesItem}>
        <MyView style={[styles.intoItem, stylesInto]}>
          {icon && (
            <Icon
              name={icon}
              width="30"
              height="30"
              color={Colors.semantics_Green_01}
            />
          )}
          <MyText numberOfLines={2} ellipsizeMode="tail" style={styles.txtMenu}>
            {label}
          </MyText>
        </MyView>
      </MyView>
    );
  };

  useEffect(() => {
    LocalDB.getUserData().then(data => {
      if (data) {
        const transformedLicenses = data?.Permissions.map(item => ({
          value: item.IdchuyenMuc,
          label: item.TenChuyenMuc,
          icon: 'chuyenmuc' + item?.IdchuyenMuc,
          selected: item.IsFastMenu,
        }));
        setDataList(
          transformedLicenses.filter(item => item.selected === false),
        );
        setDataFavMenu(
          transformedLicenses.filter(item => item.selected === true),
        );
        setDataOrigin(data);
      }
    });
  }, []);

  return (
    <Modal
      visible={isVisible}
      transparent={true}
      animationType="fade"
      style={styles.modal}>
      <MySafeAreaView style={styles.container}>
        <HeaderToolBar
          containerStyle={styles.header}
          nameHeaderTitle={t('featureArange')}
          onPressBack={() => onClose()}
        />
        <MyAvoidView>
          <MyView style={styles.boddy}>
            <MyView style={styles.menu}>
              <MyView style={styles.itemTop_Bottom}>
                {renderButton('top', 0)}
                {renderButton('right', 1)}
              </MyView>
              <MyView style={styles.itemTop_Bottom}>
                {renderButton('left', 2)}
                {renderButton('bottom', 3)}
              </MyView>
              <MyView style={styles.scanCircle}>
                <Icon
                  name="scan"
                  width="30"
                  height="30"
                  color={Colors.semantics_Black}
                />
              </MyView>
            </MyView>
            <MyView style={styles.choseFuntion}>
              <MyView style={styles.wrapFavFuntion}>
                <MyText style={styles.txtTitle}>{t('featureFAV')}</MyText>
                <MyView style={styles.boxFuntion}>
                  {dataFavMenu.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.itemFuntion,
                          index === lastItemFavMenu && styles.itemLastFuntion,
                        ]}>
                        <Icon
                          name={item?.icon}
                          width="24"
                          height="24"
                          color={Colors.semantics_Black}
                        />
                        <MyText style={styles.txtContent}>{item?.label}</MyText>
                        <TouchableOpacity
                          onPress={() => handleDelete(item?.value)}>
                          <Icon name="closeRed" width="24" height="24" />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </MyView>
              </MyView>
              <MyView style={styles.wrapFuntion}>
                <MyText style={styles.txtTitle}>{t('featureList')}</MyText>
                <MyView style={styles.input}>
                  <MyAvoidView>
                    <MyTextInput
                      value={search}
                      style={styles.textInput}
                      placeholder={t('searchFeature')}
                      placeholderTextColor={Colors.neutrals_700}
                      onChangeText={value => setSearch(value)}
                    />
                  </MyAvoidView>
                  <Icon name="search" width="24" height="24" />
                </MyView>

                <MyView style={styles.boxFuntion}>
                  {filteredData.map((item, index) => {
                    return (
                      <View
                        key={index}
                        style={[
                          styles.itemFuntion,
                          index === lastItemListMenu && styles.itemLastFuntion,
                        ]}>
                        <Icon
                          name={item?.icon}
                          width="24"
                          height="24"
                          color={Colors.semantics_Black}
                        />
                        <MyText style={styles.txtContent}>{item?.label}</MyText>
                        <TouchableOpacity
                          onPress={() => handleAddItem(item.value)}>
                          <Icon name="plusBGGreen" width="24" height="24" />
                        </TouchableOpacity>
                      </View>
                    );
                  })}
                </MyView>
              </MyView>
            </MyView>
          </MyView>
        </MyAvoidView>
        <MyView style={styles.bottom}>
          <Button
            size={'primary'}
            type="2"
            title={t('apply')}
            onPress={() => handleApply()}
          />
        </MyView>
        <ModalWarning
          isVisible={modalvisible}
          onClose={() => setModalVisible(false)}
          textButton={t('close')}
          title={t('notification')}
          content={t('warning')}
          onPress={() => setModalVisible(false)}
        />
      </MySafeAreaView>
    </Modal>
  );
};

export default Index;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0,0.35)',
  },
  container: {
    margin: 0,
    flex: 1,
  },
  header: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing_4_Width,
  },
  boddy: {
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: Sizes.paddingHeight,
    alignItems: 'center',
    gap: Sizes.paddingHeight,
  },
  bottom: {
    height: parseSizeHeight(104),
    width: Width,
    backgroundColor: Colors.neutrals_100,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    elevation: 5,
    borderTopLeftRadius: Sizes.spacing_5_Width,
    borderTopRightRadius: Sizes.spacing_5_Width,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },

  txtMenu: {
    width: parseSizeWidth(70),
    fontSize: Sizes.text_tagline1,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.brand_01,
    fontFamily: FontStyles.InterSemiBold,
  },
  itemBottom: {
    flex: 0.5,
    borderWidth: 0.5,
    overflow: 'hidden',
    borderColor: Colors.neutrals_300,
    borderBottomRightRadius: 172,
    justifyContent: 'center',
  },
  itemLeft: {
    flex: 0.5,
    borderWidth: 0.5,
    overflow: 'hidden',
    borderColor: Colors.neutrals_300,
    borderBottomLeftRadius: 172,
    justifyContent: 'center',
  },
  itemRight: {
    flex: 0.5,
    borderWidth: 0.5,
    overflow: 'hidden',
    borderColor: Colors.neutrals_300,
    borderTopRightRadius: 172,
    justifyContent: 'center',
  },
  itemTop: {
    flex: 0.5,
    borderWidth: 0.5,
    overflow: 'hidden',
    borderColor: Colors.neutrals_300,
    borderTopLeftRadius: 172,
    justifyContent: 'center',
  },
  itemTop_Bottom: {
    flexDirection: 'row',
    flex: 0.5,
  },
  menu: {
    width: 278,
    height: 278,
    borderRadius: 172,
    backgroundColor: Colors.neutrals_100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    transform: [{rotate: '45deg'}],
  },
  intoItem: {
    transform: [{rotate: '-45deg'}],
    justifyContent: 'center',
    alignItems: 'center',
    gap: parseSizeHeight(15),
    flex: 1,
  },
  intoBottom: {
    paddingBottom: parseSizeHeight(15),
  },
  intoTop: {
    paddingTop: parseSizeHeight(15),
  },
  intoLeft: {
    paddingLeft: parseSizeWidth(15),
  },
  intoRight: {
    paddingRight: parseSizeWidth(15),
  },
  scanCircle: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderWidth: 1,
    zIndex: 2,
    borderRadius: 70,
    borderColor: Colors.neutrals_300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.neutrals_100,
    transform: [{rotate: '-45deg'}],
  },
  choseFuntion: {
    paddingHorizontal: Sizes.paddingWidth,
    width: Width,
  },
  wrapFavFuntion: {
    gap: Sizes.spacing_4_Height,
    marginBottom: Sizes.paddingHeight,
  },
  wrapFuntion: {
    marginBottom: parseSizeHeight(2),
    gap: Sizes.spacing_4_Height,
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  boxFuntion: {
    borderRadius: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: Sizes.spacing_3_Width,
    paddingVertical: parseSizeHeight(10),
    gap: Sizes.spacing_3_Height,
  },
  itemFuntion: {
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    paddingHorizontal: parseSizeWidth(10),
    paddingTop: parseSizeHeight(10),
    paddingBottom: parseSizeHeight(15),
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: parseSizeWidth(21),
    alignItems: 'center',
  },
  itemLastFuntion: {
    borderBottomWidth: 0,
  },
  txtContent: {
    fontFamily: FontStyles.InterMedium,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.neutrals_700,
    flex: 1,
  },
  input: {
    height: parseSizeHeight(48),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: parseSizeWidth(25),
    gap: Sizes.spacing_5_Width,
  },
  textInput: {
    flex: 1,
    height: parseSizeHeight(48),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.neutrals_700,
  },
});
