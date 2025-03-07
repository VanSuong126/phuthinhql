import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Animated, TouchableOpacity, Easing, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import {
  Sizes,
  Colors,
  Width,
  FontStyles,
  parseSize,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';
import { MyView, MyText, MyImageBackground } from '~components/MyStyles';
import Button from '~buttons/MyButton';
import LocalDB from '~data/asyncStorage';

// list image content2
const listImages2 = [
  require('~assets/images/intro1.png'),
  require('~assets/images/intro2.png'),
  require('~assets/images/intro3.png'),
];
// list image background
const listBackground = [
  require('~assets/images/bgSplash1.png'),
  require('~assets/images/bgSplash2.png'),
];
// list image logo content1
const listImages = [
  require('~assets/images/logoSplash_c1.png'),
  require('~assets/images/logoPKN.png'),
];
// list image logo content1
const listImageStyles = [
  { width: parseSizeWidth(390), height: parseSizeHeight(844) },
  { width: parseSizeWidth(143.27), height: parseSizeHeight(150) },
];

const Index = () => {
  const { t } = useTranslation();
  const [indexRef, setIndexRef] = useState(0);
  const [indexContent, setIndexContent] = useState(1);
  const fadeAnimBackground = useRef(new Animated.Value(1)).current;
  const fadeAnimLogo = useRef(new Animated.Value(1)).current;
  const indexRefActual = useRef(indexRef);

  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [loading, setLoading] = useState(1);
  const navigation = useNavigation();
  const numberImage = useRef(1);

  // set index ref
  useEffect(() => {
    indexRefActual.current = indexRef;
  }, [indexRef]);

  // Start the animation 
  useEffect(() => {
    const animate = () => {
      Animated.parallel([
        Animated.sequence([
          Animated.timing(fadeAnimBackground, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(fadeAnimLogo, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),

      ]).start(() => {
        Animated.parallel([
          Animated.sequence([
            Animated.timing(fadeAnimBackground, {
              toValue: 0,
              duration: 800,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnimLogo, {
              toValue: 0,
              duration: 3000,
              useNativeDriver: true,
            }),
          ]),

        ]).start(() => {
          indexRefActual.current = indexRefActual.current + 1;
          setIndexRef(indexRefActual.current);
          Animated.timing(fadeAnimLogo, {
            toValue: 1,
            duration: 3000,
            useNativeDriver: true,
          }).start(() => {
            Animated.timing(fadeAnimLogo, {
              toValue: 0,
              duration: 1000,
              useNativeDriver: true,
            }).start(() => {
              setIndexContent(2);
            })
          })
        });
      });
    };

    // Bắt đầu animation lần đầu tiên
    animate();

    // Cleanup khi component unmount
    return () => {
      clearTimeout(animate);
    };
  }, [navigation]);

  // handle button continue
  const handleContinue = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (numberImage.current > 2) {
        LocalDB.setSkipScreen('skipSplash');
        navigation.navigate('Login');
      } else {
        numberImage.current = numberImage.current + 1;
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }).start();
        }, 500);
        setLoading(numberImage.current);
      }
    });
  };
  return (
    <MyImageBackground
      source={listBackground[1]}
      style={styles.container}>
      <MyView style={styles.wrapBackgroundImage}>
        <Animated.Image
          source={listBackground[0]}
          style={[styles.backgroundImage, { opacity: fadeAnimBackground }]}
          resizeMode="cover"
        />
      </MyView>
      {indexContent === 1 ?

        (<MyView style={styles.content}>
          <MyView style={styles.body}>
            <MyView style={styles.wrapLogoImage}>
              <Animated.Image
                source={listImages[indexRef]}
                style={[styles.logoImage, listImageStyles[indexRef], { opacity: fadeAnimLogo }]}
                resizeMode="contain"
              />
            </MyView>
          </MyView>
        </MyView>) :

        (<MyView style={styles.content2}>
          <MyView style={styles.header2}>
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
              onPress={() => {
                LocalDB.setSkipScreen('skipSplash'); 
                navigation.navigate('Login')
              }}
            >
              <MyText style={styles.textSkip}>{t('skip')}</MyText>
            </TouchableOpacity>
          </MyView>
          <MyView style={styles.body2}>
            <MyView style={styles.wrapIntroImage}>
              <Animated.Image
                source={listImages2[numberImage.current - 1]}
                style={[styles.imageMockup, { opacity: fadeAnim }]}
                resizeMode="contain"
              />
            </MyView>
          </MyView>
          <MyView style={styles.footer2}>
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
        </MyView>)}
    </MyImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.dark,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapBackgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  wrapLogoImage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage: {
    resizeMode: 'stretch',
  },

  // style content 2
  content2: {
    flex: 1,
    marginTop:
      Platform.OS === 'ios' ? parseSizeHeight(85) : parseSizeHeight(24),
    flexDirection: 'column',
  },
  header2: {
    magrinTop: Sizes.marginHeight,
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
  body2: {
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
  footer2: {
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
