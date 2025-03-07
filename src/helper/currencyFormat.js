import React, {Component, useState} from 'react';

export default function currencyFormat(num) {
  return num && num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + 'đ';
}
export function currencyFormatNoUnit(num) {
  return num && num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
