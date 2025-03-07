import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { Pressable, StyleSheet } from 'react-native';
import {
  Sizes,
  Colors,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import { MyView, MyText } from '~components/MyStyles';
import Icon from '~components/IconXML';
import ModalLanguage from '~components/modals/ModalLanguage';
import { Languages } from '~data/languages';
import LocalDB from '~data/asyncStorage';
/**
 * Screen for user login
 */
export default function Index(props) {
  const {
    type = 'light',
  } = props;
  const { t } = useTranslation();
  const [visibleModalLanguage, setVisibleModalLanguage] = useState(false);
  const [language, setLanguage] = useState('');
  LocalDB.getLanguage().then(lng => setLanguage(lng));
  const [dataLanguage, setDataLanguage] = useState();
  useEffect(() => {
    const data = Languages.find(x => x.locale === language);
    setDataLanguage(data);
  }, [language]);

  return (
    <MyView
      style={[
        styles.container,
        type === 'dark' ? styles.containerDark : styles.containerLight 
      ]}
    >      
    <Pressable
      style={styles.wrapLanguage}
      onPress={() => setVisibleModalLanguage(true)}>
        {dataLanguage?.country_code && <Icon
          name={dataLanguage?.country_code}
          width={24}
          height={24}
        />}
        <MyText style={type === 'dark' ? styles.textLanguageDark : styles.textLanguageLight}>{dataLanguage?.country_ISO}</MyText>
      </Pressable>
      <ModalLanguage
        language={language}
        isVisible={visibleModalLanguage}
        onClose={() => setVisibleModalLanguage(false)}
      />
    </MyView>
  );
}

const styles = StyleSheet.create({
  containerDark: {
    backgroundColor: Sizes.background,
  },
  containerLight: {
    marginTop: Sizes.marginHeight,
    marginRight:  Sizes.marginWidth,
  },
  wrapLanguage: {
    height: parseSizeHeight(22.5),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  textLanguageLight: {
    fontFamily: FontStyles.InterSemiBold,
    marginLeft: parseSizeWidth(5),
    fontSize: Sizes.textDefault,
    fontWeight: '600',
    color: Colors.neutrals_50,
  },
  textLanguageDark: {
    fontFamily: FontStyles.InterSemiBold,
    marginLeft: parseSizeWidth(5),
    fontSize: Sizes.textDefault,
    fontWeight: '600',
    color: Colors.semantics_Grey,
  },
});
