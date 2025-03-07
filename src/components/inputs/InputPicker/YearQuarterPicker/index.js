import {StyleSheet} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import Selects from '~inputs/Selects';
import {MyView} from '~components/MyStyles';
import {Sizes} from '~theme';

const YearQuarterPicker = ({
  labelName1,
  labelName2,
  styleContainer,
  minYear,
  maxYear,
  typePicker,
  getValue,
  init,
}) => {
  const [data, setData] = useState([]);
  const [dataNguon, setDataNguon] = useState([]);
  const [dataDich, setDataDich] = useState([]);
  const [source, setSource] = useState(null);
  const [compare, setCompare] = useState(null);

  // Khởi tạo dữ liệu ban đầu
  useEffect(() => {
    const generatedData =
      typePicker === 'year'
        ? Array.from({length: maxYear - minYear + 1}, (_, i) => ({
            value: `${minYear + i}`,
            label: `${minYear + i}`,
          }))
        : Array.from({length: (maxYear - minYear + 1) * 4}, (_, i) => {
            const year = minYear + Math.floor(i / 4);
            const quarter = (i % 4) + 1;
            return {
              value: `${year}0${quarter}`,
              label: `${year} Q${quarter}`,
              quarter: quarter,
            };
          });

    setData(generatedData);
    setDataDich(generatedData);
    setDataNguon(generatedData);

    if (init) {
      const findSource = generatedData.filter(
        val => val.value === init?.source?.value,
      );
      setSource(findSource[0]);

      const findCompare = generatedData.filter(
        val => val.value === init?.compare?.value,
      );
      setCompare(findCompare[0]);
    }
  }, [init]);

  const handleValue = (item, type) => {
    if (type === 'source') {
      setSource(item);
      setDataDich(data.filter(val => val?.value !== item?.value));
    }
    if (type === 'compare') {
      setCompare(item);
      setDataNguon(data.filter(val => val?.value !== item?.value));
    }

    getValue({type: type, ...item});
  };

  return (
    <MyView style={styles.container}>
      <Selects
        labelName={labelName1}
        styleContainer={styleContainer}
        options={dataNguon}
        onChangeValue={item => handleValue(item, 'source')}
        value={source?.value}
      />
      <Selects
        labelName={labelName2}
        styleContainer={styleContainer}
        options={dataDich}
        onChangeValue={item => handleValue(item, 'compare')}
        value={compare?.value}
      />
    </MyView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: Sizes.spacing_4_Height,
  },
});

export default YearQuarterPicker;
