import moment from 'moment';

const dataRevenue = (data, id) => {
  //gộp danh sách chi tiết daanh thủ của các cửa hàng lại
  const dataListDetail = data.reduce((acc, item) => {
    return acc.concat(item.danhSachChiTietDoanhThu);
  }, []);

  //lọc theo khách hàng
  const fillterDataByCustomer = dataListDetail.reduce((acc, item) => {
    const existing = acc.find(
      entry => entry?.idKhachHang === item?.idKhachHang,
    );

    if (existing) {
      existing.tongDonHang += 1;
      existing.tongTien += item?.thanhTien;
      if (!existing.idSanPham.includes(item?.idSanPham)) {
        existing.idSanPham.push(item?.idSanPham);
      }
    } else {
      acc.push({
        idSanPham: [item?.idSanPham],
        tongTien: item?.thanhTien,
        tongDonHang: 1,
        khachHang: 1,
        idKhachHang: item?.idKhachHang,
        tenKhachHang: item?.tenKhachHang,
      });
    }
    return acc;
  }, []);

  //lọc theo sản phẩm
  const fillterDataByProduct = dataListDetail.reduce((acc, item) => {
    const existing = acc.find(entry => entry?.idSanPham === item?.idSanPham);

    if (existing) {
      existing.tongDonHang += 1;
      existing.tongTien += item?.thanhTien;
      if (!existing.idKhachHang.includes(item?.idKhachHang)) {
        existing.idKhachHang.push(item?.idKhachHang);
      }
    } else {
      acc.push({
        idSanPham: item?.idSanPham,
        tenSanPham: item?.tenSanPham,
        tongTien: item?.thanhTien,
        tongDonHang: 1,
        sanPham: 1,
        idKhachHang: [item?.idKhachHang],
      });
    }
    return acc;
  }, []);

  //lọc theo loại đơn hàng
  const fillterDataByOrder = dataListDetail.reduce((acc, item) => {
    const existing = acc.find(
      entry => entry?.idHinhThucNhanHang === item?.idHinhThucNhanHang,
    );

    if (existing) {
      existing.tongTien += item?.thanhTien;
      existing.tongDonHang += 1;
      if (!existing.idSanPham.includes(item?.idSanPham)) {
        existing.idSanPham.push(item?.idSanPham);
      }
      if (!existing.idKhachHang.includes(item?.idKhachHang)) {
        existing.idKhachHang.push(item?.idKhachHang);
      }
    } else {
      acc.push({
        idSanPham: [item?.idSanPham],
        idKhachHang: [item?.idKhachHang],
        tenKhachHang: item?.tenKhachHang,
        idHinhThucNhanHang: item?.idHinhThucNhanHang,
        tenHinhThucNhanHang: item?.tenHinhThucNhanHang,
        tongTien: item?.thanhTien,
        tongDonHang: 1,
      });
    }
    return acc;
  }, []);

  const dataCheckByID =
    id === 2
      ? fillterDataByProduct
      : id === 3
      ? fillterDataByOrder
      : fillterDataByCustomer;

  return dataCheckByID;
};

const dataCost = (data, id) => {
  //lọc theo đơn hàng
  if (id === 1) {
    const dataListDetail = data.reduce((acc, item) => {
      return acc.concat(item.danhSachChiTietChiPhi);
    }, []);
    const filteredData = dataListDetail.reduce((acc, item) => {
      const existing = acc.find(entry => entry.MaDonHang === item.MaDonHang);

      if (existing) {
        existing.tongTien += item.SoTien;
        existing.TongLoaiChiPhi += 1;
      } else {
        acc.push({
          tongTien: item.SoTien,
          TongLoaiChiPhi: 1,
          MaDonHang: item.MaDonHang,
          IDLoaiChiPhi: item?.IDLoaiChiPhi,
          TenLoaiChiPhi: item?.TenLoaiChiPhi,
        });
      }

      return acc;
    }, []);
    return filteredData;
  }

  //lọc theo loại chi phí
  if (id === 2) {
    return data.reduce((acc, branch) => {
      const {danhSachChiTietChiPhi, idCuaHang} = branch;

      // Lọc loại chi phí và tính tổng chi nhánh
      danhSachChiTietChiPhi.forEach(item => {
        const {IDLoaiChiPhi, SoTien, TenLoaiChiPhi} = item;

        // Tạo mới nếu chưa có IDLoaiChiPhi
        if (!acc[IDLoaiChiPhi]) {
          acc[IDLoaiChiPhi] = {
            IDLoaiChiPhi,
            TenLoaiChiPhi: TenLoaiChiPhi,
            tongTien: SoTien,
            TongCuaHang: [idCuaHang],
          };
        } else {
          acc[IDLoaiChiPhi].tongTien += SoTien;

          // Nếu chưa có cửa hàng trùng trước đó
          if (!acc[IDLoaiChiPhi].TongCuaHang.includes(idCuaHang)) {
            acc[IDLoaiChiPhi].TongCuaHang.push(idCuaHang);
          }
        }
      });
      return acc;
    }, {});
  }
};

const dataInventory = data => {
  return data.map(branch => {
    return {
      ...branch,
      tongTien: branch.tongTienSanPhamTonKho,
    };
  });
};

const dataCustomer = (data, id) => {
  if (id === 1) {
    const today = moment().startOf('day');

    data.forEach(customer => {
      const birthday = moment(customer.ngaySinhNhat).startOf('day');
      const currentYear = today.year();

      let birthdayThisYear = birthday.year(currentYear);

      if (birthdayThisYear.isBefore(today)) {
        birthdayThisYear.add(1, 'year');
      }

      const differenceInDays = birthdayThisYear.diff(today, 'days');
      customer.soNgayToiSinhNhat = differenceInDays;
    });
    return data.sort((a, b) => a.soNgayToiSinhNhat - b.soNgayToiSinhNhat);
  }

  return data;
};

const DataSort = (data = [], typeReport, sortByListID) => {
  let dataResult = [];
  switch (typeReport) {
    case 'revenue':
      dataResult = Object.values(dataRevenue(data, sortByListID));
      break;
    case 'cost':
      dataResult = Object.values(dataCost(data, sortByListID));
      break;
    case 'wareHoue':
      dataResult = dataInventory(data);
      break;
    case 'customer':
      dataResult = dataCustomer(data, sortByListID);
      break;
    case 'order':
      dataResult = data || [];
      break;
    default:
      dataResult = [];
  }
  return dataResult;
};

export default DataSort;
