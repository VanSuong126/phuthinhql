import React from 'react';
import {LineChart} from 'react-native-chart-kit';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

import {MyScrollView, MyView, MyText} from '~components/MyStyles';
import {Colors, parseSizeHeight, parseSizeWidth, Sizes} from '~theme';

const Index = ({data, sizeLabel = 70, chartHeight = 250}) => {
  const {t} = useTranslation();
  const labels = data.map(item => t(item.groupByKey));
  const values = data.map(item => item?.dataTyLe?.replace('%', ''));

  const heightChart = parseSizeHeight(chartHeight);
  const widthChart = parseSizeWidth(sizeLabel * (labels.length - 1));

  const renderYAxisLabels = () => {
    // Tính giá trị max và min từ dữ liệu
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);

    const numberOfSteps = 5;
    const step = (maxValue - minValue) / (numberOfSteps - 1);

    // Tạo các nhãn từ min đến max
    const yAxisLabels = Array.from({length: numberOfSteps}, (_, index) =>
      Math.round(maxValue - step * index),
    );
    const gap = heightChart / 9;

    return (
      <MyView style={[styles.yAxisContainer, {gap: gap}]}>
        {yAxisLabels.map((label, index) => (
          <MyText key={index} style={styles.yAxisLabel}>
            {label}
          </MyText>
        ))}
      </MyView>
    );
  };

  return (
    <MyView style={styles.container}>
      {/* Trục Y cố định */}
      {renderYAxisLabels()}

      {/* Biểu đồ cuộn ngang */}
      <MyScrollView horizontal>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: values,
                color: () => `${Colors.brand_01}`, // Màu của đường
                strokeWidth: 2, // Độ rộng của đường
              },
            ],
          }}
          width={widthChart} // Chiều rộng của biểu đồ
          height={heightChart}
          yAxisLabel=""
          yAxisSuffix=""
          yAxisInterval={1}
          segments={5}
          chartConfig={{
            backgroundColor: Colors.background,
            backgroundGradientFrom: Colors.background,
            backgroundGradientTo: Colors.background,
            decimalPlaces: 0,
            fillShadowGradientFrom: Colors.background,
            fillShadowGradientTo: Colors.background,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: () => Colors.semantics_Black,
            style: {
              borderRadius: 16,
            },
            propsForBackgroundLines: {
              stroke: Colors.neutrals_200,
              strokeDasharray: '',
            },
            propsForDots: {
              r: '5',
              strokeWidth: '0',
              stroke: Colors.brand_01,
              fill: Colors.brand_01,
            },
          }}
          style={{
            marginLeft: parseSizeHeight(-10),
          }}
        />
      </MyScrollView>
    </MyView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    position: 'relative',
  },
  yAxisContainer: {
    justifyContent: 'space-between',
    position: 'absolute',
    zIndex: 2,
    gap: parseSizeHeight(28),
    backgroundColor: Colors.background,
    left: 0,
    width: parseSizeWidth(45),
    paddingRight: parseSizeWidth(6),
  },
  yAxisLabel: {
    fontSize: Sizes.text_tagline1,
    color: Colors.semantics_Black,
    textAlign: 'right',
  },
});

export default Index;
