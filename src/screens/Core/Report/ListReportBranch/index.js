import {View} from 'react-native';
import React from 'react';

import {MyView, MyText} from '~components/MyStyles';
import {Colors} from '~theme';
import Line from '~components/Line';
import styles from './styles';
import DateComparison from '~components/DateComparison';

const Index = props => {
  const {
    type = 1,
    content_left_1,
    title_left_1,
    content_left_2,
    title_left_2,
    content_right_1,
    title_right_1,
    content_right_2,
    title_right_2,
    title_right_3,
    content_right_3,
    title_left_3,
    content_left_3,
    color,
    nameBranch,
    percentage = null,
    quantiBranch = null,
    dateComparison = null,
  } = props;

  return (
    <MyView style={styles.item}>
      <MyView style={styles.horizontal}>
        <MyText style={styles.txtName}>{nameBranch}</MyText>
        {percentage !== null && (
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
                  color: color
                    ? Colors.neutrals_50
                    : Colors.semantics_Yellow_01,
                },
              ]}>
              {`${percentage}%`}
            </MyText>
          </MyView>
        )}
        {quantiBranch && (
          <MyText style={styles.quantiBranch}>{quantiBranch}</MyText>
        )}
        {dateComparison && <DateComparison dateToCompare={dateComparison} />}
      </MyView>

      <Line color={Colors.neutrals_300} thickness={1} />
      {type === 1 ? (
        <MyView style={styles.horizontal}>
          <MyView>
            <MyView style={styles.horizontalText}>
              <MyText>{content_left_1}</MyText>
              <MyText style={styles.txtGrey2}>{title_left_1}</MyText>
            </MyView>
            {content_left_2 && (
              <MyView style={styles.horizontalText}>
                <MyText>{content_left_2}</MyText>
                <MyText style={styles.txtGrey2}>{title_left_2}</MyText>
              </MyView>
            )}
            {content_left_3 && (
              <MyView style={styles.horizontalText}>
                <MyText>{content_left_3}</MyText>
                <MyText style={styles.txtGrey2}>{title_left_3}</MyText>
              </MyView>
            )}
          </MyView>
          <MyView>
            <MyView style={styles.horizontalTextRight}>
              <MyText>{content_right_1}</MyText>
              <MyText style={styles.txtGrey2}>{title_right_1}</MyText>
            </MyView>
            {content_right_2 && (
              <MyView style={styles.horizontalTextRight}>
                <MyText>{content_right_2}</MyText>
                <MyText style={styles.txtGrey2}>{title_right_2}</MyText>
              </MyView>
            )}
            {content_right_3 && (
              <MyView style={styles.horizontalTextRight}>
                <MyText>{content_right_3}</MyText>
                <MyText style={styles.txtGrey2}>{title_right_3}</MyText>
              </MyView>
            )}
          </MyView>
        </MyView>
      ) : (
        <MyView style={styles.horizontal}>
          <MyView>
            <MyText style={styles.txtbold}>{content_left_1}</MyText>
            <MyText style={styles.txtGrey}>{content_left_2}</MyText>
          </MyView>
          <MyView>
            <MyText style={styles.txtbold}>{content_right_1}</MyText>
            <MyText style={styles.txtGrey}>{content_right_2}</MyText>
          </MyView>
        </MyView>
      )}
    </MyView>
  );
};

export default Index;
