import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

import { Sizes, Colors, Width, FontStyles, parseSize, parseSizeHeight, parseSizeWidth } from '~theme';
import { MyView, MyText } from '~components/MyStyles';
import Icon from '~components/IconXML';

export default function CheckBox({ value, styleContainerCheck, styleCheckBox, styleTitle, title, onSelect }) {
  const [ischeck, setIsCheck] = useState(value);

  const ClickCheckBox = () => {
    setIsCheck(!ischeck);
    onSelect(!ischeck); // Pass the updated value back to the parent component
  };

  useEffect(() => {
    setIsCheck(value);
  }, [value]);

  return (
    <Pressable onPress={ClickCheckBox} style ={styleContainerCheck}>
      <MyView style={styles.wrapCheck}>
        <MyView style={[styles.checkbox, styleCheckBox]}>
           <Icon
            name={ischeck ?'checked': 'unChecked'}
            width={parseSizeWidth(20)}
            height={parseSizeHeight(20)}
          /> 
        </MyView>
        <MyText style={[styles.textTitleCheck, styleTitle]}>{title}</MyText>
      </MyView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrapCheck: {
    flexDirection: "row",
  },
  checkbox: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.content,
  },
  textTitleCheck: {
    fontFamily: FontStyles.InterRegular,
    marginTop: parseSizeHeight(2),
    marginLeft: parseSizeWidth(10),
    fontSize: Sizes.text_tagline1,
    color: Colors.neutrals_700,
  },
  iconcheck: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.danger,
  },
});
