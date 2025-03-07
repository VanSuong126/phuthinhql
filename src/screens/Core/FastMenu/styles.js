import {StyleSheet} from 'react-native';
import {Sizes, Colors} from '~theme';
import {
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
  parseSize,
} from '~theme';

export default styles = StyleSheet.create({
  backgroundFastMenu: {
    height: parseSize(84),
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    marginHorizontal: parseSizeWidth(45),
    paddingRight: parseSizeWidth(33),
    paddingLeft: parseSizeWidth(35),
  },
  wrapFastAccess: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: parseSizeHeight(18),
    marginBottom: parseSizeHeight(30),
  },
  btnFastAccess: {
    alignItems: 'center',
    justifyContent: 'center',
    width: parseSizeHeight(66),
    height: parseSizeHeight(66),
    borderRadius: parseSizeHeight(66),
    borderWidth: parseSize(2),
    borderColor: Colors.neutrals_500,
    backgroundColor: Colors.neutrals_100,
  },
  btnAccessGradient: {
    width: parseSizeHeight(60),
    height: parseSizeHeight(60),
    borderRadius: parseSizeHeight(60),
    alignItems: 'center',
    justifyContent: 'center',
  },
  gif: {
    width:  parseSizeWidth(30),
    height:  parseSizeWidth(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtFastAccess: {
    fontWeight: '500',
    fontSize: Sizes.text_tagline1,
    color: Colors.brand_01,
    fontFamily: FontStyles.InterRegular,
  },
  //
});
