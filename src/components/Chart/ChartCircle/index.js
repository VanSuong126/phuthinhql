import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Surface, Shape, Group} from '@react-native-community/art';
import {parseSize, Colors} from '~theme';

//Tính bắt đầu và kết thúc cho từng đoạn
const DonutChart = (startAngle, endAngle, outerRadius, innerRadius) => {
  const startXOuter = outerRadius * Math.cos(startAngle);
  const startYOuter = outerRadius * Math.sin(startAngle);
  const endXOuter = outerRadius * Math.cos(endAngle);
  const endYOuter = outerRadius * Math.sin(endAngle);

  const startXInner = innerRadius * Math.cos(startAngle);
  const startYInner = innerRadius * Math.sin(startAngle);
  const endXInner = innerRadius * Math.cos(endAngle);
  const endYInner = innerRadius * Math.sin(endAngle);

  return `M${startXOuter},${startYOuter} A${outerRadius},${outerRadius} 0 ${
    endAngle - startAngle > Math.PI ? 1 : 0
  },1 ${endXOuter},${endYOuter} L${endXInner},${endYInner} A${innerRadius},${innerRadius} 0 ${
    endAngle - startAngle > Math.PI ? 1 : 0
  },0 ${startXInner},${startYInner} Z`;
};

const Index = ({data = [], widthAndHeight, typeReport}) => {
  const baseRadius = parseSize(widthAndHeight) / 2;
  //fillter để có cùng tổng tiền
  const filterData = data?.map(item => ({
    tongTien: Math.max(
      typeReport === 'revenue'
        ? item?.tongDoanhThu + 0.0000001
        : typeReport === 'cost' || typeReport === 'order'
        ? item?.tongTien + 0.0000001
        : typeReport === 'wareHoue'
        ? item?.soLuongTonKho + 0.0000001
        : item?.tongDoanhThu + 0.0000001,
      0.0000001,
    ),
    maMauCuaHang: item?.maMauCuaHang,
  }));
  const total = filterData.reduce((sum, d) => sum + d?.tongTien, 0);

  // lưu trữ kết thúc của một đoạn để làm điểm bắt đầu cho đoạn tiếp theo
  let accumulatedAngle = 0;
  //tính max để tìm đoạn lớn nhất và cho to hơn các đoạn còn lái
  const maxValue = Math.max(...filterData.map(d => d.tongTien));

  return (
    <View style={styles.container}>
      <Surface width={widthAndHeight} height={widthAndHeight}>
        <Group x={widthAndHeight / 2} y={widthAndHeight / 2}>
          {filterData.map((slice, index) => {
            const sliceAngle = (slice?.tongTien / total) * (2 * Math.PI);
            const endAngle = accumulatedAngle + sliceAngle;

            let outerRadius = baseRadius;
            let innerRadius = baseRadius * 0.67;

            if (slice?.tongTien !== maxValue) {
              outerRadius -= 2;
              innerRadius += 2;
            }

            const path = DonutChart(
              accumulatedAngle,
              endAngle,
              outerRadius,
              innerRadius,
            );
            accumulatedAngle = endAngle;

            return <Shape key={index} d={path} fill={slice?.maMauCuaHang} />;
          })}
        </Group>
      </Surface>
      <View
        style={[
          styles.into,
          {
            width: parseSize(widthAndHeight * 0.52),
            height: parseSize(widthAndHeight * 0.52),
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  into: {
    backgroundColor: Colors.neutrals_50,
    shadowColor: 'rgba(66, 71, 76, 0.32)',
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 0.5,
    shadowOpacity: 1,
    position: 'absolute',
    borderRadius: 100,
    elevation: 5,
  },
});

export default Index;
