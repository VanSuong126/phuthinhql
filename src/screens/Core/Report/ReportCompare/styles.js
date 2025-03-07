import {StyleSheet} from 'react-native';

import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  Height,
  parseSize,
} from '~theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
  },
  txtUnit: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.neutrals_700,
    marginBottom: Sizes.spacing_4_Height,
  },
  chart: {
    paddingHorizontal: Sizes.paddingWidth,
  },
  noteBarCharts: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizes.spacing_4_Width,
    marginVertical: Sizes.spacing_4_Height,
  },
  inforBarchart: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Sizes.spacing_2_Width,
  },
  colorBarChart: {
    width: parseSizeWidth(14),
    height: parseSizeHeight(14),
  },
  txtNoteBarChart: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.neutrals_700,
  },
  inforDetails: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: Colors.neutrals_200,
    paddingHorizontal: Sizes.paddingWidth,
    paddingTop: Sizes.paddingHeight,
    flex: 1,
    marginBottom: Sizes.marginWidth,
  },
  listInfor: {
    flex: 1,
  },
  titleInforDetails: {
    borderRadius: parseSize(14),
    backgroundColor: Colors.neutrals_200,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    height: parseSizeHeight(48),
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleInfor: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Sizes.spacing_4_Height,
    marginBottom: Sizes.spacing_1_Height,
  },
  txtTitleInfor: {
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.semantics_Grey,
    flex: 1,
  },
});
