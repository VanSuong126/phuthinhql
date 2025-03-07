
import QRCode from 'qrcode-generator';

const stringQRCodeHtml = ({ ProductName, ProductCode }) => {
    // gen url QRCode
    const qr = QRCode(0, 'L');
    qr.addData(ProductCode);
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
                        size: 80mm 40mm;
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
                            <img style="width: 100px; margin-top: 5px;" src=${qrDataURL}> 
                            <div style="width: 2px; height: 100px; background: linear-gradient(to bottom, #000 50%, transparent 50%); background-size: 100% 4px;"></div>
                            <div style="display: flex; align-items: center; justify-content: space-between; flex-direction: column;">
                            <span>${ProductName}</span>
                            <img style="width: 100px;margin-top: 5px;" src="https://uat.phuckhanggem.com/_imageslibrary/logonotext.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    </html>`
}
export default stringQRCodeHtml;
