
import moment from 'moment';
export default function convertDataOrder(data) {
    try {
        if (!data) throw new Error("Không có dữ liệu");
        const magiamGia = data?.MaGiamGia ? JSON.parse(data?.MaGiamGia).map(item => ({
            LoaiGiamGia: item?.LoaiGiamGia,
            MaGiamGia: item?.MaGiamGia,
            SoTienGiam: item?.SoTienGiam,
            SoTienGiamGia: item?.SoTienGiam,
        })):[];

        const dichVuCongThem = data?.DichVuCongThem ? JSON.parse(data?.DichVuCongThem).map(item => ({
            ID: item.IDSanPham,
            SoLuong: item.SoLuong,
            DonGia: item.DonGia,
            IDChiTietDichVuCongThem: item.IDChiTietDichVuCongThem || ""
        })):[];

        const sanPhamDaChon = Array.isArray(JSON.parse(data?.SanPham)) ? JSON.parse(data.SanPham).map(item => ({
            IDSanPham: item.IDSanPham,
            SoLuongMua: item.SoLuong ?? 0,
            GiaBan: item.DonGia ?? 0,
            GiaSauGiam: item.DonGia - item.GiaGiam?? 0,
            ThoiGianBaoHanh: item.ThoiGianBaoHanh ?? null,
            KhoiLuong: item.KhoiLuong ?? null,
            GiaGiamTienMat: item.GiaGiam ?? 0,
            TiLeGiam: item.TiLeGiam ?? 0,
            MaSanPham: item.MaSanPham ?? "",
            TenSanPham: item.TenSanPham ?? "",
            URLImage: item.URLImage ?? "",
            BaoHanh: item.BaoHanh ?? false,
            SuaChua: item.SuaChua ?? false,
            GhiChuTang:item?.GhiChuTang&& Array.isArray(JSON.parse(item.GhiChuTang)) ? JSON.parse(item.GhiChuTang).map(note => ({
                ...note,
                IDMoiQuanHe: note.IDMoiQuanHe ?? 0,
                IDKhachHang: note.IDKhachHang ?? 0,
                MoiQuanHe: note.MoiQuanHe ?? "",
                HoTen: note.HoTen ?? "",
                NgaySinh: note.NgaySinh ?? "",
                LoiNhan: note.LoiNhan ?? "",
                QuaTang: note.QuaTang ?? false,
                SanPhamGieoDuyen: note.SanPhamGieoDuyen ?? false,
                DichVuCongThem: Array.isArray(note.DichVuCongThem) ? note.DichVuCongThem.map(service => ({
                    ...service,
                    IDSanPham: service.IDSanPham ?? 0,
                    SoLuong: service.SoLuong ?? 0,
                    IDChiTietDichVuCongThem: service.IDChiTietDichVuCongThem ?? ""
                })) : [], // Nếu DichVuCongThem không phải là mảng, trả về mảng rỗng
                NoiDungDichVuCongThem: note.NoiDungDichVuCongThem ?? ""
            })) : [] // Nếu GhiChuTang không phải là mảng, trả về mảng rỗng
        })) : [];


        const order = {
            madonchung: data?.MaDonHang,
            loaidonhang: "App PKN4ID",
            dienthoai: data?.DienThoaiNguoiNhan,
            dienthoainhan: data?.DienThoaiKhachHang,
            email: data?.EmailNguoiNhan,
            tenkhachhang: data?.NguoiNhan,
            maquocgia: data?.MaQuocGiaNhan,
            tenquocgia: data?.TenQuocGiaNhan,
            mabang: data?.MaBangNhan,
            tenbang: data?.TenBangNhan,
            tenquan: data?.TenQuanNhan,
            zipcode: data?.ThanhPhoNhan,
            thanhpho: data?.ThanhPhoNhan,
            diachi: data?.DiaChiNhan,
            hinhthucnhanhang: data?.HinhThucNhanHang,
            manhavanchuyen: data?.MaNhaVanChuyen,
            hinhthucthanhtoan: data?.HinhThucThanhToan,
            dichvucongthem: dichVuCongThem,
            ghichudonhang: data?.GhiChu,
            ghichudichvucongthem: "",
            sanphamdachon: sanPhamDaChon,
            nhantaicuahang: data?.HinhThucNhanHang === 3 ? 1 : 0,
            phiship: data?.PhiShip,
            magiamgia: magiamGia,
            sotiengiam: data?.SoTienGiam,
            magiamgias: "",
            sotiengiamtrensanpham: data?.SoTienGiamTrenSanPham,
            ho: data?.HoNguoiNhan,
            ten: data?.TenNguoiNhan,
            vat: data?.VAT,
            ngaydathang: data?.NgayDatHang,
            idkhachhang: data?.IDKhachHang,
            hoKH: data?.Ho,
            tenKH: data?.Ten,
            dienthoaiKH: data?.DienThoai,
            emailKH: data?.Email,
            ngaysinhdate: moment(data?.NgaySinhNhat).format('DD/MM/YYYY'),
            ngaysinh: moment(data?.NgaySinhNhat).format('YYYY-MM-DD'),
        };

        return order;

    } catch (error) {
        console.error("Có lỗi khi chuyển đổi dữ liệu đơn hàng:", error.message);
        return { error: error.message };
    }
};
