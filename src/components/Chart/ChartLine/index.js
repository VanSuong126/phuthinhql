import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import moment from 'moment';
import {LineChart} from 'react-native-chart-kit';
import {useTranslation} from 'react-i18next';

import {
  Colors,
  parseSizeHeight,
  parseSizeWidth,
  FontStyles,
  Sizes,
} from '~theme';
import {MyView, MyText, MyScrollView} from '~components/MyStyles';
import {currencyFormatNoUnit} from '~helper/currencyFormat';
const MyLineChart = props => {
  const {
    selected,
    height = 247,
    data,
    type = 'month',
    typeValue = 'price',
    sizeLabel = 60,
    lastDay = 31,
    firstDay = 1,
  } = props;
  const {t} = useTranslation();

  const dateISO = moment();
  const selectedDate = moment(selected, 'YYYY-MM-DD');

  const isSameMonthAndYear =
    type === 'month'
      ? selectedDate.year() === dateISO.year() &&
        dateISO.month() === selectedDate.month()
      : selectedDate.year() === dateISO.year();

  const defaultSelect = isSameMonthAndYear
    ? type === 'month'
      ? dateISO.format('DD') - 1
      : dateISO.format('MM') - 1
    : type === 'month'
    ? selectedDate.format('DD') - 1
    : selectedDate.format('MM') - 1;

  // Quản lý trạng thái của điểm đã chọn
  const [selectedDot, setSelectedDot] = useState(defaultSelect);

  const labels =
    type === 'year'
      ? [
          t('jan'),
          t('feb'),
          t('mar'),
          t('apr'),
          t('may'),
          t('jun'),
          t('jul'),
          t('aug'),
          t('sep'),
          t('oct'),
          t('nov'),
          t('dec'),
        ]
      : Array.from({length: lastDay}, (_, index) =>
          (index + firstDay).toString(),
        );

  const heightChart = parseSizeHeight(height);
  const widthChart = parseSizeWidth(sizeLabel * (labels.length - 1));

  const formatDate = () => {
    const dateClick = selectedDot + 1;

    if (type === 'month') {
      return `${dateClick}/${dateISO.format('MM, YYYY')}`;
    }
    if (type === 'year') {
      return `${labels[dateClick - 1]}, ${dateISO.format('YYYY')}`;
    }
  };

  const fomatPrice = num => {
    if (num >= 1000000 && num < 1000000000) {
      const millions = Math.floor(num / 1000000);
      return `${millions}Tr`;
    }
    if (num >= 1000000000) {
      const billions = Math.floor(num / 1000000000);
      const remainder = num % 1000000000;
      const millions = Math.floor(remainder / 1000000);

      if (millions > 0) {
        return `${billions}T${millions}`;
      }
      return `${billions}T`;
    }
    return currencyFormatNoUnit(num);
  };

  // Đặt các thuộc tính cho dấu chấm tại vị trí đã chọn
  const getDotProps = (value, index) => {
    const isSelected = selectedDot === index;
    // '8' hiện dot khi click, '0' dot sẽ mất
    return {
      r: isSelected ? '8' : '0',
      strokeWidth: isSelected ? '2' : '0',
      stroke: isSelected ? Colors.neutrals_100 : 'transparent',
    };
  };
  //y column
  const renderYAxisLabels = () => {
    const maxValue = Math.max(0, ...data);
    const minValue = Math.min(0, ...data);

    const numberOfSteps = 6;
    // const step = maxValue / (numberOfSteps - 1);
    const range = maxValue - minValue; // Tổng phạm vi dữ liệu
    const step = range / (numberOfSteps - 1); // Khoảng cách giữa các nhãn

    const yAxisLabels = Array.from({length: numberOfSteps}, (_, index) =>
      Math.round(maxValue - step * index),
    );

    return (
      <MyView style={styles.yAxis}>
        {yAxisLabels.map((label, index) => (
          <MyText key={index} style={styles.yAxisLabel}>
            {typeValue === 'person' ? fomatPrice(label) : fomatPrice(label)}
          </MyText>
        ))}
      </MyView>
    );
  };

  // Hiển thị nội dung của dấu chấm khi được chọn
  const renderDotContent = ({x, y, index, indexData}) => {
    const isSelected = selectedDot === index;
    const height = heightChart * 0.77 - y;

    let offsetX;
    if (index === 0) {
      offsetX = parseSizeWidth(-5);
    } else if (index === labels.length - 1) {
      offsetX = parseSizeWidth(60);
    } else {
      offsetX = parseSizeWidth(40);
    }

    let offsetY;
    if (y < heightChart / 3) {
      offsetY = parseSizeHeight(-30);
    } else {
      offsetY = parseSizeHeight(80);
    }

    return (
      isSelected && (
        <MyView key={index}>
          <MyView style={[styles.note, {left: x - offsetX, top: y - offsetY}]}>
            <MyText style={styles.date}>{formatDate()}</MyText>
            <MyText style={styles.price}>
              {typeValue === 'person'
                ? `${fomatPrice(indexData)} ${t('customer1')}`
                : fomatPrice(indexData)}
            </MyText>
          </MyView>
          <MyView
            style={[
              styles.line,
              {
                left: x,
                top: y - parseSizeHeight(40),
                height: height,
              },
            ]}
          />
        </MyView>
      )
    );
  };

  // Sự kiện khi nhấn vào điểm trên biểu đồ
  const handleDotPress = data => {
    const {index} = data;
    setSelectedDot(index); // Cập nhật điểm đã chọn
  };

  return (
    <MyView style={styles.chartContainer}>
      {renderYAxisLabels()}
      <MyScrollView horizontal>
        <MyView style={styles.container}>
          <LineChart
            data={{
              labels: labels,
              datasets: [{data, strokeWidth: 1.5}],
            }}
            width={widthChart}
            height={heightChart}
            fromZero
            yAxisSuffix=""
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: Colors.background,
              backgroundGradientFrom: Colors.background,
              backgroundGradientTo: Colors.background,
              decimalPlaces: 0,
              color: () => Colors.semantics_Green_01,
              labelColor: () => Colors.semantics_Black,
              style: {borderRadius: 0},
              fillShadowGradientFrom: Colors.semantics_Green_02,
              fillShadowGradientTo: Colors.background,
              propsForBackgroundLines: {
                strokeDasharray: '',
                stroke: Colors.neutrals_200,
              },
              propsForLabels: {
                fontSize: Sizes.text_tagline2,
                color: Colors.semantics_Black,
              },
            }}
            bezier
            segments={5}
            getDotProps={getDotProps}
            renderDotContent={renderDotContent}
            onDataPointClick={handleDotPress}
            withHorizontalLabels={false}
          />
        </MyView>
      </MyScrollView>
    </MyView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: parseSizeWidth(-35),
  },
  chartContainer: {
    flexDirection: 'row',
  },
  yAxis: {
    justifyContent: 'space-between',
    marginBottom: parseSizeHeight(40),
    marginLeft: Sizes.marginWidth,
  },
  yAxisLabel: {
    fontSize: Sizes.text_tagline2,
    color: Colors.semantics_Black,
    textAlign: 'right',
  },
  line: {
    width: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: Colors.semantics_Green_01,
    borderBottomWidth: 1,
    borderWidth: 0.7,
  },
  price: {
    fontFamily: FontStyles.InterSemiBold,
    textAlign: 'center',
    color: Colors.neutrals_900,
  },
  date: {
    fontSize: Sizes.text_tagline2,
    textAlign: 'center',
    color: Colors.neutrals_700,
  },
  note: {
    width: parseSizeWidth(90),
    height: parseSizeHeight(45),
    borderRadius: 8,
    backgroundColor: Colors.neutrals_100,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 0.5,
    shadowOpacity: 1,
    zIndex: 2,
    opacity: 0.7,
  },
});

export default MyLineChart;
