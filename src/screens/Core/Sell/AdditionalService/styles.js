import {StyleSheet} from 'react-native';
import {
  Colors,
  Sizes,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
} from '~theme';
export default styles = StyleSheet.create({
  tabTextStyle: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
   
    textAlign: 'center',
    color: Colors.neutrals_700,
  },
  tabStyle: {
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  activeTabStyle: {
    backgroundColor: Colors.brand_01,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    zIndex: 1,
    height: parseSizeHeight(37),
  },
  firstTabStyle: {
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderRadius: 25,
    height: parseSizeHeight(37),
  },
  lastTabStyle: {
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    height: parseSizeHeight(37),
  },
  tabsContainerStyle: {
    width: parseSizeWidth(342),
    height: parseSizeHeight(48),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: parseSizeWidth(6),
  },
  txtHeader: {
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
  },
  body: {
    flex: 1,
  },
  header: {
    height: Sizes.spacing_9_Height,
    alignItems: 'center',
    paddingTop: Sizes.paddingHeight,
    paddingBottom: Sizes.spacing_3_Height,
    marginBottom: Sizes.spacing_3_Height,
  },
  container: {
    paddingHorizontal: 0,
    flex: 1,
  },
});
