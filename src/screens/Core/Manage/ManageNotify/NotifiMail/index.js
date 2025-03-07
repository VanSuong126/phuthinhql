import React, {useEffect, useState, useRef} from 'react';
import {Pressable, TouchableOpacity} from 'react-native';
import {useTranslation} from 'react-i18next';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Toast from 'react-native-toast-message';
import ToggleSwitch from 'toggle-switch-react-native';
import {RichEditor} from 'react-native-pell-rich-editor';
import moment from 'moment';

import styles from './styles';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import Icon from '~components/IconXML';
import {
  MyText,
  MyView,
  MySafeAreaView,
  MyAvoidView,
} from '~components/MyStyles';
import InputText from '~inputs/InputText';
import Bottom from '~components/Bottom';
import fetchData from '~providers';
import {parseSizeHeight, Colors} from '~theme';
import ModalItemSelector from '~modals/ModalItemSelector';
import ModalViewMail from '~modals/ModalViewMail';

const Index = () => {
  const {t} = useTranslation();
  const route = useRoute();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inforCustomer} = route.params || {};

  const [note, setNote] = useState('');
  const [title, setTitle] = useState('');
  const [modalTypeNews, setModalTypeNews] = useState(false);
  const [modalViewMail, setModalViewMail] = useState(false);
  const [chooseType, setChooseType] = useState(false);
  const [typeNews, setTypeNews] = useState();
  const [formMails, setFormMails] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const richText = useRef(null);

  const replacePlaceholders = (html, inforCustomer) => {
    return html
      .replace(
        new RegExp(t('nameFill'), 'g'),
        inforCustomer?.tenKhachHang ?? '',
      )
      .replace(
        new RegExp(t('salutationFill'), 'g'),
        inforCustomer?.danhXung ?? '',
      )
      .replace(new RegExp(t('emailFill'), 'g'), inforCustomer?.email ?? '')
      .replace(
        new RegExp(t('birthdayFill'), 'g'),
        moment(inforCustomer?.ngaySinh).format('DD/MM/YYYY') ?? '',
      )
      .replace(
        new RegExp(t('phoneNumberFill'), 'g'),
        inforCustomer?.soDienThoai ?? '',
      )
      .replace(new RegExp(t('cardCodeFill'), 'g'), inforCustomer?.maThe ?? '');
  };

  const fetchFormMails = () => {
    fetchData(dispatch, 'getFormMails', {loai: 91}, data => {
      if (data.success === true) {
        const result = data?.data;
        setFormMails(
          result.map(item => ({
            id: item?.IDMailMau,
            label: item?.LoaiMail
              ? item?.LoaiMail.replace(/-/g, '')
              : item?.label,
            nameIcon: item?.LoaiMail ? item?.LoaiMail.replace(/-/g, '') : '',
            titleMail: item?.TieuDe,
            content: item?.NoiDung,
          })),
        );
      }
    });
  };

  const handleFormMails = item => {
    setTypeNews(item);
    setModalTypeNews(false);
    setNote(item?.content);
    setTitle(item?.titleMail);
    if (richText.current) {
      richText.current.setContentHTML(item?.content);
    }
  };

  const handleChosseType = isOn => {
    setChooseType(isOn);
    setNote('');
    setTitle('');
    if (richText.current) {
      richText.current.setContentHTML('');
    }
  };

  const sanitizeHTML = content => {
    // Loại bỏ các thẻ không hợp lệ như <font> và thay thế chúng bằng <span>
    content = content
      .replace(/<font.*?>/g, '<span>')
      .replace(/<\/font>/g, '</span>');

    // Loại bỏ các thẻ thừa hoặc trùng lặp
    content = content.replace(/style=".*?"/g, match => {
      // Kiểm tra style và lọc các thuộc tính dư thừa
      return match.replace(/font-family:.+?;/g, 'font-family: Verdana;');
    });

    return content;
  };

  const handleContentChange = content => {
    const sanitizedContent = sanitizeHTML(content);
    setNote(sanitizedContent);
  };

  const sendMail = inforCustomers => {
    if (inforCustomers && note && title) {
      const noEmailList = inforCustomers.filter(item => !item?.email); // Lọc những khách hàng không có email
      const customersWithEmail = inforCustomers.filter(item => item?.email); // Lấy những khách hàng có email

      // Hiển thị Toast nếu có khách hàng không có email
      if (noEmailList.length > 0) {
        const namesWithoutEmail = noEmailList
          .map(item => item?.tenKhachHang || 'Khách hàng không xác định')
          .join(', ');

        Toast.show({
          type: 'warning',
          props: {
            message: `${t('waringNoEmail')}: ${namesWithoutEmail}`,
          },
        });
      }

      // Gửi email cho các khách hàng có email
      if (customersWithEmail.length > 0) {
        customersWithEmail.forEach(user => {
          const params = {
            to: user?.email,
            // to: 'leducminh21203@gmail.com',
            title: `${title}`,
            body: `${replacePlaceholders(note, user)}`,
          };

          fetchData(dispatch, 'sendMailBooking', params, data => {
            if (noEmailList.length === 0) {
              if (data.success) {
                Toast.show({
                  type: 'success',
                  props: {message: t('sendSuccess')},
                });
              } else {
                Toast.show({
                  type: 'error',
                  props: {message: t('failureNotifi')},
                });
              }
            }
          });
        });
      }
    } else {
      Toast.show({
        type: 'warning',
        props: {
          message: !inforCustomers
            ? t('checkSelectCustomer')
            : (!title || !note) && t('notHaveTitle'),
        },
      });
    }
  };

  const handleDeleteNote = () => {
    setNote('');
    if (richText.current) {
      richText.current.setContentHTML('');
    }
  };
  useEffect(() => {
    if (formMails.length === 0) {
      fetchFormMails();
    }
  }, []);

  return (
    <MySafeAreaView style={styles.container}>
      <HeaderToolBar nameHeaderTitle={t('sendNotifi')} />
      <MyAvoidView>
        <MyView style={styles.body}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('chon-khach-hang', {
                screenBack: 'thong-bao-mail',
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
          <TouchableOpacity
            onPress={() => {
              chooseType === false && setModalTypeNews(true);
            }}
            style={styles.card}>
            <Icon
              color={Colors.semantics_Black}
              name="product"
              width="24"
              height="24"
            />
            <MyText style={styles.txtCard}>
              {t(typeNews ? typeNews?.label : 'selectPosttype')}
            </MyText>
            <Icon
              color={Colors.semantics_Black}
              name="rightArrow"
              width="24"
              height="24"
            />
          </TouchableOpacity>
          <MyView style={styles.toggle}>
            <ToggleSwitch
              isOn={chooseType}
              offColor={Colors.neutral_50}
              onToggle={handleChosseType}
              trackOnStyle={styles.onToggle}
              trackOffStyle={styles.offToggle}
              thumbOnStyle={styles.thumbStyle}
              thumbOffStyle={styles.thumbStyle}
            />
            <MyText style={styles.textToggle}>{t('createManually')}</MyText>
          </MyView>
          <InputText
            value={title}
            onChangeText={value => setTitle(value)}
            labelName={t('title')}
            styleContainer={styles.inputText}
          />
          <MyView style={styles.wrapInputNote}>
            <MyText style={styles.label}>{t('content')}</MyText>
            <RichEditor
              ref={richText}
              initialContentHTML={note}
              onChange={handleContentChange}
              style={[
                styles.richEditor,
                isFocused && {
                  borderColor: Colors.semantics_Green_02,
                  borderWidth: 1,
                },
              ]}
              initialHeight={parseSizeHeight(60)}
              editorStyle={styles.textNoteInput}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <MyText style={styles.textBlue}>
              (*) {t('autoFill')}: ({t('salutationFill')},{' '}
              {t('phoneNumberFill')}, {t('birthdayFill')}, {t('emailFill')},{' '}
              {t('nameFill')}, {t('cardCodeFill')})
            </MyText>
            {isFocused && note && (
              <TouchableOpacity
                style={styles.deleteNote}
                onPress={handleDeleteNote}>
                <Icon width="20" height="20" name="close" />
              </TouchableOpacity>
            )}
          </MyView>
        </MyView>
      </MyAvoidView>

      <MyView style={styles.bottom}>
        <Bottom
          titleBtn1={t('previewContent')}
          titleBtn2={t('send')}
          onPress1={() => setModalViewMail(true)}
          onPress2={() => sendMail(inforCustomer)}
          sticky={false}
        />
      </MyView>
      <ModalItemSelector
        isVisible={modalTypeNews}
        onClose={() => setModalTypeNews(false)}
        data={formMails}
        onPress={handleFormMails}
      />
      <ModalViewMail
        isVisible={modalViewMail}
        onClose={() => setModalViewMail(false)}
        note={replacePlaceholders(note, inforCustomer ? inforCustomer[0] : {})}
      />
    </MySafeAreaView>
  );
};

export default Index;
