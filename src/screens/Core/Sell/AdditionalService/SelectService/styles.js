import {StyleSheet} from 'react-native';
import {
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  Colors,
  Sizes,
} from '~theme';

export default styles = StyleSheet.create({
  txtAddAccount: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    color: Colors.accent_blue,
  },
  btnAddAccount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  collum: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Sizes.spacing_3_Height,
  },
  toggle: {flexDirection: 'row', gap: parseSizeWidth(10)},
  onToggle: {
    width: parseSizeWidth(47),
    height: parseSizeHeight(24),
    borderRadius: 100,
    backgroundColor: Colors.semantics_Green_02,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  offToggle: {
    width: parseSizeWidth(47),
    height: parseSizeHeight(24),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_400,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  thumbStyle: {
    width: 22,
    height: 22,
    borderRadius: 17,
  },
  note: {
    marginTop: Sizes.spacing_3_Height,
  },
  tittleNote: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
   
    textAlign: 'left',
    color: Colors.neutrals_700,
    marginBottom: parseSizeHeight(5),
  },
  input: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_body2,
    color: Colors.neutrals_900,
    fontSize: Sizes.text_subtitle1,
    textAlignVertical: 'top',
    height: parseSizeHeight(136),
    backgroundColor: Colors.neutrals_200,
    borderRadius: 8,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(13),
  },
  txtHeader: {
    height: parseSizeHeight(28),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  bottom: {
    marginBottom: parseSizeHeight(48),
    alignItems: 'center',
  },
  body: {
    paddingHorizontal: Sizes.paddingHeight,
    flex: 1,
  },
  header: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Sizes.paddingHeight,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
