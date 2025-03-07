import moment from 'moment';

const dataCost = (data, checkType) => {
  const map = new Map();

  data.forEach(branch => {
    const {danhSachChiTietChiPhi, idCuaHang} = branch;

    danhSachChiTietChiPhi.forEach(item => {
      const {NgayPhatSinh, SoTien, TenLoaiChiPhi, IDLoaiChiPhi} = item;

      // Tạo khóa dateKey từ NgayPhatSinh dựa trên kiểu check (theo ngày hoặc tháng)
      const dateKey =
        checkType === 'year'
          ? moment(NgayPhatSinh).format('YYYY-MM')
          : moment(NgayPhatSinh).format('YYYY-MM-DD');

      // Kiểm tra xem khóa dateKey đã có trong Map chưa
      const existingEntry = map.get(dateKey);

      // Tạo mục mới và thêm vào Map
      if (!existingEntry) {
        map.set(dateKey, {
          ngayPhatSinh: NgayPhatSinh,
          TenLoaiChiPhi,
          tongTien: SoTien,
          TongCuaHang: [idCuaHang],
          TongLoaiChiPhi: [IDLoaiChiPhi],
        });
        return;
      }

      existingEntry.tongTien += SoTien;

      if (!existingEntry.TongCuaHang.includes(idCuaHang)) {
        existingEntry.TongCuaHang.push(idCuaHang);
      }

      if (!existingEntry.TongLoaiChiPhi.includes(IDLoaiChiPhi)) {
        existingEntry.TongLoaiChiPhi.push(IDLoaiChiPhi);
      }
    });
  });

  const sortResult = [...map.values()].sort((a, b) =>
    moment(a.ngayPhatSinh).diff(moment(b.ngayPhatSinh)),
  );

  map.clear();
  return sortResult;
};

const dataRevenue = (data, checkType) => {
  const map = new Map();

  data.forEach(branch => {
    const {danhSachChiTietDoanhThu, idCuaHang} = branch;

    danhSachChiTietDoanhThu.forEach(item => {
      const {ngayBan, thanhTien, idKhachHang, idSanPham} = item;

      // Kiểm tra xem mục đã tồn tại
      const dateKey = moment(ngayBan).format(
        checkType === 'year' ? 'YYYY-MM' : 'YYYY-MM-DD',
      );

      const existingEntry = map.get(dateKey);

      if (existingEntry) {
        // Cập nhật thông tin cho mục đã tồn tại
        existingEntry.tongTien += thanhTien;
        existingEntry.tongDonHang += 1;

        if (!existingEntry.tongCuaHang.includes(idCuaHang)) {
          existingEntry.tongCuaHang.push(idCuaHang);
        }
        if (!existingEntry.tongKhachHang.includes(idKhachHang)) {
          existingEntry.tongKhachHang.push(idKhachHang);
        }
        if (!existingEntry.tongSanPham.includes(idSanPham)) {
          existingEntry.tongSanPham.push(idSanPham);
        }
      } else {
        // Tạo mới mục nếu chưa tồn tại
        const newEntry = {
          ngayPhatSinh: ngayBan,
          tongTien: thanhTien,
          tongCuaHang: [idCuaHang],
          tongKhachHang: [idKhachHang],
          tongSanPham: [idSanPham],
          tongDonHang: 1,
        };
        map.set(dateKey, newEntry);
      }
    });
  });

  const sortResult = [...map.values()].sort((a, b) =>
    moment(a.ngayPhatSinh).diff(moment(b.ngayPhatSinh)),
  );
  map.clear();

  return sortResult;
};

const dataCustomer = (data, checkType) => {
  const map = new Map();

  data.forEach(branch => {
    const {danhSachChiTietDoanhThu, idCuaHang} = branch;

    danhSachChiTietDoanhThu.forEach(item => {
      const {ngayBan, thanhTien, idKhachHang, idSanPham} = item;

      // Kiểm tra xem mục đã tồn tại
      const dateKey = moment(ngayBan).format(
        checkType === 'year' ? 'YYYY-MM' : 'YYYY-MM-DD',
      );

      const existingEntry = map.get(dateKey);

      if (existingEntry) {
        // Cập nhật thông tin cho mục đã tồn tại
        existingEntry.tongTien += thanhTien;

        if (!existingEntry.tongCuaHang.includes(idCuaHang)) {
          existingEntry.tongCuaHang.push(idCuaHang);
        }
        if (!existingEntry.tongKhachHang.includes(idKhachHang)) {
          existingEntry.tongKhachHang.push(idKhachHang);
        }
      } else {
        // Tạo mới mục nếu chưa tồn tại
        const newEntry = {
          ngayPhatSinh: moment(ngayBan).format(
            checkType === 'year' ? 'YYYY-MM' : 'YYYY-MM-DD',
          ),
          tongTien: thanhTien,
          tongCuaHang: [idCuaHang],
          tongKhachHang: [idKhachHang],
        };
        map.set(dateKey, newEntry);
      }
    });
  });

  const sortResult = [...map.values()].sort((a, b) =>
    moment(a.ngayPhatSinh).diff(moment(b.ngayPhatSinh)),
  );

  map.clear();

  return sortResult;
};
const Index = (data = [], typeReport, checkType) => {
  switch (typeReport) {
    case 'revenue':
      return dataRevenue(data, checkType);
    case 'cost':
      return dataCost(data, checkType);
    case 'customer':
      return dataCustomer(data, checkType);
    default:
      return [];
  }
};

export default Index;
