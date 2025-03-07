import QRCode from 'qrcode-generator';
import genBarCodeHtml from '~helper/genBarCodeHtml';
import readNumberToWords from '~helper/readNumberToWords';
import formatNumber from '~helper/formatNumber';

const stringBillHtmlAndroid = ({HoTen, data}) => {
  //DATA ORDER
  const MaDonHang = data?.DonHang[0]?.MaDonHang;
  const NgayDatHang = data?.DonHang[0]?.NgayDatHang;
  const HoTenNguoiNhan = data?.DonHang[0]?.HoTenNguoiNhan;
  const DienThoaiKhachHang = data?.DonHang[0]?.DienThoaiKhachHang;
  const DiaChiNhan = data?.DonHang[0]?.DiaChiNhan;
  const TenHinhThucNhanHang = data?.DonHang[0]?.TenHinhThucNhanHang;
  const TenHinhThucThanhToan = data?.DonHang[0]?.TenHinhThucThanhToan;
  const GhiChu =
    data?.DonHang[0]?.GhiChu == null ? '' : data?.DonHang[0]?.GhiChu;
  const GhiChuDichVuCongThem = data?.DonHang[0]?.GhiChuDichVuCongThem;
  const SoTienGiam = data?.DonHang[0]?.SoTienGiam;
  const PhiShip = data?.DonHang[0]?.PhiShip;
  const VAT = data?.DonHang[0]?.VAT;
  const TongSoTien = data?.DonHang[0]?.TongSoTien;
  const TongSoTienThanhToan =
    data?.DonHang[0]?.TongSoTien +
    data?.DonHang[0]?.VAT +
    data?.DonHang[0]?.PhiShip;
  const dataSanPham = data?.SanPham;
  const TongSoLuong = dataSanPham.reduce((acc, item) => acc + item.SoLuong, 0);
  // gen url QRCode
  const qr = QRCode(0, 'L');
  qr.addData(MaDonHang);
  qr.make();
  const qrDataURL = qr.createDataURL();

  function genSanPham(data) {
    return data
      .map(item => {
        const {MaSanPham, TenSanPham, NgayHetHanBaoHanh, SoLuong, ThanhTien} =
          item;
        const barcodeHTML = `<div class="Barcode" style="padding: 0px; overflow: auto; width: 143px;">
                                 ${genBarCodeHtml(MaSanPham)}
                               </div>`;
        const productHTML = `<div style="font-size: 10px;">${TenSanPham}</div>`;
        const warranty =
          NgayHetHanBaoHanh == null
            ? `<td style="text-align: left">Bảo hành trọn đời</td>`
            : NgayHetHanBaoHanh != '-'
            ? `<td style="text-align: left">Đến: ${NgayHetHanBaoHanh}</td>`
            : `<td style="text-align: left">-</td>`;
        const quantityHTML = `<td style="text-align: center">${SoLuong}</td>`;
        const priceHTML = `<td style="text-align: right">${formatNumber(
          ThanhTien,
        )}</td>`;

        return `<tr>
                    <td id="${MaSanPham}" style="padding-bottom: 2px">
                      ${barcodeHTML}
                      ${productHTML}
                    </td>
                   ${warranty}
                    ${quantityHTML}
                    ${priceHTML}
                  </tr>`;
      })
      .join('');
  }
  var html = '';
  return (html = `
        <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Print Page - PhucKhanggems_NetCore</title>
  </head>
  <body cz-shortcut-listen="true">
    <div id="dvHoaDon">
    <style>
    :root {
        /* light - lv1 */
        --color1: #f6821f;
    }

    #dvHoaDon {
      font-size: 12px;
    }

    #dvHoaDon>div {
        position: relative;
    }
    #dvHoaDon>div.dvHoaDon2 {
      font-size: 1.125em;
    }

    #dvHoaDon table {
        width: 100%;
        min-width: 100%;
    }

    #dvHoaDon table tr.trtitle td {
        font-weight: bold;
        color: var(--color1);
        padding-top: 12px;
    }

    #dvHoaDon img.backgroundLogo {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
        width: 450px;
        height: auto;
        display: block;
        margin: auto;
        opacity: 0.10;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        position: absolute;
    }

    #txtPhieuMuaHang {
        font-size: 30px;
        font-weight: bold;
    }

    .txtpan {
        font-size: 12px;
        font-weight: bold;
    }
    .page-break {
        break-after: page;
        margin: 0 auto;
      }

    @media print {
        @page {
            size: 148mm 210mm;
            margin: 0;
            background-color: #ffffff;
        }

        body {
            -webkit-print-color-adjust: exact;
            -moz-print-color-adjust: exact;
            -ms-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: #ffffff;
        }
    }

    @media only screen and (max-device-width: 844px) and (min-device-height: 390px) and (-webkit-device-pixel-ratio: 3) {
        #txtPhieuMuaHang {
            font-size: 20px;
            font-weight: bold;
        }

        #dvHoaDon img.backgroundLogo {
            -webkit-filter: grayscale(100%);
            filter: grayscale(100%);
            width: 70%;
            height: auto;
            display: block;
            margin: auto;
            opacity: 0.10;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            position: absolute;
        }

        .txtpan {
            font-size: 12px;
            font-weight: bold;
        }
    }
</style>
      <div id="dvHoaDon1" class ="page-break" >
        <table id="dvHoaDonHeader" cellpadding="0" style="margin-top: 10px">
          <tbody>
            <tr>
              <td>
                <img style="width: 75px;" class="logoHoaDon" src="https://uat.phuckhanggem.com/_imageslibrary/stores/0.png">
              </td>
              <td style="text-align: center;">
                <div id="txtPhieuMuaHang">PHIẾU MUA HÀNG</div>
                <div style="font-size: 13px;">Ngày mua hàng: <span id="txtNgayDatHang">${NgayDatHang}</span>
                </div>
              </td>
              <td style="text-align: center">
                <div class="QRCode">
                  <img style="width: 50px;" class="logoHoaDon" src=${qrDataURL}>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <hr>
        <table cellpadding="0" style="margin-top: 10px">
          <tbody>
            <tr>
              <td>Khách hàng: <span class="txtpan" id="txtHoTen">${HoTenNguoiNhan}</span>
              </td>
              <td>Điện thoại: <span class="txtpan" id="txtDienThoai">${DienThoaiKhachHang}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">Địa chỉ:</td>
            </tr>
            <tr>
              <td colspan="2" style="font-size: 13px; font-weight: bold; padding: 2px 0" id="txtDiaChi">${DiaChiNhan}</td>
            </tr>
            <tr>
              <td>Nhận hàng: <span class="txtpan" id="txtNhanHang">${TenHinhThucNhanHang}</span>
              </td>
              <td>Thanh toán: <span class="txtpan" id="txtThanhToan">${TenHinhThucThanhToan}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2">Ghi chú:</td>
            </tr>
            <tr>
              <td colspan="2" style="font-weight: bold; font-style: italic; min-height: 100px" id="txtGhiChu">${
                GhiChuDichVuCongThem ? GhiChuDichVuCongThem + '\n' : ''
              }${GhiChu}</td>
            </tr>
          </tbody>
        </table>
        <img class="logoHoaDon backgroundLogo" src="https://uat.phuckhanggem.com/_imageslibrary/stores/0.png">
        <table id="tSanPham" style="margin-top: 10px">
          <tr>
            <th style="padding-bottom: 5px; text-align: left; max-width: 30%;">Tên sản phẩm</th>
            <th style="padding-bottom: 5px; text-align: left">Bảo hành</th>
            <th style="text-align: center; padding-bottom: 5px">Số lượng</th>
            <th style="text-align: right; padding-bottom: 5px">Thành tiền</th>
          </tr> ${genSanPham(dataSanPham)} <tr>
            <th colspan="2" style="padding-top: 10px; padding-right: 10px; text-align: right;">TỔNG CỘNG:</th>
            <th style="padding-top: 10px; text-align: center">${TongSoLuong}</th>
            <th style="padding-top: 10px; text-align: right ">${formatNumber(
              TongSoTien,
            )}</th>
          </tr>
         ${
           SoTienGiam > 0
             ? `<tr>
            <th colspan="2" style="padding-top: 10px; padding-right: 10px; text-align: right;">GIẢM GIÁ:</th>
            <th style="padding-top: 10px; text-align: center">-</th>
            <th style="padding-top: 10px; text-align: right ">${formatNumber(
              SoTienGiam,
            )}</th>`
             : ``
         }
          </tr>
          <tr>
           ${
             PhiShip > 0
               ? `<th colspan="2" style="padding-top: 10px; padding-right: 10px; text-align: right;">GIAO HÀNG:</th>
            <th style="padding-top: 10px; text-align: center">-</th>
            <th style="padding-top: 10px; text-align: right ">${formatNumber(
              PhiShip,
            )}</th>`
               : ``
           }
          </tr>
         ${
           VAT > 0
             ? ` <tr>
            <th colspan="2" style="padding-top: 10px; padding-right: 10px; text-align: right;">VAT:</th>
            <th style="padding-top: 10px; text-align: center">-</th>
            <th style="padding-top: 10px; text-align: right ">${formatNumber(
              VAT,
            )}</th>`
             : ``
         }
          </tr>
          <tr>
            <th colspan="2" style="padding-top: 10px; padding-right: 10px; text-align: right;">TỔNG THANH TOÁN:</th>
            <th style="padding-top: 10px; text-align: center">${TongSoLuong}</th>
            <th style="padding-top: 10px; text-align: right ">${formatNumber(
              TongSoTienThanhToan,
            )}</th>
          </tr>
          <tr>
            <td colspan="4" style="text-align: right; font-style: italic">(*) ${readNumberToWords(
              TongSoTienThanhToan,
            )}</td>
          </tr>
        </table>
        <hr>
        <table >
          <tbody>
            <tr>
              <td style="font-size: 9px; font-weight: bold; font-style: italic; color: var(--color1)"> * Hàng mua rồi miễn đổi trả. Vui lòng kiểm tra kỹ trước khi rời cửa hàng. </td>
              <td style="text-align: right"> * <span id="txtMaDonHang">${MaDonHang}</span> | <span id="txtSoTrang">1</span>/ <span class="txtTongSoTrang">1</span>
              </td>
            </tr>
            <tr>
              <td style="text-align: right" colspan="2"> Người lập phiếu: <span style="font-weight: bold">${HoTen}</span>
              </td>
            </tr>
          </tbody>
        </table >
      </div>

      <div class="dvHoaDon2">
        <table cellpadding="0" style="font-size: 14px;position: relative; top: 10px;">
          <tbody>
            <tr class="trtitle">
              <td style="padding: 0px">1. KHÁCH HÀNG KHI MANG SẢN PHẨM ĐẾN BẢO HÀNH</td>
            </tr>
            <tr>
              <td> - Đọc chính xác Số điện thoại/Mã thẻ khách hàng thân thiết/Mã phiếu thanh toán để nhân viên kiểm tra bảo hành. </td>
            </tr>
            <tr>
              <td>- Yêu cầu nhân viên chụp ảnh lại tình trạng sản phẩm của mình khi mang đến bảo hành.</td>
            </tr>
            <tr class="trtitle">
              <td>2. CÁC TRƯỜNG HỢP ĐƯỢC BẢO HÀNH MIỄN PHÍ</td>
            </tr>
            <tr>
              <td>- Đối với sản phẩm sẽ được bảo hành miễn phí trong trường hợp bị lỗi do sản xuất.</td>
            </tr>
            <tr>
              <td>- Làm mới, đánh bóng.</td>
            </tr>
            <tr>
              <td> - Gắn lại đá tấm khi bị rơi (trừ trường hợp kim cướng tấm, kim cương viên rời, đá quý tấm đều không được bảo hành). </td>
            </tr>
            <tr>
              <td>- Lên/Xuống, chỉnh sửa size (miễn phí 2 size đầu)</td>
            </tr>
            <tr>
              <td> - Hàn nối dây, hàn điểm (những trường hợp cần nối thêm vàng phải mất tiền nguyên liệu vàng để hàn). </td>
            </tr>
            <tr class="trtitle">
              <td>3. CÁC TRƯỜNG HỢP BẢO HÀNH MẤT PHÍ</td>
            </tr>
            <tr>
              <td>- Thay các loại đá chủ bị rơi, các loại đá tấm theo yêu cầu.</td>
            </tr>
            <tr>
              <td>- Xi lại - Hàn phải thêm nguyên liệu vàng - Thay móc - Khắc Laze.</td>
            </tr>
            <tr>
              <td>- Các sản phẩm bị hỏng trong quá trình khách hàng sử dụng.</td>
            </tr>
            <tr>
              <td> - Các sản phẩm bị hỏng móc - Biến dạng - Gãy - Rơi đá chủ...sẽ tính phí theo biểu phí và được hỗ trợ từ 10% - 50% (tùy thời điểm). </td>
            </tr>
            <tr>
              <td>- Các sản phẩm thay đá các loại sẽ tính phí theo biểu giá phí.</td>
            </tr>
            <tr class="trtitle">
              <td>4. THỜI GIAN BẢO HÀNH</td>
            </tr>
            <tr>
              <td>- Sản phẩm được bảo hành trọn thời gian bảo hành của sản phẩm.</td>
            </tr>
            <tr>
              <td>- Sản phẩm làm mới, đánh bóng, xi mạ sẽ nhận lại sản phẩm sau 03 ngày trở lên.</td>
            </tr>
            <tr>
              <td>- Sản phẩm hàn lại, chỉnh size, gắn đá, làm thêm móc,... sẽ nhận lại sản phẩm sau 07 ngày.</td>
            </tr>
            <tr class="trtitle">
              <td>5. THÔNG TIN BẢO HÀNH</td>
            </tr>
            <tr>
              <td>- Khách hàng có thể đến bất kỳ showroom nào của Phúc Khang để bảo hành sản phẩm.</td>
            </tr>
            <tr>
              <td> - Truy cập website: <b style="color: var(--color1)">http://www.phuckhanggem.com</b> để xem thêm thông tin bảo hành/cửa hàng. </td>
            </tr>
            <tr>
              <td>- Hotline: <b style="color: var(--color1)">0938178938</b>. </td>
            </tr>
          </tbody>
        </table>
        <img class="logoHoaDon backgroundLogo" src="https://uat.phuckhanggem.com/_imageslibrary/stores/0.png">
      </div>
    </div>
  </body>
</html> `);
};
export default stringBillHtmlAndroid;
