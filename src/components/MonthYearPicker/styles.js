import {StyleSheet} from 'react-native';

import {
  Colors,
  Sizes,
  parseSize,
  parseSizeHeight,
  FontStyles,
  parseSizeWidth,
  Height,
  Width,
} from '~theme';

export default styles = StyleSheet.create({
  txtYear: {
    fontFamily: FontStyles.InterMedium,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.brand_01,
  },
  boxBtnHeader: {
    gap: parseSizeWidth(15),
    flexDirection: 'row',
  },
  btnHeader: {
    borderRadius: 6,
    backgroundColor: Colors.neutrals_100,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    alignItems: 'center',
    justifyContent: 'center',
    width: parseSize(30),
    height: parseSize(30),
  },
  chosseYear: {
    flexDirection: 'row',
    paddingHorizontal: parseSizeWidth(26),
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Sizes.spacing_4_Height,
  },
  listOption: {
    flex: 1,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: Sizes.spacing_3_Height,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    gap: Sizes.spacing_4_Width,
    marginTop: parseSizeHeight(8),
  },
  txtOption: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    textAlign: 'center',
  },
  txtUndo: {
    fontFamily: FontStyles.InterRegular,
    fontFamily: 'Inter',
    fontSize: Sizes.textDefault,
    fontWeight: '500',
    color: Colors.semantics_Black,
  },
  undo: {
    flexDirection: 'row',
    paddingHorizontal: parseSizeWidth(26),
    justifyContent: 'space-between',
    marginBottom: Sizes.spacing_4_Height,
  },
  modalContent: {
    width: '100%',
    height: parseSizeHeight(561),
    backgroundColor: Colors.neutrals_50,
    borderTopLeftRadius: parseSize(16),
    borderTopRightRadius: parseSize(16),
    paddingVertical: Sizes.spacing_5_Height,
  },
  modal: {
    flex: 1,
    margin: 0,
    backgroundColor: 'rgba(0, 0, 0,0.35)',
    justifyContent: 'flex-end',
  },
});
