import React from 'react';

import styles from './styles';
import Icon from '~components/IconXML';
import Line from '~components/Line';
import {MyView, MyText} from '~components/MyStyles';
import {Colors, ColorStatus} from '~theme';
import truncateText from '~helper/truncateText';
const Index = ({
  content_left_1,
  content_left_2,
  content_right_1,
  content_right_2,
  title_left,
  title_left_2,
  title_right_2,
  icon_left_1 = 'box',
  icon_left_2 = 'box',
  icon_right_1 = 'box',
  percentage,
  color = Colors.brand_01,
  idStatus,
}) => {
  const colorStatus = ColorStatus?.['t' + idStatus];
  const colorsBackground = ColorStatus?.['b' + idStatus];

  return (
    <MyView style={styles.box}>
      <MyView style={styles.horizontal}>
        <MyText style={styles.txtBlack}>{title_left}</MyText>
        <MyView
          style={[
            styles.percent,
            {
              backgroundColor: color || Colors.semantics_Yellow_03,
            },
          ]}>
          <MyText
            style={[
              styles.txtPercent,
              {
                color: color ? Colors.neutrals_50 : Colors.semantics_Yellow_01,
              },
            ]}>
            {`${percentage}%`}
          </MyText>
        </MyView>
      </MyView>

      <MyView style={styles.horizontal}>
        <MyText style={styles.txtBlack}>{title_left_2}</MyText>
        <MyText style={styles.txtBlack}>{title_right_2}</MyText>
      </MyView>
      <Line color={Colors.neutrals_300} thickness={1} />
      <MyView style={styles.horizontal}>
        {content_left_1 && (
          <MyView style={styles.horizontal}>
            <Icon name={icon_left_1} width={18} height={18} />
            <MyText style={styles.txtGrey}>{content_left_1}</MyText>
          </MyView>
        )}
        {content_right_1 && (
          <MyView style={styles.horizontal}>
            <Icon name={icon_right_1} width={18} height={18} />
            <MyText style={styles.txtGrey}>{content_right_1}</MyText>
          </MyView>
        )}
      </MyView>
      <MyView style={styles.horizontal}>
        {content_left_2 && (
          <MyView style={styles.horizontal}>
            <Icon name={icon_left_2} width={18} height={18} />
            <MyText style={styles.txtGrey}>{content_left_2}</MyText>
          </MyView>
        )}
        {content_right_2 && (
          <MyView style={[styles.status, {backgroundColor: colorsBackground}]}>
            <MyText style={[styles.txtStatus, {color: colorStatus}]}>
              {truncateText(content_right_2, 17)}
            </MyText>
          </MyView>
        )}
      </MyView>
    </MyView>
  );
};

export default Index;
