import React from 'react';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';
import moment from 'moment';

import Line from '~components/Line';
import {MyView, MyText, MyTouchableOpacity} from '~components/MyStyles';
import Icon from '~components/IconXML';
import {
  Colors,
  Sizes,
  parseSizeWidth,
  parseSizeHeight,
  parseSize,
  FontStyles,
} from '~theme';

const Index = props => {
  const {t} = useTranslation();
  const {
    onPressBlock,
    onPressChangePass,
    onPressUpdate,
    onPressUnBlock,
    data,
    type = 'active',
  } = props;

  return (
    <MyView style={styles.box}>
      <MyText style={styles.txtName}>{`${data?.ho} ${data?.ten}`}</MyText>
      <Line color={Colors.brand_02_tint70} />
      <MyView style={styles.horizontal}>
        <MyView style={styles.horizontal}>
          <Icon name="employee" width="18" height="18" />
          <MyText style={styles.txtGreyLeft}>{data?.vaiTro}</MyText>
        </MyView>
        <MyView style={styles.horizontal}>
          <Icon name="card" width="18" height="18" />
          <MyText style={styles.txtGreyRight}>{data?.cmnd}</MyText>
        </MyView>
      </MyView>
      <MyView style={styles.horizontal}>
        <MyView style={styles.horizontal}>
          <Icon name="phone" width="18" height="18" />
          <MyText style={styles.txtGreyLeft}>{data?.soDienThoai}</MyText>
        </MyView>
        <MyView style={styles.horizontal}>
          <Icon name="birthday" width="18" height="18" />
          <MyText style={styles.txtGreyRight}>
            {moment(data?.ngaySinhNhat).format('DD/MM/YYYY')}
          </MyText>
        </MyView>
      </MyView>
      <MyView style={styles.gmail}>
        <Icon name="gmail" width="18" height="18" />
        <MyText style={styles.txtGrey}>{data?.email}</MyText>
      </MyView>
      {type === 'active' && (
        <MyView style={styles.horizontal}>
          <MyTouchableOpacity
            onPress={() => onPressBlock(data)}
            style={[styles.button, styles.block]}>
            <MyText style={[styles.txtButton, styles.txtBlock]}>
              {t('lock')}
            </MyText>
          </MyTouchableOpacity>
          <MyTouchableOpacity
            onPress={() => onPressChangePass(data)}
            style={[styles.button, styles.changePass]}>
            <MyText style={[styles.txtButton, styles.txtChangePass]}>
              {t('resetPassword')}
            </MyText>
          </MyTouchableOpacity>
          <MyTouchableOpacity
            onPress={() => onPressUpdate(data)}
            style={[styles.button, styles.update]}>
            <MyText style={[styles.txtButton, styles.txtUpdate]}>
              {t('edit')}
            </MyText>
          </MyTouchableOpacity>
        </MyView>
      )}
      {type === 'block' && (
        <MyView style={styles.horizontal}>
          <MyTouchableOpacity
            onPress={() => onPressUnBlock(data)}
            style={[styles.button, styles.unBlock]}>
            <MyText style={[styles.txtButton, styles.txtUnBlock]}>
              {t('unlock')}
            </MyText>
          </MyTouchableOpacity>
          <MyTouchableOpacity
            onPress={() => onPressUpdate(data)}
            style={[styles.button, styles.update]}>
            <MyText style={[styles.txtButton, styles.txtUpdate]}>
              {t('edit')}
            </MyText>
          </MyTouchableOpacity>
        </MyView>
      )}
    </MyView>
  );
};

const styles = StyleSheet.create({
  txtUnBlock: {
    color: Colors.neutrals_700,
  },
  unBlock: {
    backgroundColor: Colors.neutrals_200, 
  },
  txtUpdate: {
    color: Colors.neutrals_50,
  },
  update: {
    backgroundColor: Colors.semantics_green_01,
  },
  txtChangePass: {
    color: Colors.neutrals_50,
  },
  changePass: {
    backgroundColor: Colors.semantics_yellow_02, 
  },
  txtBlock: {
    color: Colors.neutrals_50,
  },
  block: {
    backgroundColor: Colors.semantics_Red_01,
  },
  txtButton: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
  },
  button: {
    paddingHorizontal: parseSizeWidth(17),
    paddingVertical: parseSizeHeight(5),
    alignItems: 'center',
    borderRadius: 100,
  },
  gmail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtGreyRight: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginLeft: parseSizeWidth(10),
    width: parseSizeWidth(100),
  },
  txtGreyLeft: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginLeft: parseSizeWidth(10),
    width: parseSizeWidth(120),
  },
  txtGrey: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginLeft: parseSizeWidth(10),
  },
  txtName: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  box: {
    borderRadius: parseSize(12),
    backgroundColor: Colors.brand_02_tint90,
    borderWidth: 1,
    borderColor: Colors.brand_02_tint70,
    padding: parseSize(16),
    gap: Sizes.spacing_3_Height,
  },
  tabControl: {
    marginBottom: Sizes.spacing_3_Height,
  },
  list: {
    gap: Sizes.spacing_4_Height,
  },
});
export default Index;
