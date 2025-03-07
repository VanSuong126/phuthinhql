import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';

import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Icon from '~components/IconXML';
import {
  MyText,
  MyView,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import {TouchableOpacity} from 'react-native';
import {Colors} from '~theme';
import InputText from '~inputs/InputText';
import Button from '~buttons/MyButton';
import fetchData from '~providers';
import {parseSizeHeight} from '~theme';
const Index = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inforCustomer} = route.params || {};

  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  const [inputHeight, setInputHeight] = useState(60);

  const handleTitle = text => {
    const value = text.nativeEvent.text;
    setTitle(value);
  };

  const handleSendNotifi = () => {
    if (!title || !note) {
      // Hiển thị thông báo nếu title hoặc note rỗng
      Toast.show({
        type: 'error',
        props: {message: t('checkSend')},
      });
    } else if (!Array.isArray(inforCustomer) || inforCustomer.length === 0) {
      // Hiển thị thông báo nếu inforCustomer không hợp lệ
      Toast.show({
        type: 'error',
        props: {message: t('checkSelectCustomer')},
      });
    } else {
      const idsKhachHang = inforCustomer.map(c => c.idKhachHang);
      const params = {title: title, body: note, idsKhachHang: idsKhachHang};

      fetchData(dispatch, 'sendNotifiToCustomer', params, data => {
        const metadata = data?.data?.metadata;

        if (Array.isArray(metadata)) {
          // Lọc ra khách hàng có status === false
          const nameCustomer = inforCustomer.reduce((acc, customer) => {
            const isFalseStatus = metadata.some(
              item =>
                item.idKhachHang === customer.idKhachHang &&
                item.status === false,
            );

            if (isFalseStatus) {
              acc.push(customer.tenKhachHang);
            }
            return acc;
          }, []);

          // Hiển thị kết quả bằng Toast
          if (nameCustomer.length > 0) {
            Toast.show({
              type: 'error',
              props: {
                message: `${t('checkCustomerDontSend')}: ${nameCustomer.join(
                  ', ',
                )}`,
              },
            });
          } else {
            Toast.show({
              type: 'success',
              props: {message: t('sendSuccess')},
            });
          }
        }
      });
    }
  };

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('sendNotifi')} />
      <MyAvoidView>
        <MyView style={styles.body}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('chon-khach-hang', {
                screenBack: 'tao-thong-bao',
              })
            }
            style={styles.card}>
            <Icon
              color={Colors.semantics_Black}
              name="customerChose"
              width="24"
              height="24"
            />
            <MyText style={styles.txtCard}>
              {inforCustomer
                ? inforCustomer.length === 1
                  ? `${t('selected')}: ${inforCustomer[0]?.tenKhachHang}`
                  : `${t('selected')}: ${inforCustomer.length} ${t('customer')}`
                : t('chosseCustomner')}
            </MyText>
            <Icon
              color={Colors.semantics_Black}
              name="rightArrow"
              width="24"
              height="24"
            />
          </TouchableOpacity>
          <InputText
            labelName={t('title')}
            styleContainer={styles.inputText}
            onEndEditing={value => handleTitle(value)}
          />
          <MyView>
            <MyText style={styles.label}>{t('content')}</MyText>
            <TextInput
              value={note}
              onChangeText={setNote}
              multiline={true}
              onContentSizeChange={event =>
                setInputHeight(event.nativeEvent.contentSize.height)
              }
              style={[
                styles.textInputContent,
                {
                  height: Math.max(
                    parseSizeHeight(60),
                    parseSizeHeight(inputHeight),
                  ),
                },
              ]}
            />
          </MyView>
        </MyView>
      </MyAvoidView>
      <MyView style={styles.bottom}>
        <Button
          title={t('send')}
          size="primary"
          onPress={() => handleSendNotifi()}
        />
      </MyView>
    </MySafeAreaView>
  );
};

export default Index;
