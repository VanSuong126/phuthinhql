import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment';


import { MyView,MyText } from '~components/MyStyles';
import { parseSizeHeight, FontStyles, Colors, Sizes } from '~theme';
import InputText from '~inputs/InputText';
import Gender from '~components/Gender';
import DatePicker from '~inputs/InputPicker/DatePicker';


const Index = ({ data, onChange }) => {
  const { t } = useTranslation();

  const handleChange = (field) => (value) => {
    // Tạo một bản sao của `data` và xóa lỗi của trường tương ứng
    const updatedData = {
      ...data,
      [field]: value,
      [`${field}Error`]: '' // Xóa lỗi của trường khi có sự thay đổi
    };
    onChange(updatedData);
  };

  return (
    <MyView style={styles.rls_container}>
      <MyView style={styles.rls_content}>
        <MyView style={styles.rls_body}>
          <InputText
            value={data?.HoTen}
            maxLength={50}
            styleContainer={styles.rls_input}
            onChangeText={handleChange('HoTen')}
            labelName={t('fullName')}
            contentError={data?.HoTenError}
          />
          <InputText
            value={data?.MoiQuanHe}
            maxLength={10}
            styleContainer={styles.rls_input}
            onChangeText={handleChange('MoiQuanHe')}
            labelName={t('relationship')}
            contentError={data?.MoiQuanHeError}
          />
          <DatePicker
            labelName={t('dateOfBirth')}
            styleContainer={styles.rls_input}
            value={data?.NgaySinh}
            getValue={handleChange('NgaySinh')}
          />
          {data?.NgaySinhError && (
            <MyText style={styles.txtError}>
              {'* '}
              {data?.NgaySinhError}
            </MyText>
          )}
          <Gender
            value={data?.GioiTinh ===undefined ? -1 : data?.GioiTinh}
            onSelect={handleChange('GioiTinh')}
          />
          <InputText
            value={data?.GhiChu}
            styleContainer={styles.rls_input}
            onChangeText={handleChange('GhiChu')}
            labelName={t('noteRecipient')}
          />
        </MyView>
      </MyView>
    </MyView>
  );
};

export default Index;

const styles = StyleSheet.create({
  rls_container: {
    flex: 1,
    backgroundColor: Colors.neutrals_100,
  },
  rls_content: {
    flex: 1,
    paddingHorizontal: Sizes.paddingWidth,
    marginVertical: parseSizeHeight(16),
  },
  rls_input: {
    margin: 0,
  },
  rls_body: {
    flex: 1,
    backgroundColor: Colors.neutrals_100,
    gap: parseSizeHeight(16),
  },
  txtError: {
    paddingTop: parseSizeHeight(5),
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline2,
    fontWeight: '400',
    color: Colors.semantics_Red_02,
  },
});
