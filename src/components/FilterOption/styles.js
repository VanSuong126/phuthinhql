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
  selectedItemLeft: {
    flexDirection: 'row',
    gap: Sizes.spacing_4_Width,
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: Colors.semantics_Green_03,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtSelected: {
    color: Colors.semantics_Green_01,
  },
  bottom: {
    alignItems: 'center',
    flex: 0.15,
    justifyContent: 'flex-end',
  },
  listOption: {
    flex: 0.85,
    marginBottom: parseSizeHeight(10),
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
