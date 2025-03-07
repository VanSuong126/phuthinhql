
import genBarCodeHtml from "~helper/genBarCodeHtml";
import formatNumber from "~helper/formatNumber";
import QRCode from 'qrcode-generator';

const stringShipLabelHtml = ({ data, shipCode }) => {
  //DATA ORDER
  const HoTenNguoiNhan = data?.NguoiNhan;
  let DienThoaiNguoiNhan = data?.DienThoaiKhachHang;
  const DienThoai = DienThoaiNguoiNhan ? DienThoaiNguoiNhan.replace(DienThoaiNguoiNhan.substring(2, 5), '***') : DienThoaiNguoiNhan;
  let DiaChiNguoiNhan = data?.DiaChiNhan;
  const DiaChi = DiaChiNguoiNhan ? DiaChiNguoiNhan.replace(DiaChiNguoiNhan.substring(0, 5), '***') : DiaChiNguoiNhan;

  // gen url QRCode
  const qr = QRCode(0, 'L');
  qr.addData(shipCode);
  qr.make();
  const qrDataURL = qr.createDataURL();
  var html = '';
  return html =
    `
    <html>
    <head>
    </head>
    <body>
        <div id="dvNhanDan">
            <style>
                @media print {
                    @page {
                        size: 90mm 60mm;
                        margin: 0;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        -moz-print-color-adjust: exact;
                        -ms-print-color-adjust: exact;
                        print-color-adjust: exact;
                        margin: 0;
                        padding: 0;
                    }
                }   
                #divNhanDanContent {
                    height: 100vh !important;
                    display: flex;
                    flex-direction: column;
                   
                }
        
                    #divNhanDanContent .background {
                        padding: 10px;
                        border: 1px solid #808080;
                    }
        
                    #divNhanDanContent #dvNhanDan1 {
                        flex: 1;
                        padding: 5px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        
                    }
        
                        #divNhanDanContent #dvNhanDan1 > div {
                            padding: 1.5%;
                        }
        
                        #divNhanDanContent #dvNhanDan1 img {
                            width: 75px;
                        }
        
                        #divNhanDanContent #dvNhanDan1 #sub-dvNhanDan1-1 {
                            display: flex;
                            justify-content: space-between;
                            align-content: center;
                            align-items: center;
                            font-size: 8px;
                        }
        
                            #divNhanDanContent #dvNhanDan1 #sub-dvNhanDan1-1 svg {
                                width: 11px !important;
                                height: 11px !important;
                                margin-right: 3px;
                            }
        
                            #divNhanDanContent #dvNhanDan1 #sub-dvNhanDan1-1 > div:first-child > div {
                                display: flex;
                                align-content: center;
                            }
        
                        #divNhanDanContent #dvNhanDan1 #sub-dvNhanDan1-2 {
                            font-size: 10px;
                            flex: 1;
                            display: flex;
                            flex-direction: column;
                            justify-content: center;
                            margin: 3px 0;
                            
                        }
        
                            #divNhanDanContent #dvNhanDan1 #sub-dvNhanDan1-2 svg {
                                width: 13px !important;
                                height: 13px !important;
                                margin-right: 5px;
                            }
        
                        #divNhanDanContent #dvNhanDan1 #sub-dvNhanDan1-3 {
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            font-size: 20px;
                            padding-left: 20px;
                            border-top-left-radius: 10px;
                        }
        
                            #divNhanDanContent #dvNhanDan1 #sub-dvNhanDan1-3 > div:last-child {
                                flex: 0;
                                text-align: center;
                                font-size: 12px;
                            }
            </style>
            <div id="divNhanDanContent">
                <div id="dvNhanDan1">
                    <div id="sub-dvNhanDan1-2" class="background">
                        <div style="display: flex;align-items:center; justify-content: space-between;">
                            <div style="font-weight: bold; font-size: 16px;" >Mã vận chuyển:${shipCode} </div>
                            <img style="width: 40px;margin-right:10; " src=${qrDataURL}>
                        </div>
                        <div style="display: flex; justify-content: space-between; white-space: nowrap;align-items: center;">
                            <div  style="display: flex; align-items: center;font-weight: bold;">
                                <span>
                                    <svg fill="currentColor" class="bi bi-person-heart" viewBox="0 0 16 16">
                                        <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
                                    </svg>
                                </span>
                                <span id="txtHoTen">${HoTenNguoiNhan}</span>
                            </div>
                            <div  style="display: flex; align-items: center;font-weight: bold;">
                                <span>
                                    <svg fill="currentColor" class="bi bi-phone-fill" viewBox="0 0 16 16">
                                        <path d="M3 2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V2zm6 11a1 1 0 1 0-2 0 1 1 0 0 0 2 0z" />
                                    </svg>
                                </span>
                                <span id="txtDienThoai">${DienThoai}</span>
                            </div>
                        </div>
                        <div  style="display: flex; align-items: center;font-weight: bold;">
                            <span>
                                <svg fill="currentColor" class="bi bi-house-heart-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd" d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.707L8 2.207l6.646 6.646a.5.5 0 0 0 .708-.707L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.707 1.5Z" />
                                    <path fill-rule="evenodd" d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6Zm0 5.189c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.691 0-5.018Z" />
                                </svg>
                            </span>
                            <span id="txtDiaChi">${DiaChi}</span>
                        </div>
                        <div style="margin-top: 5;">
                            <span style="text-align: center; font-style: italic;font-size: 10px;" >Anh giao hàng thân mến</br></span>
                            <span style="text-align: center; font-style: italic;font-size: 10px;">Cảm ơn anh, vất vả cho anh quá!</br></span>
                            <span style="text-align: center; font-style: italic;font-size: 10px;">Vị khách hàng này vô cùng quan trọng, rất mong anh mang theo nụ cười phục vụ Quý Khách này và đối đãi nhẹ nhàng với gói hàng này nhé!</span>
                        </div>
                    </div>
                    <div id="sub-dvNhanDan1-1" class="background">
                        <div>
                            <div>
                                <div>
                                    <svg fill="currentColor" class="bi bi-facebook" viewBox="0 0 20 20">
                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z" />
                                    </svg>
                                </div>
                                <div>https://www.facebook.com/daphongthuyThienTrang/</div>
                            </div>
                            <div>
                                <div>
                                    <svg fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                                    </svg>
                                </div>
                                <div id="txtDienThoaiCuaHang">0938 178 938 - 0939 619 111</div>
                            </div>
                            <div>
                                <div>
                                    <svg fill="currentColor" class="bi bi-envelope-paper-heart-fill" viewBox="0 0 20 20">
                                        <path fill-rule="evenodd" d="m3 7.5 3.5 2L8 8.75l1.5.75 3.5-2v-6A1.5 1.5 0 0 0 11.5 0h-7A1.5 1.5 0 0 0 3 1.5v6ZM2 3.133l-.941.502A2 2 0 0 0 0 5.4v.313l2 1.173V3.133Zm12 3.753 2-1.173V5.4a2 2 0 0 0-1.059-1.765L14 3.133v3.753Zm-3.693 3.324L16 6.873v6.5l-5.693-3.163Zm5.634 4.274L8 10.072.059 14.484A2 2 0 0 0 2 16h12a2 2 0 0 0 1.941-1.516ZM5.693 10.21 0 13.372v-6.5l5.693 3.338ZM8 1.982C9.664.309 13.825 3.236 8 7 2.175 3.236 6.336.31 8 1.982Z" />
                                    </svg>
                                </div>
                                <div>phuckhanggem@gmail.com</div>
                            </div>
                            <div>
                                <div>
                                    <svg fill="currentColor" class="bi bi-globe2" viewBox="0 0 20 20">
                                        <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287V1.077zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332zM8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5H4.51zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741H8.5zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008h2.49zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
                                    </svg>
                                </div>
                                <div id="txtDiaChiWebCuaHang">www.phuckhanggem.com - www.daphongthuyphuckhang.com</div>
                            </div>
                        </div>
                        <div><img style="width: 50px;" src="https://uat.phuckhanggem.com/_imageslibrary/stores/0.png"></div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>`
}
export default stringShipLabelHtml;
