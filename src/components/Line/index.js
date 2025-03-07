import React from 'react';
import {StyleSheet} from 'react-native';
import {MyView} from '~components/MyStyles';

const CustomLine = ({
  type = 'solid',
  thickness = 2,
  color = 'black',
  width = '100%',
}) => {
  return (
    <MyView style={[styles.lineContainer, {width: width}]}>
      {type === 'dashed' ? (
        Array.from({length: Math.floor(100 / thickness)}).map((_, index) => (
          <MyView
            key={index}
            style={[
              styles.dash,
              {
                backgroundColor: color,
                height: thickness,
                marginRight: thickness,
              },
            ]}
          />
        ))
      ) : (
        <MyView
          style={{
            width: '100%',
            borderBottomWidth: thickness,
            borderBottomColor: color,
            borderStyle: 'solid',
          }}
        />
      )}
    </MyView>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'hidden',
  },
  dash: {
    width: 10,
    height: 2,
  },
});

export default CustomLine;
