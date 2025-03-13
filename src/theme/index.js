import {LocaleConfig} from 'react-native-calendars';
import { Dimensions, Platform } from 'react-native';
import deviceInfo from '~helper/deviceInfo';

export const platform = Platform.OS;
const deviceName = deviceInfo.deviceName || '';
let iPhoneX = [
  'IPHONE 6',
  'IPHONE 6 PLUS',
  'IPHONE 6S',
  'IPHONE 6S PLUS',
  'IPHONE 7',
  'IPHONE 7 PLUS',
  'IPHONE 8',
  'IPHONE 8 PLUS',
  'IPHONE SE (2016)', // iPhone SE thế hệ đầu tiên
  'IPHONE SE (2020)', // iPhone SE thế hệ thứ 2 (với thiết kế giống iPhone 8)
];

export const isIphoneX =
  platform === 'ios' && iPhoneX.indexOf(deviceName.toUpperCase()) > -1;

export const Width = Dimensions.get('window').width;
export const Height = Dimensions.get('window').height;
const screenAvg = (Width + Height) / 2;

export const parseSize = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const percent = elemSize / screenAvg;
  return screenAvg * percent;
};
export const parseSizeHeight = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const heightBase = 844; // lấy chiều dọc iphone 12 làm chuẩn
  const percent = Height / heightBase;
  return elemSize * percent;
};

export const parseSizeWidth = number => {
  const elemSize = typeof number === 'number' ? number : parseFloat(number);
  const widthBase = 390; // lấy chiều ngang iphone 12 làm chuẩn
  const percent = Width / widthBase;
  return elemSize * percent;
};

export const STATUS_BAR_HEIGHT =
  platform === 'ios' ? (isIphoneX ? parseSizeWidth(20) : parseSizeWidth(44)) :parseSizeWidth(10);

export const Colors = {
  background:'#FFFFFF',
  //brand colors
  brand_01_primary: '#16A8E1',
  brand_02_primary: '#0A2E43',
  brand_02_tint10: '#104C6A',
  brand_02_tint20: '#0C5C80',
  brand_02_tint30: '#096C9B',
  brand_02_tint40: '#0A88BF',
  brand_02_tint50: '#3FC0F1',
  brand_02_tint60: '#82D5F7',
  brand_02_tint70: '#BDE7FA',
  brand_02_tint80: '#E1F3FD',
  brand_02_tint90: '#F1F9FE',

  //Neutrals color
  neutrals_950: '#27262B',
  neutrals_900: '#3B3A40',
  neutrals_800: '#43424A',
  neutrals_700: '#4F4D57',
  neutrals_600: '#605E6B',
  neutrals_500: '#6E6D7A',
  neutrals_400: '#93929E',
  neutrals_300: '#B9B8C1',
  neutrals_200: '#DAD9DE',
  neutrals_100: '#EFEEF0',
  neutrals_50: '#FBFBFB',

  //Semantics colors
  semantics_green_01: '#1CBF8E',
  semantics_green_02: '#12D56A',
  semantics_yellow_01: '#E1C469',
  semantics_yellow_02: '#F9B54A',
  semantics_Red_01: '#E27C7C',
  semantics_Red_02: '#FF0303',

  // Secondary colors
  secondary_shade_50: '#042A22',
  secondary_shade_40: '#0A4A3B',
  secondary_shade_30: '#0B5A46',
  secondary_shade_20: '#0B7157',
  secondary_shade_10: '#0D8E6A',
  secondary_primary: '#1CBF8E',
  secondary_tint_10: '#3DCA9B',
  secondary_tint_20: '#75E0B9',
  secondary_tint_30: '#ABEFD2',
  secondary_tint_40: '#D3F8E6',
  secondary_tint_50: '#EDFCF5',

  //Accent colors
  accent_system_01: '#FFB6C1',
  accent_system_02: '#98FB98',


};

export const ColorStatus = {
  b1: '#EBEBEF',
  b11: '#EBEBEF',
  b2: '#D4E8FD',
  b3: '#D4E8FD',
  b31: '#D4E8FD',
  b32: '#D4E8FD',
  b4: '#D4E8FD',
  b41: '#D4E8FD',
  b21: '#F7ECCA',
  b3: '#F7ECCA',
  b5: '#F7ECCA',
  b51: '#FFD29F',
  b33: '#FFD29F',
  b6: '#E3FFF0',
  b8: '#E3FFF0',
  b9: '#E3FFF0',
  b7: '#FFDDDD',

  t1: '#454545',
  t11: '#454545',
  t2: '#0B54A3',
  t3: '#0B54A3',
  t31: '#0B54A3',
  t32: '#0B54A3',
  t4: '#0B54A3',
  t41: '#0B54A3',
  t21: '#904918',
  t3: '#904918',
  t5: '#904918',
  t51: '#BB4C00',
  t33: '#BB4C00',
  t6: '#0E5932',
  t8: '#0E5932',
  t9: '#0E5932',
  t7: '#B10303',
};

export const Sizes = {
  tab: parseSize(30),
  icon: parseSize(34),
  text: parseSize(12),
  tiny: parseSize(10),
  padding: parseSize(10),
  paddingSmall: parseSize(7),
  margin: parseSize(10),
  radius: parseSize(10),
  border: parseSize(1),

  //new app
  paddingHeight: parseSizeHeight(16),
  paddingWidth: parseSizeWidth(16),
  marginHeight: parseSizeHeight(16),
  marginWidth: parseSizeWidth(16),

  //new text
  text_h1: parseSizeWidth(48),
  text_h2: parseSizeWidth(36),
  text_h3: parseSizeWidth(32),
  text_h4: parseSizeWidth(24),
  text_h5: parseSizeWidth(20),
  text_h6: parseSizeWidth(18),
  text_subtitle1: parseSizeWidth(16),
  text_subtitle2: parseSizeWidth(14),
  text_tagline1: parseSizeWidth(12),
  text_tagline2: parseSizeWidth(10),
  textDefault: parseSizeWidth(14),

  //spacing
  iconSize_Width: parseSizeWidth(24),
  iconSize_Height: parseSizeHeight(24),
  Size_large_Width: parseSizeWidth(30),
  Size_large_Height: parseSizeHeight(30),
  spacing_1_Width: parseSizeWidth(4),
  spacing_1_Height: parseSizeHeight(4),
  spacing_2_Width: parseSizeWidth(8),
  spacing_2_Height: parseSizeHeight(8),
  spacing_3_Width: parseSizeWidth(12),
  spacing_3_Height: parseSizeHeight(12),
  spacing_4_Width: parseSizeWidth(16),
  spacing_4_Height: parseSizeHeight(16),
  spacing_5_Width: parseSizeWidth(24),
  spacing_5_Height: parseSizeHeight(24),
  spacing_6_Width: parseSizeWidth(32),
  spacing_6_Height: parseSizeHeight(32),
  spacing_7_Width: parseSizeWidth(40),
  spacing_7_Height: parseSizeHeight(40),
  spacing_8_Width: parseSizeWidth(48),
  spacing_8_Height: parseSizeHeight(48),
  spacing_9_Width: parseSizeWidth(64),
  spacing_9_Height: parseSizeHeight(64),
  header_logo_Width: parseSizeWidth(50),
  header_logo_Height: parseSizeHeight(50),
  heightLine_Width: parseSizeWidth(2),
  heightLine_Height: parseSizeHeight(2),
  input_Width: parseSizeWidth(50),
  input_Height: parseSizeHeight(50),
  input_radius_Width: parseSizeWidth(8),
  input_radius_Height: parseSizeHeight(8),
};
export const FontStyles = {
  InterBlack: 'Inter-Black',
  InterBold: 'Inter-Bold',
  InterExtraBold: 'Inter-ExtraBold',
  InterExtraLight: 'Inter-ExtraLight',
  InterLight: 'Inter-Light',
  InterRegular: 'Inter-Medium',
  InterBold: 'Inter-Bold',
  InterSemiBold: 'Inter-SemiBold',
  InterBold: 'Inter-Bold',
  InterRegular: platform === 'ios' ? 'Inter-Regular' : 'Inter-Medium',
};

export const configureLocaleCalendar = t => {
  LocaleConfig.locales['vn'] = {
    monthNames: [
      t('jan'),
      t('feb'),
      t('mar'),
      t('apr'),
      t('may'),
      t('jun'),
      t('jul'),
      t('aug'),
      t('sep'),
      t('oct'),
      t('nov'),
      t('dec'),
    ],
    dayNames: [
      t('sunday'),
      t('monday'),
      t('tuesday'),
      t('wednesday'),
      t('thursday'),
      t('friday'),
      t('saturday'),
    ],
    dayNamesShort: [
      t('sunShort'),
      t('monShort'),
      t('tueShort'),
      t('wedShort'),
      t('thuShort'),
      t('friShort'),
      t('satShort'),
    ],
  };

  LocaleConfig.defaultLocale = 'vn';
};
