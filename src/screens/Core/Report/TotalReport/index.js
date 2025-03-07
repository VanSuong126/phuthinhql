import React from 'react';

import {MyView, MyText} from '~components/MyStyles';
import styles from './styles';

const Index = props => {
  const {
    title,
    contentTitle,
    quantityContent = 2,
    title_boxLeft_1,
    content_boxLeft_1,
    title_boxLeft_2,
    content_boxLeft_2,
    title_boxRight_1,
    content_boxRight_1,
    title_boxRight_2,
    content_boxRight_2,
  } = props;
  return (
    <MyView style={styles.total}>
      <MyText style={styles.txtTotal}>{title}</MyText>
      <MyText style={styles.txtPriceTotal}>{contentTitle}</MyText>
      <MyView style={styles.horizontal}>
        <MyView
          style={
            quantityContent === 2
              ? styles.BoxDetailTotal
              : styles.BoxDetailTotalOneContent
          }>
          <MyView
            style={
              quantityContent === 2
                ? styles.txtDetailTotal
                : styles.txtDetailTotalOneContent
            }>
            <MyText style={styles.txtDetail}>{content_boxLeft_1}</MyText>
            <MyText style={styles.txtTitleDetail}>{title_boxLeft_1}</MyText>
          </MyView>
          {quantityContent === 2 && (
            <MyView style={styles.txtDetailTotal}>
              <MyText style={styles.txtDetail}>{content_boxLeft_2}</MyText>
              <MyText style={styles.txtTitleDetail}>{title_boxLeft_2}</MyText>
            </MyView>
          )}
        </MyView>
        <MyView
          style={
            quantityContent === 2
              ? styles.BoxDetailTotal
              : styles.BoxDetailTotalOneContent
          }>
          <MyView
            style={
              quantityContent === 2
                ? styles.txtDetailTotal
                : styles.txtDetailTotalOneContent
            }>
            <MyText style={styles.txtDetail}>{content_boxRight_1}</MyText>
            <MyText style={styles.txtTitleDetail}>{title_boxRight_1}</MyText>
          </MyView>
          {quantityContent === 2 && (
            <MyView style={styles.txtDetailTotal}>
              <MyText style={styles.txtDetail}>{content_boxRight_2}</MyText>
              <MyText style={styles.txtTitleDetail}>{title_boxRight_2}</MyText>
            </MyView>
          )}
        </MyView>
      </MyView>
    </MyView>
  );
};

export default Index;
