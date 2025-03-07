import React from 'react';
import styles from './style';
import Button from '~buttons/MyButton';
import {MyText, MyView} from '~components/MyStyles';
import {Colors} from '~theme';

const Index = ({ 
  containerStyle, 
  listButton = [], 
  TextContent, 
  type = null 
}) => (
  <MyView style={[styles.container, containerStyle]}>
    <MyView style={styles.line} />
    <MyView style={styles.content}>
      {type === 'text' ? (
        <MyText style={styles.txtContent}>{TextContent}</MyText>
      ) : (
        listButton
        .filter(button => button.visible)
        .map(
          (
            { title, onPress, size = 'primary', typeButton = 1, ColorButton = Colors.neutrals_200, TextColorButton = Colors.semantics_Black }, 
            index
          ) => (
            <Button
              key={index}
              onPress={onPress ? () => onPress() : undefined}
              size={size}
              title={title}
              type={typeButton}
              ColorButton={ColorButton}
              TextColorButton={TextColorButton}
            />
          )
        )
      )}
    </MyView>
  </MyView>
);

export default Index;
