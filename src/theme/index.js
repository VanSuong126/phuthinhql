import {Dimensions, Platform, StatusBar} from 'react-native';
import {LocaleConfig} from 'react-native-calendars';

import deviceInfo from '~helper/deviceInfo';

export const platform = Platform.OS;
const deviceName = deviceInfo.deviceName || '';
let iPhoneX = [
  'IPHONE X',
  'IPHONE XS',
  'IPHONE XS MAX',
  'IPHONE XR',
  'IPHONE 11',
  'IPHONE 11 PRO',
  'IPHONE 11 PRO MAX',
  'IPHONE 12',
  'IPHONE 12 PRO',
  'IPHONE 12 PRO MAX',
  'IPHONE 12 MINI',
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
  platform === 'ios' ? (isIphoneX ? 80 : 40) : StatusBar.currentHeight;

export const Colors = {
  default: '#2b96d2',
  // background: '#F5F6F7',
  content: '#FFFFFF',
  red: '#FF0000',
  black: '#000000',
  white: '#FFFFFF',
  dark: '#414141',
  danger: '#E55752',
  lightDanger: '#fd8389',
  success: '#08B938',

  //colors new
  background: '#F6F6F6',
  backgroundShowPopup: '#00000059',
  //brand colors
  brand_01: '#0A8040',
  brand_02: '#DB8C23',
  brand_03: '#1B1B1B',

  //Neutrals color
  neutrals_900: '#1C2024',
  neutrals_800: '#60646C',
  neutrals_700: '#7E808A',
  neutrals_600: '#8B8D98',
  neutrals_500: '#B9BBC6',
  neutrals_400: '#D3D4DB',
  neutrals_300: '#DDDDE3',
  neutrals_200: '#EBEBEF',
  neutrals_100: '#F9F9FB',
  neutrals_50: '#FCFCFD',

  //Semantics colors
  semantics_Green_01: '#0E5932',
  semantics_Green_02: '#12D56A',
  semantics_Green_03: '#E3FFF0',
  semantics_Yellow_01: '#904918',
  semantics_Yellow_02: '#E09C2F',
  semantics_Yellow_03: '#F7ECCA',
  semantics_Black: '#454545',
  semantics_Grey: '#6D6D6D',
  semantics_Grey_01: '#454545',
  semantics_Grey_02: '#6D6D6D',
  semantics_Grey_03: '#E7E7E7',
  semantics_SmokyGrey: '#E7E7E7',
  semantics_Red_01: '#B10303',
  semantics_Red_02: '#FF0303',
  semantics_Red_03: '#FFDDDD',

  //Accent colors
  accent_yellow: '#F9A92A',
  accent_blue: '#007AFF',
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
  paddingHeight: parseSizeHeight(24),
  paddingWidth: parseSizeWidth(24),
  marginHeight: parseSizeHeight(24),
  marginWidth: parseSizeWidth(24),

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
