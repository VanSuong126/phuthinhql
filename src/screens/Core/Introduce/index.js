import React, {useState, useRef} from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Platform,
  Animated,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

import {
  Sizes,
  Colors,
  Width,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import Background from '~assets/images/backgroundSplash.png';

import Button from '~buttons/MyButton';
import {MyView, MyText, MyImageBackground} from '~components/MyStyles';

const listImages = [
  require('~assets/images/intro1.png'),
  require('~assets/images/intro2.png'),
  require('~assets/images/intro3.png'),
];

const Index = () => {
  const {t} = useTranslation();
  const [loading, setLoading] = useState(1);
  const navigation = useNavigation();
  const numberImage = useRef(1);

  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (numberImage.current > 2) {
        navigation.navigate('Login');
      } else {
        numberImage.current = numberImage.current + 1;
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }).start();
        }, 500);
        setLoading(numberImage.current);
      }
    });
  };

  return (
    <MyImageBackground
      style={styles.container}
      source={Background}
      resizeMode="stretch">
      <MyView style={styles.content}>
        <MyView style={styles.header}>
          <MyView style={styles.wrapTabIcon}>
            {[...Array(3)].map((_, index) => (
              <MyView
                key={index}
                style={
                  index + 1 === numberImage.current
                    ? styles.tabIconActive
                    : styles.tabIcon
                }
              />
            ))}
          </MyView>
          <TouchableOpacity
            style={styles.buttonSkip}
            onPress={() => navigation.navigate('Login')}>
            <MyText style={styles.textSkip}>{t('skip')}</MyText>
          </TouchableOpacity>
        </MyView>
        <MyView style={styles.body}>
          <MyView style={styles.wrapIntroImage}>
            <Animated.Image
              source={listImages[numberImage.current - 1]}
              style={[styles.imageMockup, {opacity: fadeAnim}]}
              resizeMode="contain"
            />
          </MyView>
        </MyView>
        <MyView style={styles.footer}>
          <MyView style={styles.wrapTitleFooter}>
            <MyText style={styles.textTitleFooter} allowFontScaling={false}>
              {t('titleSplash' + numberImage.current + '_r1') +
                `\n` +
                t('titleSplash' + numberImage.current + '_r2')}
            </MyText>
          </MyView>
          <MyView style={styles.wrapDescription}>
            <MyText style={styles.textDescription}>
              {t('descriptionSplash' + numberImage.current)}
            </MyText>
          </MyView>
          <MyView style={styles.buttonContinue}>
            <Button
              title={t('continue')}
              size="primary"
              type={1}
              onPress={handleContinue}
            />
          </MyView>
        </MyView>
      </MyView>
    </MyImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' ? parseSizeHeight(85) : parseSizeHeight(24),
    flexDirection: 'column',
  },
  header: {
    magrinTop: parseSizeHeight(24),
    height: parseSizeHeight(21),
    paddingHorizontal: Sizes.paddingWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  wrapTabIcon: {
    width: parseSizeWidth(64),
    height: parseSizeHeight(6),
    gap: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tabIconActive: {
    width: parseSizeWidth(36),
    height: parseSizeHeight(6),
    borderRadius: parseSize(10),
    backgroundColor: Colors.neutrals_50,
  },
  tabIcon: {
    width: parseSize(6),
    height: parseSize(6),
    borderRadius: parseSize(10),
    backgroundColor: Colors.brand_01,
  },
  buttonSkip: {
    height: parseSizeWidth(21),
    justifyContent: 'center',
  },
  textSkip: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_50,
  },
  body: {
    marginTop: parseSizeHeight(37),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapIntroImage: {
    position: 'relative',
  },
  imageMockup: {
    width: Width,
    height: parseSizeHeight(553),
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    height: parseSizeHeight(298),
    width: Width,
    backgroundColor: 'white',
    paddingTop: parseSizeHeight(50),
    paddingHorizontal: Sizes.paddingHeight,
    borderTopLeftRadius: parseSize(24),
    borderTopRightRadius: parseSize(24),
    paddingBottom: Platform.OS === 'android' ? parseSizeHeight(40) : 0,
    shadowColor: '#42474C52',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 5,
  },
  wrapTitleFooter: {
    justifyContent: 'center',
  },
  textTitleFooter: {
    textAlign: 'center',
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h4,
    fontWeight: '600',
    color: Colors.semantics_Black,
  },
  wrapDescription: {
    marginVertical: Sizes.marginWidth,
  },
  textDescription: {
    textAlign: 'center',
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  buttonContinue: {
    alignItems: 'center',
  },
});

export default Index;
