import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  Width,
  Height,
} from '~theme';
export default styles = StyleSheet.create({
  containerOpenMenu: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: '100%',
    gap: parseSizeHeight(61),
    backgroundColor: Colors.backgroundShowPopup,
    zIndex: 1,
  },
  containerModal: {
    zIndex: 1,
    position: 'absolute',
    right: Sizes.spacing_5_Width,
    top: parseSizeHeight(-20),
  },
  content: {
    position: 'absolute',
    width: parseSizeWidth(260),
    height: parseSizeHeight(504),
    right: Sizes.spacing_3_Width,
    bottom: parseSizeHeight(81),
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    gap: Sizes.spacing_5_Height,
  },
  sticky: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyOpenedMenu: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stickyLinear: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.neutrals_100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: parseSizeWidth(260),
    height: parseSizeHeight(50),
    borderRadius: 100,
    backgroundColor: Colors.semantics_Green_03,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Sizes.spacing_7_Width,
    gap: Sizes.spacing_3_Width,
  },
  txtBtn: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.semantics_Green_01,
  },
  txtBtnCancel: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '600',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  btnCancel: {
    width: parseSizeWidth(260),
    height: parseSizeHeight(50),
    borderRadius: 100,
    backgroundColor: Colors.semantics_SmokyGrey,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: Sizes.spacing_7_Width,
    gap: Sizes.spacing_3_Width,
  },
});
