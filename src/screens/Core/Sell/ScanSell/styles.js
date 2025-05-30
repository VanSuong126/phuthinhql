import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  FontStyles,
  parseSizeHeight,
  Width,
  parseSizeWidth,
} from '~theme';

export default styles = StyleSheet.create({
  iconContent: {
    width: parseSizeWidth(40),
    height: parseSizeWidth(40),
    borderRadius: Sizes.spacing_2_Height,
    backgroundColor: Colors.semantics_Green_03,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.semantics_Green_02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconCost: {
    width: parseSizeWidth(40),
    height: parseSizeWidth(40),
    borderRadius: Sizes.spacing_2_Height,
    backgroundColor: Colors.semantics_Yellow_03,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.semantics_Yellow_02,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtContent: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h4,
    fontWeight: '600',

    color: Colors.neutrals_50,
  },
  boxContent: {
    width: parseSizeWidth(252),
    height: parseSizeHeight(48),
    borderRadius: Sizes.spacing_2_Width,
    backgroundColor: 'rgba(109, 109, 109, 0.2)',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: parseSizeWidth(4),
    flexDirection: 'row',
    gap: parseSizeWidth(10),
  },
  content: {
    marginBottom: parseSizeHeight(94),
    gap: parseSizeHeight(12),
    alignSelf: 'flex-end',
    paddingRight: Sizes.paddingWidth,
  },
  txtNotifi: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.neutrals_50,
  },
  notifiScan: {
    width: parseSizeWidth(203),
    height: parseSizeWidth(28),
    borderRadius: 100,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: parseSizeHeight(113),
    gap: parseSizeWidth(5),
  },
  btnClose: {
    width: 48,
    height: 48,
    borderRadius: Sizes.spacing_5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtTitle: {
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.neutrals_50,
    height: Sizes.spacing_9,
    fontFamily: FontStyles.InterSemiBold,
  },
  header: {
    width: Width,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
    gap: parseSizeHeight(37),
    top: Sizes.paddingHeight,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.65)',
  },
});
