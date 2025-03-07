import {StyleSheet} from 'react-native';
import {Colors, FontStyles, parseSize, parseSizeHeight, Sizes} from '~theme';
import {parseSizeWidth} from '~theme';

const styles = StyleSheet.create({
  inputFull: {
    width: parseSizeWidth(342),
    borderWidth: 0,
  },
  txtInput: {
    fontSize: parseSizeHeight(16),
    borderWidth: 0,
  },
  wrapNote: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: parseSizeHeight(10),
    marginTop: Sizes.spacing_4_Width,
  },
  imageEmpltySubItem: {
    flex: 1,
    borderColor: Colors.brand_01,
    maxHeight: parseSizeHeight(80),
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 8,
  },
  captionSubItem: {
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  imageSubItemWrapper: {
    objectFit: 'contain',
    maxWidth: parseSizeWidth(80),
    width: '100%',
    maxHeight: parseSizeHeight(99),
    height: '100%',
    rowGap: 6,
  },
  rightImages: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    justifyContent: 'space-between',
    rowGap: 10,
  },
  caption: {
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  mainImage: {
    // resizeMode:"contain",
    borderRadius: 8,
    objectFit: 'contain',
    height: parseSizeHeight(189),
  },
  xRemove: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 5,
  },
  actionImageWrapper: {
    position: 'relative',
  },
  noHasImage: {
    justifyContent: 'center',
    alignItems: 'center',
    borderStyle: 'dashed',
  },
  imageWrapper: {
    minWidth: parseSizeWidth(167),
    minHeight: parseSizeHeight(189),
    flex: 1,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.brand_01,
  },
  leftImages: {
    objectFit: 'contain',
    flex: 1,
    width: parseSizeWidth(167),
    height: parseSizeHeight(208),
    rowGap: Sizes.spacing_1_Height,
  },
  imagesWrapper: {
    flexDirection: 'row',
    columnGap: 7,
    paddingHorizontal: Sizes.spacing_5_Width,
    paddingVertical: parseSizeHeight(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
  },
  body: {
    flex: 1,
    backgroundColor: Colors.background,
    marginTop: Sizes.spacing_5_Height,
  },
  container: {
    flex: 1,
  },
});

export default styles;
