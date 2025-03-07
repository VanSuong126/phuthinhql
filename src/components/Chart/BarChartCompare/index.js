import React, {useEffect, useState} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryGroup,
  VictoryAxis,
} from 'victory-native';
import {useTranslation} from 'react-i18next';
import {StyleSheet} from 'react-native';

import {MyView, MyScrollView} from '~components/MyStyles';
import {parseSizeHeight, parseSizeWidth, Colors, Sizes} from '~theme';

const generateTickValues = (min, max) => {
  const steps = 4; // Vì luôn cần 6 số, số khoảng sẽ là 4
  const range = max - min;
  const step = range / steps;

  // Tạo 5 số trong khoảng min-max
  let values = Array.from({length: steps + 1}, (_, index) =>
    Math.round(min + step * index),
  );

  // Đảm bảo số 0 luôn có mặt trong danh sách
  if (!values.includes(0)) {
    values.push(0);
  }

  // Loại bỏ trùng lặp và sắp xếp tăng dần
  return [...new Set(values)].sort((a, b) => a - b);
};
const Index = ({
  widthBar = parseSizeWidth(12),
  spacingGroupBar = parseSizeWidth(50),
  heightChart = parseSizeHeight(250),
  borderRadiusBar = parseSize(8),
  data = [],
}) => {
  const {t} = useTranslation();
  const [dataNguon, setDataNguon] = useState([]);
  const [dataDich, setDataDich] = useState([]);
  const [monthNames, setMonthNames] = useState([]);
  const [maxYValue, setMaxYValue] = useState(0);
  const [minYValue, setMinYValue] = useState(0);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return;
    const mappedDataNguon = data.map((val, index) => ({
      x: index + 1,
      month: val?.groupByKey,
      y: val?.dataNguon || 0,
    }));
    const mappedDataDich = data.map((val, index) => ({
      x: index + 1,
      month: val?.groupByKey,
      y: val?.dataDich || 0,
    }));

    const uniqueMonthNames = Array.from(
      new Set(mappedDataNguon.map(item => t(item.month))),
    );
    const maxNguonY = Math.max(...mappedDataNguon.map(d => d.y), 0);
    const maxDichY = Math.max(...mappedDataDich.map(d => d.y), 0);
    const minDichY = Math.min(...mappedDataDich.map(d => d.y), 0);
    const minNguonY = Math.min(...mappedDataNguon.map(d => d.y), 0);

    setDataNguon(mappedDataNguon);
    setDataDich(mappedDataDich);
    setMonthNames(uniqueMonthNames);
    setMaxYValue(Math.max(maxNguonY, maxDichY));
    setMinYValue(Math.min(minNguonY, minDichY));
  }, [data]);

  const chartWidth = parseSizeWidth(
    dataNguon.length * (widthBar + spacingGroupBar),
  );

  const customTheme = {
    axis: {
      style: {
        axis: {stroke: Colors.neutrals_200, strokeWidth: 1},
        grid: {stroke: Colors.neutrals_200, strokeWidth: 1},
        tickLabels: {padding: 5},
      },
    },
  };

  return (
    <MyView>
      <MyView style={styles.container}>
        {/* Fixed Y Axis */}
        <VictoryChart
          theme={customTheme}
          height={parseSizeHeight(heightChart)}
          width={parseSizeWidth(30)}
          padding={{
            left: parseSizeWidth(35),
            top: parseSizeHeight(10),
            bottom: parseSizeHeight(30),
            right: 0,
          }}
          domainPadding={parseSizeHeight(0)}>
          <VictoryAxis
            dependentAxis
            tickCount={7}
            tickFormat={tick => `${tick}`}
            tickValues={generateTickValues(minYValue, maxYValue)}
            style={{
              tickLabels: {
                fontSize: Sizes.text_tagline1,
                fill: Colors.semantic_black,
              },
            }}
          />
        </VictoryChart>

        {/* Scrollable Chart Section */}
        <MyScrollView horizontal contentContainerStyle={{flexGrow: 1}}>
          <VictoryChart
            theme={customTheme}
            height={parseSizeHeight(heightChart)}
            width={chartWidth}
            domainPadding={{x: monthNames.length < 4 ? 40 : 20}}
            padding={{
              left: parseSizeWidth(5),
              right: parseSizeWidth(30),
              top: parseSizeHeight(10),
              bottom: parseSizeHeight(30),
            }}>
            {/* X Axis */}
            <VictoryAxis
              offsetY={30}
              tickFormat={monthNames}
              style={{
                tickLabels: {
                  fontSize: Sizes.text_tagline2,
                  fill: Colors.semantic_black,
                },
              }}
            />
            <VictoryAxis
              dependentAxis
              tickValues={generateTickValues(minYValue, maxYValue)}
              tickCount={6}
            />
            {/* Grouped Bars */}
            <VictoryGroup offset={widthBar + 4}>
              <VictoryBar
                data={dataDich}
                style={{
                  data: {fill: Colors.semantics_Yellow_02, width: widthBar},
                }}
                cornerRadius={{
                  top: parseSizeHeight(borderRadiusBar),
                  bottom: parseSizeHeight(borderRadiusBar),
                }}
                alignment="middle"
              />
              <VictoryBar
                data={dataNguon}
                style={{
                  data: {fill: Colors.brand_01, width: widthBar},
                }}
                cornerRadius={{
                  top: parseSizeHeight(borderRadiusBar),
                  bottom: parseSizeHeight(borderRadiusBar),
                }}
                alignment="middle"
              />
            </VictoryGroup>
          </VictoryChart>
        </MyScrollView>
      </MyView>
    </MyView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Index;
