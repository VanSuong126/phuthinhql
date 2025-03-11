import React from 'react';
import {SvgXml} from 'react-native-svg';
import * as icons from './iconFile';
import { parseSizeWidth} from '~theme';

const Icon = ({name, stroke,fill, width, height}) => {
  const stringxml = icons[name]||icons['file'];
  if (!stringxml) {
    console.error(`Icon "${name}" not found.`);
    return null;
  }

  let updatedXml = stringxml;

  // Only replace stroke color if 'color' is provided
  if (stroke) {
    updatedXml = stringxml.replace(/stroke="[^"]*"/g, `stroke="${stroke}"`);
    
  }
  if (fill) {
    updatedXml = updatedXml.replace(/fill="[^"]*"/g, `fill="${fill}"`);
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
