import {FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useTranslation} from 'react-i18next';
import Modal from 'react-native-modal';

import styles from './styles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import {Colors} from '~theme';
import {MyText, MyView} from '~components/MyStyles';
const Index = ({
  isVisible,
  onClose,
  onListOption,
  icon,
  data,
  limitSelect,
  minLimit,
  stylesModal,
}) => {
  const {t} = useTranslation();
  const [listApplyOption, setListApplyOption] = useState([]);

  useEffect(() => {
    setListApplyOption([]);
    const dataSelected = data.filter(option => option.selected);
    if (dataSelected.length > 0) {
      setListApplyOption(dataSelected);
    }
  }, [isVisible, data]);
  const handleApplyOption = () => {
    onListOption(listApplyOption);
    onClose();
  };
  const handleGetOption = item => {
    setListApplyOption(prevList => {
      if (limitSelect === 1) {
        return [item];
      }

      if (item.value === 'all') {
        if (prevList.some(option => option.value === 'all')) {
          return [];
        } else {
          return data;
        }
      } else {
        const itemExists = prevList.some(option => option.value === item.value);
        if (itemExists) {
          return prevList.filter(option => option.value !== item.value);
        } else {
          if (limitSelect && limitSelect === prevList.length) {
            return prevList;
          } else {
            if (prevList.some(option => option.value === 'all')) {
              return [item];
            } else {
              return [...prevList, item];
            }
          }
        }
      }
    });
  };
  const handleDelete = () => {
    if (listApplyOption.length === 0) {
    } else {
      setListApplyOption([]);
    }
  };

  const renderItem = ({item}) => (
    <MyView>
      {listApplyOption.some(
        option => option.value === item.value || option.value === 'all',
      ) ? (
        <Pressable
          onPress={() => handleGetOption(item)}
          style={[styles.itemContainer, styles.selectedItem]}>
          <MyView style={styles.selectedItemLeft}>
            {icon != null && (
              <Icon
                name={item.icon}
                color={Colors.semantics_Green_01}
                width="24"
                height="24"
              />
            )}
            <MyText style={[styles.txtOption, styles.txtSelected]}>
              {t(item.label)}
            </MyText>
          </MyView>
          <Icon name="tickBorderGreen" width="24" height="24" />
        </Pressable>
      ) : (
        <Pressable
          onPress={() => handleGetOption(item)}
          style={styles.itemContainer}>
          {icon != null && (
            <Icon
              name={item.icon}
              width="24"
              height="24"
              color={Colors.semantics_Black}
            />
          )}
          <MyText style={styles.txtOption}>{t(item.label)}</MyText>
        </Pressable>
      )}
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
        <MyView style={styles.listOption}>
          <FlatList
            data={data.sort((a, b) => a.value - b.value)}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            style={styles.listOption}
          />
        </MyView>
        <MyView style={styles.bottom}>
          {(limitSelect &&
            (minLimit
              ? minLimit <= listApplyOption.length &&
                listApplyOption.length <= limitSelect
              : limitSelect === listApplyOption.length)) ||
          limitSelect === -1 ? (
            <Button
              size="primary"
              onPress={() => handleApplyOption()}
              title={`${t('apply')} ${
                listApplyOption.length > 0
                  ? `(${listApplyOption.length} ${t('option')} )`
                  : ''
              }`}
            />
          ) : null}
        </MyView>
      </MyView>
    </Modal>
  );
};

export default Index;
