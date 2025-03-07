import React, {Component, useState} from 'react';

export default function formatNumber(num) {
  if (typeof num === 'undefined' || num === null) {
    return ''; // hoặc giá trị mặc định khác tùy theo yêu cầu của bạn
  }

  return Number.isInteger(num)
    ? num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    : num.toFixed(1).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
}
