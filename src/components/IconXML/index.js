import React from 'react';
import {SvgXml} from 'react-native-svg';
import * as icons from './iconFile';
import {parseSizeHeight, parseSizeWidth} from '~theme';

const Icon = ({name, color, width, height}) => {
  const stringxml = icons[name]||icons['file'];
  if (!stringxml) {
    console.error(`Icon "${name}" not found.`);
    return null;
  }

  let updatedXml = stringxml;

  // Only replace stroke color if 'color' is provided
  if (color) {
    updatedXml = stringxml.replace(/stroke="[^"]*"/g, `stroke="${color}"`);
  }

  return (
    <SvgXml
      xml={updatedXml}
      width={parseSizeWidth(width)}
      height={parseSizeWidth(height)}
    />
  );
};

export default Icon;
