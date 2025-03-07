import { TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import Toast from 'react-native-toast-message';


import {
  MyView,
  MySafeAreaView,
  MyText,
  MyAvoidView,
} from '~components/MyStyles';
import { salesActions, salesSelectors } from '~redux/reducers';
import fetchData from '~providers';
import { parseSizeHeight, parseSizeWidth, FontStyles, Colors, Sizes } from '~theme';
import Icon from '~components/IconXML';
import WishLuck from '~components/WishLuck';
import InputMutiLine from '~components/inputs/InputMutiLine';
import TabControl from '~components/TabControl';
import Bottom from '~components/Bottom';
import FormAddRelationship from '~components/FormAddRelationship';
import ModalPicker from '~modals/ModalPicker';

const Index = props => {
  const { productCode, customerCode } = props?.route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { t } = useTranslation();

  const [note, setNote] = useState('');
  const [gift, setGift] = useState(false);
  const [merit, setMerit] = useState(false);
  const [wishLuck, setWishLuck] = useState('');
  const [typeData, setTypeData] = useState(0);
  const [dataRelationshipNew, setDataRelationshipNew] = useState();
  const [relationshipSelected, setRelationshipSelected] = useState();
  const [listRelationShip, setListRelationShip] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);

  const orderData = useSelector(state => salesSelectors.selectDataSales(state));


  const handleIndexChange = index => {
    setTypeData(index);
    if (index === 1 && !relationshipSelected) {
      getDataRelationShip();
    }
  };

  const getDataRelationShip = () => {
    fetchData(dispatch, "getRelationBuyer", { idkhachhang: customerCode }, (res) => {
      if (res?.success === true) {
        setListRelationShip(res?.data)
        setVisibleModal(true);
      }
    })
  }

  const handleClean = () => {
    setNote('');
    setGift(false);
    setMerit(false);
  }
  const addNewRelationship = () => {
    // Bắt đầu bằng cách sao chép đối tượng dataRelationShip hiện tại
    const updatedDataRelationShip = { ...dataRelationshipNew };
    // Đặt biến kiểm soát có lỗi hay không
    let hasError = false;
    const checks = [
      { condition: !dataRelationshipNew?.HoTen, errorKey: 'HoTenError', message: t('emptyFullName') },
      { condition: !dataRelationshipNew?.MoiQuanHe, errorKey: 'MoiQuanHeError', message: t('emptyRelationship') },
      { condition: !dataRelationshipNew?.NgaySinh, errorKey: 'NgaySinhError', message: t('emptyBirthday') },
    ];

    for (let check of checks) {
      if (check.condition) {
        updatedDataRelationShip[check.errorKey] = check.message; // Gán thông báo lỗi vào đối tượng dataRelationShip
        hasError = true; // Đánh dấu rằng có lỗi
      } else {
        updatedDataRelationShip[check.errorKey] = ''; // Xóa thông báo lỗi nếu không có lỗi
      }
    }
    // Nếu có lỗi, cập nhật trạng thái và dừng hàm
    if (hasError) {
      setDataRelationshipNew(updatedDataRelationShip);
      return false;
    }
    // nếu không lỗi thì thêm  mối quan hệ mới
    fetchData(dispatch, "updateBuyer", { loai: 2, idkhachhang: customerCode, dsmoiquanhe: [dataRelationshipNew] }, (res) => {
      if (res?.success === true) {
        const dataNote = {
          "IDMoiQuanHe": res?.data?.IDMoiQuanHe,
          "IDKhachHang": customerCode,
          "MoiQuanHe": dataRelationshipNew?.MoiQuanHe,
          "HoTen": dataRelationshipNew?.HoTen,
          "GioiTinh": dataRelationshipNew?.GioiTinh,
          "NgaySinh": dataRelationshipNew?.NgaySinh,
          "LoiNhan": note,
          "QuaTang": gift,
          "SanPhamGieoDuyen": merit,
          "DichVuCongThem": wishLuck?.DichVuCongThem,
          "NoiDungDichVuCongThem": wishLuck?.NoiDungDichVuCongThem
        }
        addNoteToProduct(dataNote);
      }
      else {
        Toast.show({
          type: 'error',
          props: { message: res?.message },
        });
      }
    })
  }
  // handle button Add service
  const handAddService = () => {
    // typeData =0 handle  add new Relationship
    if (typeData === 0) {
      addNewRelationship();
    }
    // handle add note for relationship selected
    else {
      const dataNote = {
        "IDMoiQuanHe": relationshipSelected?.IDMoiQuanHe,
        "IDKhachHang": customerCode,
        "MoiQuanHe": relationshipSelected?.MoiQuanHe,
        "HoTen": relationshipSelected?.HoTen,
        "GioiTinh": relationshipSelected?.GioiTinh,
        "NgaySinh": relationshipSelected?.NgaySinh,
        "LoiNhan": note,
        "QuaTang": gift,
        "SanPhamGieoDuyen": merit,
        "DichVuCongThem": wishLuck?.DichVuCongThem,
        "NoiDungDichVuCongThem": wishLuck?.NoiDungDichVuCongThem

      }
      addNoteToProduct(dataNote);
    }
  }
  // add note to Product
  const addNoteToProduct = data => {
    // clone data
    const updatedOrderData = { ...orderData };
    let noteChange = 0; // data not change
    // find product 
    const sanPham = updatedOrderData.sanphamdachon.find(sp => sp.MaSanPham === productCode);
    // id exist product
    if (sanPham) {
      // check GhiChuTang is Array
      if (Array.isArray(sanPham.GhiChuTang)) {
        // find MoiQuanHe in GhiChuTang
        const existingRelationship = sanPham.GhiChuTang.find(note => note.IDMoiQuanHe === data.IDMoiQuanHe);
        if (existingRelationship) {
          // if exist notification existingRelationship
          Toast.show({
            type: 'error',
            props: { message: t('existingGif') },
          });
          noteChange = 1;
          return;
        } else {
          // if not exist push data to GhiChuTang
          sanPham.GhiChuTang.push(data);
        }
      } else {
        // add Array GhiChiTang if not exist
        sanPham.GhiChuTang = [data];
      }
    }
    if (noteChange !== 1) {
      dispatch(salesActions.setDataSales(updatedOrderData))
      navigation.goBack();
    }
  }

  return (
    <MySafeAreaView style={styles.container}>
      <MyView style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconHeader} >
          <Icon name="leftArrow" width="24" height="24" color="#454545" />
        </TouchableOpacity>
        <MyText style={styles.txtHeader}>{t('serviceOnProduct')}</MyText>
        <TouchableOpacity
          onPress={handleClean}
          style={styles.iconHeader}
        >
          <Icon name="renew" width="24" height="24" />
        </TouchableOpacity>
      </MyView>
      <MyAvoidView style={styles.content}>
        <MyView style={styles.body}>
          <Pressable style={styles.wrapItemService} onPress={() => setGift(!gift)}>
            <MyView style={styles.wrapNameService}>
              <Icon name={'dvctOther'} width="36" height="36" />
              <MyText style={styles.nameExtraService}>{t('gift')}</MyText>
            </MyView>
            <Icon name="tickBorderGreen" width="24" height="24" color={gift ? Colors.semantics_Green_02 : Colors.neutrals_500} />
          </Pressable>
          <Pressable style={styles.wrapItemService} onPress={() => setMerit(!merit)}>
            <MyView style={styles.wrapNameService}>
              <Icon name={'dvctOther'} width="36" height="36" />
              <MyText style={styles.nameExtraService}>{t('meritProduct')}</MyText>
            </MyView>
            <Icon name="tickBorderGreen" width="24" height="24" color={merit ? Colors.semantics_Green_02 : Colors.neutrals_500} />
          </Pressable>
          <WishLuck getData={data => setWishLuck(data)} />
          <MyView style={styles.wrapNote}>
            <InputMutiLine
              labelName={t('noteService')}
              value={note}
              onChangeText={value => setNote(value)}
              maxLength={300}
            />
          </MyView>
          <TabControl
            tabs={[t('addNew'), t('list')]}
            selectedIndex={typeData}
            onTabPress={handleIndexChange}
          />
          {typeData === 0 ? (
            <FormAddRelationship data={dataRelationshipNew} onChange={data => setDataRelationshipNew(data)} />
          ) : (
            relationshipSelected ? (  // Đảm bảo sử dụng điều kiện đúng
              <MyView style={styles.wrapInfoRelation}>
                <Pressable style={styles.wrapIconClear} onPress={() => setRelationshipSelected()}>
                  <Icon name="undo" width="24" height="24" />
                </Pressable>
                <MyView style={styles.wrapInfo}>
                  <MyText style={styles.textInfo}>{relationshipSelected?.MoiQuanHe}</MyText>
                  <MyText style={styles.textInfo}>{relationshipSelected?.HoTen} | {relationshipSelected?.GioiTinhText}</MyText>
                  <MyText style={styles.textInfo}>
                    {relationshipSelected?.NgaySinh ? moment(relationshipSelected?.NgaySinh).format('DD/MM/YYYY') : ''}
                  </MyText>
                  <MyText style={styles.textInfo}>{relationshipSelected?.GhiChu}</MyText>
                </MyView>
              </MyView>
            ) : null  // Nếu không có relationshipSelected, render null
          )}
        </MyView>
      </MyAvoidView>
      <Bottom
        sticky={false}
        titleBtn1={t('addService')}
        onPress1={() => handAddService()}
      />
      <ModalPicker
        isVisible={visibleModal}
        onClose={() => setVisibleModal(false)}
        data={listRelationShip}
        typeFlatlist="relationship"
        selected={item => setRelationshipSelected(item)}
      />
    </MySafeAreaView>
  );
};

export default Index;



const styles = StyleSheet.create({
  toggle: {
    flexDirection: 'row',
    gap: parseSizeWidth(10)
  },
  onToggle: {
    width: parseSizeWidth(47),
    height: parseSizeHeight(24),
    borderRadius: 100,
    backgroundColor: Colors.semantics_Green_02,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  offToggle: {
    width: parseSizeWidth(47),
    height: parseSizeHeight(24),
    borderRadius: 100,
    backgroundColor: Colors.neutrals_400,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: Colors.neutrals_300,
  },
  thumbStyle: {
    width: 22,
    height: 22,
    borderRadius: 17,
  },
  note: {
    marginTop: Sizes.spacing_3_Height,
  },
  tittleNote: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_tagline1,
    fontWeight: '500',

    textAlign: 'left',
    color: Colors.neutrals_700,
    marginBottom: parseSizeHeight(5),
  },
  input: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_body2,
    color: Colors.neutrals_900,
    fontSize: Sizes.text_subtitle1,
    textAlignVertical: 'top',
    height: parseSizeHeight(136),
    backgroundColor: Colors.neutrals_200,
    borderRadius: 8,
    paddingHorizontal: parseSizeWidth(20),
    paddingVertical: parseSizeHeight(13),
  },
  txtHeader: {
    height: parseSizeHeight(28),
    fontFamily: FontStyles.InterSemiBold,
    fontSize: Sizes.text_h5,
    fontWeight: '600',
    textAlign: 'center',
    flex: 1,
  },
  bottom: {
    marginBottom: parseSizeHeight(48),
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  body: {
    flex: 1,
    gap: parseSizeHeight(10),
  },
  header: {
    height: Sizes.spacing_9_Height,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: Sizes.paddingHeight,
    gap: Sizes.spacing_3_Height,
    backgroundColor: Colors.neutrals_100,
    paddingHorizontal: Sizes.paddingHeight,
  },
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },


  wrapItemService: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(12),
    backgroundColor: Colors.neutrals_100,
    borderColor: Colors.neutrals_300,
    borderWidth: 1,
  },
  wrapNameService: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.spacing_2_Width,
  },
  nameExtraService: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle1,
    fontWeight: '500',
    textAlign: 'left',
    color: Colors.semantics_Black,
  },
  wrapNote: {
    paddingHorizontal: Sizes.paddingWidth,
    paddingVertical: parseSizeHeight(12),
    backgroundColor: Colors.neutrals_100,
    borderColor: Colors.neutrals_300,
    borderWidth: 1,
  },

  // style Relationship
  wrapInfoRelation: {
    paddingVertical: parseSizeHeight(12),
    paddingHorizontal: Sizes.paddingWidth,
    backgroundColor: Colors.neutrals_100,
  },
  wrapInfo: {
    gap: parseSizeHeight(10),
  },
  textInfo: {
    fontFamily: FontStyles.InterRegular,
    fontSize: Sizes.text_subtitle2,
    fontWeight: '500',
    color: Colors.semantics_Grey,
  },
  wrapIconClear: {
    position: 'absolute',
    right: parseSizeWidth(24),
    top: parseSizeHeight(0),
    padding: parseSizeWidth(10),
    zIndex: 2,
  }

});