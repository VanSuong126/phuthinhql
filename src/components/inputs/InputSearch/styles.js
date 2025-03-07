import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  parseSize,
  FontStyles,
  parseSizeHeight,
  parseSizeWidth,
} from '~theme';

export default styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: parseSizeWidth(15),
    width: parseSizeWidth(342),
    height: parseSizeHeight(50),
  },
  iconScan: {
    width: parseSizeWidth(46),
    height: parseSizeHeight(48),
    borderRadius: 25,
    backgroundColor: Colors.neutrals_100,
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  gif: {
    width: 91,
    height: 24,
    alignSelf: 'center',
  },
  containerGif: {
    flex: 1,
  },
  InputOnMic: {
    flex: 1,
  },
  InputOffMic: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  wrapInputSearch: {
    backgroundColor: Colors.neutrals_100,
    flexDirection: 'row',
    borderWidth: parseSize(1),
    borderColor: Colors.neutrals_300,
    borderRadius: parseSize(100),
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: Sizes.spacing_4_Width,
    width: parseSizeWidth(342),
    height: parseSizeHeight(48),
  },
  wrapInputSearchSecondary: {
    width: parseSizeWidth(281),
    height: parseSizeHeight(48),
  },
  InputSearch: {
    color: Colors.neutrals_700,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    fontFamily: FontStyles.InterRegular,
    flex: 1,
    zIndex: 1,
    height: '100%',
  },
});
