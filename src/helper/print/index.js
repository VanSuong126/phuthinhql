import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNPrint from 'react-native-print';
import stringBillHtmlIOS from './type/stringBillHtmlIOS';
import stringBillHtmlAndroid from './type/stringBillHtmlAndroid';
import stringShipLabelHtml from './type/stringShipLabelHtml';
import stringQRCodeHtml from './type/stringQRCodeHtml';
import { Platform } from "react-native";
import LocalDB from '~data/asyncStorage';

export async function PrintInvoice({data }) {
  const  dataUser = await LocalDB.getUserData();
  const HoTen  = `${dataUser?.UserInfo?.Ho} ${dataUser?.UserInfo?.Ten}`;
  try {
    if (Platform.OS === 'ios') {
      const htmlContent = stringBillHtmlIOS({ HoTen, data });
      const options = {
        html: htmlContent,
        fileName: 'myPDF',
        directory: 'Documents',
        padding: 0,
        bgColor: "#FFFFFF",
        width: 595, // 148mm = 5.83in * 72
        height: 842, // 210mm = 8.27in * 72
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      RNPrint.print({ filePath: pdf.filePath });
    } else {
      const htmlContent = stringBillHtmlAndroid({ HoTen, data });
      RNPrint.print({ html: htmlContent });
    }
  } catch (error) {
    console.error(error);
  }
};

export async function PrintShipLabel({ data, shipCode }) {
  try {
    if (Platform.OS === 'ios') {
      const htmlContent = stringShipLabelHtml({ data, shipCode });
      const options = {
        html: htmlContent,
        fileName: 'myPDF',
        directory: 'Documents',
        padding: 0,
        bgColor: "#FFFFFF",
        width: 255,
        height: 170, 
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      RNPrint.print({ filePath: pdf.filePath });
    } else {
      const htmlContent = stringShipLabelHtml({ data, shipCode });
      RNPrint.print({ html: htmlContent });
    }
  } catch (error) {
    console.error(error);
  }
};

export async function printQRCode({ ProductName,ProductCode }) {
  try {
    if (Platform.OS === 'ios') {
      const htmlContent = stringQRCodeHtml({ ProductName,ProductCode});
      const options = {
        html: htmlContent,
        fileName: 'myPDF',
        directory: 'Documents',
        padding: 0,
        bgColor: "#FFFFFF",
        width: 255,
        height: 170, 
      };
      const pdf = await RNHTMLtoPDF.convert(options);
      RNPrint.print({ filePath: pdf.filePath });
    } else {
      const htmlContent = stringQRCodeHtml({ProductName,ProductCode });
      RNPrint.print({ html: htmlContent });
    }
  } catch (error) {
    console.error(error);
  }
};
