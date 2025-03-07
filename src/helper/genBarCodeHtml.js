export default function genBarcodeHtml(code){
    var tableB = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    var encoding = ["11011001100", "11001101100", "11001100110", "10010011000", "10010001100", "10001001100", "10011001000", "10011000100", "10001100100", "11001001000", "11001000100", "11000100100", "10110011100", "10011011100", "10011001110", "10111001100", "10011101100", "10011100110", "11001110010", "11001011100", "11001001110", "11011100100", "11001110100", "11101101110", "11101001100", "11100101100", "11100100110", "11101100100", "11100110100", "11100110010", "11011011000", "11011000110", "11000110110", "10100011000", "10001011000", "10001000110", "10110001000", "10001101000", "10001100010", "11010001000", "11000101000", "11000100010", "10110111000", "10110001110", "10001101110", "10111011000", "10111000110", "10001110110", "11101110110", "11010001110", "11000101110", "11011101000", "11011100010", "11011101110", "11101011000", "11101000110", "11100010110", "11101101000", "11101100010", "11100011010", "11101111010", "11001000010", "11110001010", "10100110000", "10100001100", "10010110000", "10010000110", "10000101100", "10000100110", "10110010000", "10110000100", "10011010000", "10011000010", "10000110100", "10000110010", "11000010010", "11001010000", "11110111010", "11000010100", "10001111010", "10100111100", "10010111100", "10010011110", "10111100100", "10011110100", "10011110010", "11110100100", "11110010100", "11110010010", "11011011110", "11011110110", "11110110110", "10101111000", "10100011110", "10001011110", "10111101000", "10111100010", "11110101000", "11110100010", "10111011110", "10111101110", "11101011110", "11110101110", "11010000100", "11010010000", "11010011100", "11000111010"];
  
    var barcode = '';
    var sum = 0;
    var isum = 0;
    var i = 0;
    var j = 0;
    var value = 0;
  
    // Check each character in the code
    for (i = 0; i < code.length; i++) {
      if (tableB.indexOf(code.charAt(i)) === -1) return '';
    }
  
    // Check first characters: Start with C table only if enough numeric
    var tableCActivated = code.length > 1;
    var c = '';
    for (i = 0; i < 3 && i < code.length; i++) {
      c = code.charAt(i);
      tableCActivated &= c >= '0' && c <= '9';
    }
  
    sum = tableCActivated ? 105 : 104;
  
    // Start: [105]: C table or [104]: B table
    barcode = encoding[sum];
  
    i = 0;
    while (i < code.length) {
      if (!tableCActivated) {
        j = 0;
        // Check next character to activate C table if interesting
        while ((i + j < code.length) && (code.charAt(i + j) >= '0') && (code.charAt(i + j) <= '9')) j++;
  
        // 6 min everywhere or 4 mini at the end
        tableCActivated = (j > 5) || ((i + j - 1 === code.length) && (j > 3));
  
        if (tableCActivated) {
          barcode += encoding[99]; // C table
          sum += ++isum * 99;
        }
        // 2 min for table C so need table B
      } else if ((i === code.length) || (code.charAt(i) < '0') || (code.charAt(i) > '9') || (code.charAt(i + 1) < '0') || (code.charAt(i + 1) > '9')) {
        tableCActivated = false;
        barcode += encoding[100]; // B table
        sum += ++isum * 100;
      }
  
      if (tableCActivated) {
        value = parseInt(code.charAt(i) + code.charAt(i + 1)); // Add two characters (numeric)
        i += 2;
      } else {
        value = tableB.indexOf(code.charAt(i)); // Add one character
        i += 1;
      }
      barcode += encoding[value];
      sum += ++isum * value;
    }
  
    // Add CRC
    barcode += encoding[sum % 103];
  
    // Stop
    barcode += encoding[106];
  
    // Termination bar
    barcode += '11';
  
    // Generate the barcode HTML
    var barcodeHtml = '';
    for (i = 0; i < barcode.length; i++) {
      if (barcode.charAt(i) === '1') {
        barcodeHtml += '<div style="display: inline-block; background-color: black; width: 1px; height: 20px;"></div>';
      } else if (barcode.charAt(i) === '0') {
        barcodeHtml += '<div style="display: inline-block; background-color: white; width: 1px; height: 20px;"></div>';
      }
    }
  
    return barcodeHtml;
  }