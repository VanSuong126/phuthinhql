export default function readNumberToWords(number) {
    const units = ['', 'Một', 'Hai', 'Ba', 'Bốn', 'Năm', 'Sáu', 'Bảy', 'Tám', 'Chín'];
    const teens = ['Mười', 'Mười Một', 'Mười Hai', 'Mười Ba', 'Mười Bốn', 'Mười Lăm', 'Mười Sáu', 'Mười Bảy', 'Mười Tám', 'Mười Chín'];
    const tens = ['', '', 'Hai Mươi', 'Ba Mươi', 'Bốn Mươi', 'Năm Mươi', 'Sáu Mươi', 'Bảy Mươi', 'Tám Mươi', 'Chín Mươi'];
    const scales = ['', 'Ngàn', 'Triệu', 'Tỷ', 'Nghìn Tỷ', 'Triệu Tỷ', 'Tỷ Tỷ'];
    
  
    // Hàm đọc 3 chữ số
    function readThreeDigits(num) {
      let result = '';
      let hundreds = Math.floor(num / 100);
      let tensAndUnits = num % 100;
  
      if (hundreds > 0) {
        result += units[hundreds] + ' Trăm ';
      }
  
      if (tensAndUnits >= 10 && tensAndUnits <= 19) {
        result += teens[tensAndUnits - 10];
      } else {
        let tensDigit = Math.floor(tensAndUnits / 10);
        let unitsDigit = tensAndUnits % 10;
  
        if (tensDigit > 0) {
          result += tens[tensDigit] + ' ';
        }
  
        if (unitsDigit > 0) {
          result += units[unitsDigit];
        }
      }
  
      return result.trim();
    }
  
    if (number === 0) {
      return 'không';
    }
  
    let result = '';
    let scaleIndex = 0;
  
    while (number > 0) {
      let threeDigits = number % 1000;
      if (threeDigits > 0) {
        result = readThreeDigits(threeDigits) + ' ' + scales[scaleIndex] + ' ' + result;
      }
      number = Math.floor(number / 1000);
      scaleIndex++;
    }
  
    return result.trim() +' Đồng';
  }