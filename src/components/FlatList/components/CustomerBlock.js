import {StyleSheet, Pressable} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import {MyView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import Icon from '~components/IconXML';
import Line from '~components/Line';
import formatPrice from '~helper/formatPrice';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

const Index = ({data, index, onPress, isSelected}) => {
  const {t} = useTranslation();

  return (
    <MyView style={styles.boxOrder} key={index}>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <MyText style={styles.textName}>
            {data?.Ho} {data?.Ten}
          </MyText>
        </MyView>
      </MyView>
      <Line
        type="solid"
        thickness={2}
        color={Colors.neutrals_300}
        width="100%"
      />
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="phone" width="18" height="18" />
          <MyText style={styles.textInfo}>{data?.DienThoai}</MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon name="birthday" width="18" height="18" />
          <MyText style={styles.textInfo}>
            {data?.NgaySinhNhat
              ? moment(data?.NgaySinhNhat).format('DD/MM/YYYY')
              : t('notUpdateYet')}
          </MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="cost" width="18" height="18" />
          <MyText style={styles.textInfo}>
            {formatPrice(data?.TongDoanhThuDenHienTai)}đ
          </MyText>
        </MyView>
        <MyView style={styles.wrapInfo}>
          <Icon name="old" width="18" height="18" />
          <MyText style={styles.textInfo}>
            {data?.NgaySinhNhat
              ? moment().diff(
                  moment(data?.NgaySinhNhat, 'YYYY-MM-DD'),
                  'years',
                ) +
                ' ' +
                t('age')
              : t('notUpdateYet')}
          </MyText>
        </MyView>
      </MyView>
      <MyView style={styles.wrapRow}>
        <MyView style={styles.wrapInfo}>
          <Icon name="gmail" width="18" height="18" />
          <MyText style={styles.textInfo}>
            {data?.Email ? data?.Email : t('notUpdateYet')}
          </MyText>
        </MyView>
      </MyView>
      <MyView style={styles.bottom_RightBox}>
        {data?.TrangThai === 'ACTIVE' ? (
          <MyTouchableOpacity
            style={styles.btnBlock}
            onPress={() => isSelected(data)}>
            <MyText style={styles.textBlock}>{t('lock')}</MyText>
          </MyTouchableOpacity>
        ) : (
          <MyTouchableOpacity
            style={styles.btnUnBlock}
            onPress={() => isSelected(data)}>
            <MyText style={styles.textUnBlock}>{t('unlock')}</MyText>
          </MyTouchableOpacity>
        )}
        <MyTouchableOpacity onPress={() => onPress(data)} style={styles.btn}>
          <MyText style={styles.textButton}>{t('edit')}</MyText>
        </MyTouchableOpacity>
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  boxOrder: {
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(15),
    marginVertical: parseSizeHeight(8),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    borderRadius: 12,
    gap: parseSizeHeight(16),
    backgroundColor: Colors.neutrals_50,
  },
  wrapRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(8),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    flexWrap: 'wrap',

    textAlign: 'left',
    color: Colors.neutrals_700,
  },
  textName: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    flexWrap: 'wrap',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  bottom_RightBox: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  wrapViewInfo: {
    backgroundColor: Colors.semantics_Yellow_03,
    paddingHorizontal: parseSizeHeight(16),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  btn: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.semantics_Green_03,
    paddingHorizontal: parseSizeHeight(15),
    paddingVertical: parseSizeWidth(5),
    borderRadius: 20,
  },
  btnBlock: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.semantics_Red_03,
    paddingHorizontal: parseSizeHeight(15),
    paddingVertical: parseSizeWidth(5),
    borderRadius: 20,
  },
  textBlock: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_subtitle2,
    color: Colors.semantics_Red_01,
  },
  btnUnBlock: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.neutrals_200,
    paddingHorizontal: parseSizeHeight(15),
    paddingVertical: parseSizeWidth(5),
    borderRadius: 20,
  },
  textUnBlock: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_subtitle2,
    color: Colors.neutrals_700,
  },
  textButton: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_subtitle2,
    color: Colors.semantics_Green_01,
  },
  wrapStatus: {
    backgroundColor: Colors.semantics_Green_03,
    paddingHorizontal: parseSizeHeight(10),
    paddingVertical: parseSizeWidth(8),
    borderRadius: 20,
  },
  textStatus: {
    fontFamily: FontStyles.InterRegular,
    textAlign: 'center',
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Green_01,
  },
});
