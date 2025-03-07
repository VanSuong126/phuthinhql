import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  Width,
  parseSizeWidth,
  parseSizeHeight,
  parseSize,
  FontStyles,
} from '~theme';

export default styles = StyleSheet.create({
  list: {
    gap: Sizes.spacing_4_Height,
  },
  txtUpdate: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Green_01,
  },
  update: {
    borderRadius: 100,
    backgroundColor: Colors.semantics_Green_03,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: parseSizeWidth(17),
    paddingVertical: parseSizeHeight(5),
  },
  txtDelete: {
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',
    color: Colors.semantics_Red_01,
  },
  delete: {
    borderRadius: 100,
    backgroundColor: Colors.semantics_Red_03,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: parseSizeWidth(17),
    paddingVertical: parseSizeHeight(5),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  txtGrey: {color: Colors.neutrals_700, marginLeft: parseSizeWidth(10)},
  txtLocation: {
    color: Colors.neutrals_700,
    marginLeft: parseSizeWidth(10),
    width: parseSizeWidth(190),
  },
  txtName: {
    fontFamily: FontStyles.InterSemiBold,
    fontWeight: '600',
    marginBottom: Sizes.spacing_3_Height,
    width: parseSizeWidth(190),
  },
  image: {
    width: parseSizeWidth(75),
    height: parseSizeHeight(87),
    borderRadius: parseSize(8),
    marginRight: parseSizeWidth(20),
    // objectFit: 'contain',
  },
  content: {
    gap: Sizes.spacing_3_Height,
  },
  box: {
    width: '100%',
    borderRadius: parseSize(16),
    backgroundColor: Colors.neutrals_100,
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    padding: parseSize(10),
    gap: Sizes.spacing_4_Height,
  },
  horizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    alignItems: 'center',
    flex: 1,
    width: Width,
    paddingHorizontal: Sizes.paddingWidth,
    marginTop: Sizes.spacing_3_Height,
    marginBottom: Sizes.spacing_3_Height,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 0,
    margin: 0,
    alignItems: 'center',
  },
});
