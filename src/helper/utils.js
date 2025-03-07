import moment from 'moment';
import validator from 'validator';

import i18n from './i18n';
import {errorStatusServer} from '../constants';

export const firstAndLast = arr => {
  var firstItem = arr[0];
  var lastItem = arr[arr.length - 1];

  var objOutput = {
    first: firstItem,
    last: lastItem,
  };
  return objOutput;
};

export const parseValueTranslate = (values, labels) => {
  const arrParse = [];
  if (!values?.length || !labels?.length) return arrParse;
  for (var i = 0; i < values.length; i++) {
    arrParse.push({
      value: parseInt(values[i]),
      label: `${i18n.t(labels[i]) || ''}`,
      marker: `${i18n.t(labels[i]) || ''}: ${values[i] || 0}`,
    });
  }
  return arrParse;
};

export const parseCartsToTotalPrice = arr => {
  let total = 0;
  if (!arr?.length) return total;
  for (var i = 0; i < arr.length; i++) {
    total += arr[i]?.discountPrice * arr[i]?.quantity;
  }
  return total;
};

export const parseCartsToParams = arr => {
  let params = [];
  if (!arr?.length) return params;
  for (var i = 0; i < arr.length; i++) {
    params.push({
      product_code: arr[i]?.productCode,
      product_name: arr[i]?.productName,
      amount: arr[i]?.discountPrice,
      qty: arr[i]?.quantity,
      img: arr[i]?.imageProduct,
    });
  }
  return params;
};

// parse days from current date to list date
export const parseDayArrFromDate = date => {
  const today = new Date(date);
  const tomorrow = new Date(today);
  const afterTomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  afterTomorrow.setDate(today.getDate() + 2);
  var arr = [
    {date: today, name: 'today'},
    {date: tomorrow, name: 'tomorrow'},
    {date: afterTomorrow, name: 'afterTomorrow'},
    {date: null, name: 'other'},
  ];

  // const startDate = new Date(today);
  // const endDate = new Date(today);
  // endDate.setDate(endDate.getDate() + 2);

  // while (startDate <= endDate) {
  //   arr.push(new Date(startDate));
  //   startDate.setDate(startDate.getDate() + 1);
  // }
  return arr;
};

export const parseDayToHours = async date => {
  const today = new Date();
  const isToday = await (today.getDate() === date.getDate());
  var nowHour = new Date(date).getHours();
  // Time working at Zeny spa: 9h30-19h30
  const fromHour = nowHour >= 9 && isToday ? nowHour : 9;
  const toHour = 20;

  // Loop from begin hour number to end hour number
  var arr = [],
    i,
    j;
  for (i = fromHour; i < toHour; i++) {
    for (j = 0; j < 4; j++) {
      arr.push(i + ':' + (j === 0 ? '00' : 15 * j));
    }
  }

  return arr;
};

export const objectToQueryString = obj => {
  return _.reduce(
    obj,
    function (result, value, key) {
      return _.isArray(value)
        ? (result += getURLParam(`${key}[]`, value))
        : !_.isNull(value) && !_.isUndefined(value)
        ? (result += key + '=' + value + '&')
        : result;
    },
    '',
  ).slice(0, -1);
};

export const getURLParam = (key, array) => {
  var query = '';
  _.map(array, o => {
    query += key + '=' + o + '&';
  });

  return query;
};

export const isOnlyNumber = str => {
  return str.replace(/[^0-9]/g, '');
};

export const clearImg = str => {
  return str.replace(/<img[^>]*>/g, '');
};

export const clearStyle = str => {
  return str.replace(/style="[^"]*"/g, '');
};

export const clearHtml = (str, limit = false) => {
  var result = removeWhitespace(str.replace(/(&nbsp;|<([^>]+)>)/gi, ''));
  return !limit ? result : result.substring(0, limit) + ' ...';
};

export const removeWhitespace = str => {
  str = str.replace(/&nbsp;/g, '');
  return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};

export const unicodeToChar = text => {
  if (!text) return '';
  return text.replace(/\\u[\dA-F]{4}/gi, function (match) {
    return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
  });
};

export const convertEmbedYoutubeUrl = url => {
  if (!url) return '';
  let embedUrl = '';
  const splitedVideo = url.split('watch?v=');
  embedUrl = splitedVideo.join('embed/');

  return embedUrl;
};

export const upperCaseFirst = str => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatNumber = number => {
  if (number == null) {
    return 0;
  }
  var numberRound = Math.round(number).toFixed(0);
  var numberFormat = number.toString().replace('.', ',');
  return numberFormat.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const addNumber = number => {
  if (number >= 10) return number;

  return `0${number}`;
};

export const badgeNumber = number => {
  if (number === 0) return null;
  if (number <= 9) return number;

  return `9+`;
};

export const formatDate = date => {
  return moment(date).format('DD-MM-YYYY');
};

export const formatDateServer = date => {
  return moment(date).format('DD-MM-YYYY HH:mm');
};

// convert date format (DD-MM-YYYY) to (YYYY-MM-DD)
export const convertVieToEngDateTime = date => {
  var datetime = `${date}` || '';
  return datetime.split('-').reverse().join('-');
};

export const formatHour = hour => {
  return moment(hour).format('HH-mm');
};

export const isValidDate = date => {
  return moment(date, 'DD-MM-YYYY', true).isValid();
};

export const calculateBetweenDates = (startDate, endDate) => {
  // To set two dates to two variables
  var date1 = new Date(startDate);
  var date2 = new Date(endDate);
  // To calculate the time difference of two dates
  var differenceInTime = date2.getTime() - date1.getTime();
  // To calculate the no. of days between two dates
  var differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24) || 0);
  return differenceInDays;
};

export const isEmail = (text = '') => {
  const validate =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validate.test(text);
};

export const isPhone = number => {
  const validate = validator.isMobilePhone(number) && number.length > 9;
  return validate;
};

export const isPassword = number => {
  const validate = number.length >= 8;
  return validate;
};

export const isNumber = number => {
  const validate = validator.isNumeric(number);
  return validate;
};

export const isEmpty = obj => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const isNull = text => {
  if (text === '' || text === null || text === undefined) return true;
  return false;
};
export const convertDate = (daysOffset = 0) => {
  return moment().add(daysOffset, 'days').format('YYYY-MM-DD');
};

/*
    @param {message: string,statusCodes: number} error: error response from server
    @param {string} messageDefault: message default when errorStatusArray not found
 */
    export const handleErrorResponse = (error, messageDefault) => {
      if (!error || typeof error !== 'object') {
        // Trả về thông báo mặc định nếu error không hợp lệ
        return {message: messageDefault};
      }
    
      const { statusCodes = null, message = null } = error;
      const errorItem =
        errorStatusServer.find(item => item.code === statusCodes) || null;
      
      if (errorItem?.i18) {
        return {message: i18n.t(errorItem.i18)};
      } else {
        return {message: i18n.t(messageDefault) };
      }
    };
    
