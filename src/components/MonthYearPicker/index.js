import {FlatList, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';
import moment from 'moment';

import styles from './styles';
import Icon from '~components/IconXML';
import {MyText, MyView} from '~components/MyStyles';

const monthNames = t => [
  t('jan'),
  t('feb'),
  t('mar'),
  t('apr'),
  t('may'),
  t('jun'),
  t('jul'),
  t('aug'),
  t('sep'),
  t('oct'),
  t('nov'),
  t('dec'),
];

const Index = ({
  isVisible,
  onClose,
  icon,
  stylesModal,
  minYear = 1990,
  maxYear = 2030,
  typePicker = 'month',
  getMonthYear,
}) => {
  const {t} = useTranslation();
  const translateMonth = monthNames(t);
  const data =
    typePicker === 'year'
      ? Array.from({length: maxYear - minYear + 1}, (_, i) => ({
          year: minYear + i,
          label: `${minYear + i}`,
        }))
      : Array.from({length: 12}, (_, i) => ({
          month: i + 1,
          label: `${translateMonth[i]}`,
        }));

  const nowYear = Number(moment().format('YYYY'));
  const [year, setYear] = useState(nowYear);

  const handleYearChange = value => {
    if (value >= minYear && value <= maxYear) {
      setYear(value);
    }
  };

  const handleGetDate = item => {
    if (typePicker === 'month') {
      const selectedDate = moment(`${year}-${item.month}`, 'YYYY-M');
      const formattedDate = selectedDate.format('YYYY-MM');

      getMonthYear(formattedDate);
    }
    if (typePicker === 'year') {
      const selectedDate = moment(`${item.year}`, 'YYYY');
      const formattedDate = selectedDate.format('YYYY');

      getMonthYear(formattedDate);
    }
    onClose();
  };
  const handleDelete = () => {
    setYear(nowYear);
  };

  const renderItem = ({item}) => (
    <MyView>
      <TouchableOpacity
        onPress={() => handleGetDate(item)}
        style={styles.itemContainer}>
        {icon != null && <Icon name={item.icon} width="24" height="24" />}
        <MyText style={styles.txtOption}>{item.label}</MyText>
      </TouchableOpacity>
    </MyView>
  );

  return (
    <Modal
      onBackdropPress={onClose}
      visible={isVisible}
      transparent={true}
      animationType="slide"
      style={styles.modal}>
      <MyView style={[styles.modalContent, stylesModal]}>
        <MyView style={styles.undo}>
          <Pressable onPress={() => handleDelete()}>
            <MyText style={styles.txtUndo}>{t('undo')}</MyText>
          </Pressable>
          <Pressable onPress={() => onClose()}>
            <Icon name="undo" width="24" height="24" />
          </Pressable>
        </MyView>
        {typePicker === 'month' && (
          <MyView style={styles.chosseYear}>
            <MyView style={styles.boxBtnHeader}>
              <TouchableOpacity
                onPress={() => handleYearChange(year - 2)}
                style={styles.btnHeader}>
                <Icon name="doubleLeftArrow" width="18" height="18" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleYearChange(year - 1)}
                style={styles.btnHeader}>
                <Icon name="leftArrow" width="18" height="18" />
              </TouchableOpacity>
            </MyView>
            <MyText style={styles.txtYear}>{year}</MyText>
            <MyView style={styles.boxBtnHeader}>
              <TouchableOpacity
                onPress={() => handleYearChange(year + 1)}
                style={styles.btnHeader}>
                <Icon name="rightArrow" width="18" height="18" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => handleYearChange(year + 2)}
                style={styles.btnHeader}>
                <Icon name="doubleRightArrow" width="18" height="18" />
              </TouchableOpacity>
            </MyView>
          </MyView>
        )}
        <MyView style={styles.listOption}>
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.listOption}
          />
        </MyView>
      </MyView>
    </Modal>
  );
};

export default Index;
