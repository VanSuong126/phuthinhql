import {StyleSheet} from 'react-native';
import {
  Sizes,
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  Width,
} from '~theme';

const styles = StyleSheet.create({
  flatlistProduct:{
    gap:parseSizeHeight(10),
  },
  containerSortTop:{
    paddingHorizontal: Sizes.paddingWidth,
    justifyContent:'center',
    alignItems:'center',
    overflow:'hidden',
    
  },
  seacrch:{
    alignSelf: 'center',
    flexDirection: 'row',
    gap: parseSizeWidth(10),
  },
  body: {
    flex:1,
    alignItems: 'center',
    flexDirection: 'row',
    gap: Sizes.spacing_3_Width,
    paddingHorizontal: Sizes.paddingWidth,
  },
  container: {
    flex:1,
    backgroundColor: Colors.background,
    gap: Sizes.spacing_3_Width,
    justifyContent:'center',
  },
  footer:{  
    backgroundColor: Colors.background,
  }
});

export default styles;
