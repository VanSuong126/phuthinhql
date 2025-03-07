import {StyleSheet} from 'react-native';
import {Colors, Sizes, Width, parseSizeWidth, parseSizeHeight} from '~theme';

export default styles = StyleSheet.create({
  inputPicker: {
    height: parseSizeHeight(55),
    paddingHorizontal: parseSizeWidth(20),
    backgroundColor: Colors.neutrals_200,
    borderRadius: parseSizeWidth(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  inputDate: {
    height: parseSizeHeight(55),
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  Input: {
    width: parseSizeWidth(342),
  },
  smallInput: {
    width: parseSizeWidth(163),
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  content: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'black',
    width: Width,
    borderColor: Colors.neutrals_300,
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(10),
    gap: Sizes.spacing_4_Height,
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
