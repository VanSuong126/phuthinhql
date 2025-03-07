import { StyleSheet } from 'react-native';
import { Colors, Sizes, Width, parseSizeHeight, FontStyles } from '~theme';

export default styles = StyleSheet.create({
  iconLocation: {
    position: 'absolute',
  },
  imgLocation: {
    resizeMode: 'cover',
    borderRadius: 20,
  },
  location: {
    flexDirection: 'row',
  },
  locationLeft: {
    flex: 0.6,
    paddingBottom: Sizes.padding / 2,
  },
  locationRight: {
    flex: 0.4,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: Sizes.padding,
  },
  txtTitle: {
    marginVertical: Sizes.margin,
    color: '#223263',
    fontWeight: '700',
    fontSize: 16,
  },
  boxInput: {
    marginTop: Sizes.margin,
  },
  input: {
    paddingHorizontal: Sizes.padding,
    height: parseSizeHeight(40),
    borderRadius: Sizes.radius,
    backgroundColor: '#fff',
    // Text styling
    fontSize: 14,
    fontWeight: '500',
    color: '#9098B1',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  txtBtn: {
    fontSize: 16,
    fontWeight: '700',
    color: 'white',
  },
  btn: {
    backgroundColor: '#4E41D9',
    height: parseSizeHeight(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 25,
    marginHorizontal: 10,
  },
  bottom: {
    alignSelf: 'center',
  },
  container: {
    flex: 1, 
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    marginHorizontal: Sizes.marginHeight,
    gap:parseSizeHeight(20),
  },
  wrapButtonGetCurrentLocation: {
    justifyContent: 'flex-start',
    marginTop: parseSizeHeight(10),
  },
  textButtonGetCurrentLocation: {
    fontFamily: FontStyles.InterRegular,
    fontWeight: '500',
    fontSize: Sizes.text_tagline1, 
    color: Colors.accent_blue,
  },
  wrapButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
