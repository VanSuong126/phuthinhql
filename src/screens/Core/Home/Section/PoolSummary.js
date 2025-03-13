import React from 'react';
import { useTranslation } from 'react-i18next';
import { Image, StyleSheet } from 'react-native';
import { Colors, Sizes, parseSizeWidth } from '~theme';
import { MyView, MyText } from '~components/MyStyles';
import Line from '~components/Line';
import IconCheckMember from '~assets/images/pool/iconCheckMember.png';

export default function Index() {
   const { t } = useTranslation();
  return (
    <MyView style={styles.wrapCheckMember}>
      <MyView style={styles.wrapHeadCheck}>
        <MyView style={styles.wrapTitleHeadCheck}>
          <MyText style={styles.textTitleHeadCheck}>{t('poolSummary')}</MyText>
          <MyText style={styles.textNumberCustomer}>
            {10}{' '}
            <MyText style={styles.textUnit}>{t('customerSwimming')}</MyText>
          </MyText>
        </MyView>
        <MyView style={styles.wrapImageCheckMember}>
          <Image
            source={IconCheckMember}
            resizeMode="contain"
            style={styles.iconMemberCheck}
          />
        </MyView>
      </MyView>
      <Line
        type="dotted"
        thickness={2}
        color={Colors.brand_02_tint80}
        width="100%"
      />
      <MyView style={styles.wrapBodyCheckMember}>
        <MyView style={styles.itemCheckMember}>
          <MyView style={styles.wrapNumberMember}>
            <MyText style={styles.textNumberMember}>0</MyText>
            <MyView
              style={[
                styles.colorTypeMember,
                { backgroundColor: Colors.semantics_yellow_01 },
              ]}
            />
          </MyView>
          <MyView style={styles.wrapTypeMember}>
            <MyText style={styles.textTypeMember}>{t('classLearning')}</MyText>
          </MyView>
        </MyView>
        <MyView style={styles.itemCheckMember}>
          <MyView style={styles.wrapNumberMember}>
            <MyText style={styles.textNumberMember}>4</MyText>
            <MyView
              style={[
                styles.colorTypeMember,
                { backgroundColor: Colors.accent_system_02 },
              ]}
            />
          </MyView>
          <MyView style={styles.wrapTypeMember}>
            <MyText style={styles.textTypeMember}>
              {t('employeeActive')}
            </MyText>
          </MyView>
        </MyView>
        <MyView style={styles.itemCheckMember}>
          <MyView style={styles.wrapNumberMember}>
            <MyText style={styles.textNumberMember}>200</MyText>
            <MyView style={styles.colorTypeMember} />
          </MyView>
          <MyView style={styles.wrapTypeMember}>
            <MyText style={styles.textTypeMember}>{t('member')}</MyText>
          </MyView>
        </MyView>
      </MyView>
    </MyView>
  );
}

const styles = StyleSheet.create({
  wrapCheckMember: {
    backgroundColor: Colors.brand_02_tint80,
    gap: parseSizeWidth(14),
    paddingHorizontal: parseSizeWidth(16),
    paddingVertical: parseSizeWidth(12),
    borderRadius: parseSizeWidth(8),
  },
  wrapHeadCheck: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wrapTitleHeadCheck: {
    gap: parseSizeWidth(4),
  },
  textTitleHeadCheck: {
    fontSize: Sizes.text_h6,
    fontWeight: '600',
    color: Colors.brand_02_tint30,
  },
  textNumberCustomer: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_950,
  },
  textUnit: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.neutrals_800,
  },
  wrapImageCheckMember: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconMemberCheck: {
    height: parseSizeWidth(53),
    width: parseSizeWidth(50),
  },
  wrapBodyCheckMember: {
    flexDirection: 'row',
    gap: parseSizeWidth(16),
  },
  itemCheckMember: {
    flex: 0.33333,
    backgroundColor: Colors.background,
    paddingHorizontal: parseSizeWidth(7),
    paddingVertical: parseSizeWidth(6),
    borderRadius: parseSizeWidth(6),
    gap: parseSizeWidth(4),
  },
  wrapNumberMember: {
    flex:0.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textNumberMember: {
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_950,
  },
  colorTypeMember: {
    height: parseSizeWidth(10),
    width: parseSizeWidth(10),
    borderRadius: parseSizeWidth(8),
  },
  wrapTypeMember: {
    flex:0.8,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  textTypeMember: {
    fontSize: Sizes.text_tagline2,
    fontWeight: '500',
    color: Colors.neutrals_800,
  },
});
