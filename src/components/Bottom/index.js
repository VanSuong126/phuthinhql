import React, {useEffect, useState} from 'react';

import styles from './style';
import Button from '~buttons/MyButton';
import {MyText, MyView} from '~components/MyStyles';
import {Colors} from '~theme';
import StickyMenu from '~components/StickyMenu';

const index = props => {
  const {
    containerStyle,
    titleBtn1,
    titleBtn2,
    onPress1,
    onPress2,
    TextContent,
    type = null,
    sticky = true,
    typeBtn2,
    disableBtn1 = false,
    disableBtn2 = false,
    colorBtn1,
    TextColorButton1,
    colorBtn2,
  } = props;
  return (
    <MyView style={[styles.container, containerStyle]}>
      <MyView style={styles.line} />
      {sticky && <StickyMenu />}
      <MyView style={styles.content}>
        {type == 'text' ? (
          <MyText style={styles.txtContent}>{TextContent}</MyText>
        ) : (
          <Button
            disabled={disableBtn1}
            onPress={onPress1}
            size={onPress2 ? 'medium' : 'primary'}
            title={titleBtn1}
            type={onPress2 ? 3 : 1}
            ColorButton={colorBtn1 ? colorBtn1 : Colors.neutrals_200}
            TextColorButton={
              TextColorButton1 ? TextColorButton1 : Colors.semantics_Black
            }
          />
        )}
        {onPress2 && titleBtn2 && (
          <Button
            disabled={disableBtn2}
            type={typeBtn2 ? typeBtn2 : 1}
            onPress={onPress2}
            ColorButton={colorBtn2 ? colorBtn2 : null}
            size="medium"
            title={titleBtn2}
          />
        )}
      </MyView>
    </MyView>
  );
};

export default index;
