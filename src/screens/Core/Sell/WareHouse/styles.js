import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  Width,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';

export default styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
    flex: 1,
  },
  header: {
    height: parseSizeHeight(64),
    alignItems: 'center',
    paddingTop: Sizes.spacing_5_Height,
  },
  bottom: {
    height: parseSizeHeight(104),
    width: Width,
    backgroundColor: Colors.neutrals_100,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.25,
    elevation: 5,
    borderTopLeftRadius: Sizes.spacing_5_Width,
    borderTopRightRadius: Sizes.spacing_5_Width,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    gap: Sizes.spacing_4_Width,
  },
  body: {
    flex: 1,
    marginVertical: parseSizeHeight(8),
    gap: parseSizeHeight(8),
  },
  txtHeader: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  seacrch: {
    alignSelf: 'center',
    flexDirection: 'row',
    gap: parseSizeWidth(15),
    marginTop: Sizes.spacing_3_Height,
  },
  line: {
    width: parseSizeWidth(45),
    height: parseSizeHeight(5),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_300,
  },
  inforTotal: {
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 0.5,
    borderColor: Colors.neutrals_300,
    paddingVertical: parseSizeHeight(20),
    paddingHorizontal: Sizes.paddingWidth,
    gap: Sizes.spacing_4_Height,
  },
  contentInfor: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txtTitle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.semantics_Black,
  },
  txtContent: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    fontStyle: 'normal',
    textAlign: 'center',
    color: Colors.accent_yellow,
  },
});
