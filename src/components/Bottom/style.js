import {StyleSheet} from 'react-native';

import {
  Width,
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
export default styles = StyleSheet.create({
  container: {
    height: parseSizeWidth(128 - 34),
    width: Width,
    backgroundColor: Colors.neutrals_100,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowRadius: 3,
    shadowOpacity: 1,
    elevation: 3,
    borderTopLeftRadius: Sizes.spacing_4_Width,
    borderTopRightRadius: Sizes.spacing_4_Width,
    bottom: 0,
    borderWidth: 0.5,
    borderColor: Colors.neutrals_300,
    alignItems: 'center',
    opacity: 1,
  },
  line: {
    marginVertical: Sizes.spacing_4_Height,
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
  },
  content: {
    backgroundColor: Colors.neutrals_100,
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(17),
  },
  btn: {
    width: parseSizeWidth(162),
    height: parseSizeHeight(46),
    borderRadius: 100,
    backgroundColor: '#ebebef',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtBtn: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_h6,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Yellow_02,
    width: parseSizeWidth(164),
    height: parseSizeHeight(25),
  },
});
