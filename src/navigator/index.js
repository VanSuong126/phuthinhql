import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  Splash,
  Login,
  Register,
  ChangePassword,
  Home,
  Profile,
  ScanAll,
  Sell,
  ScanSell,
  SelectedProducts,
  WarrantyAndRepair,
  WareHouse,
  InforUser,
  DetailOrderCreate,
  AdditionalService,
  SelectService,
  Promotion,
  InforOrder,
  Print,
  Checks,
  CreateEditCheckPoint,
  ListCheckPoint,
  HistoryCheckIn,
  Checkin,
  Report,
  OverViewReport,
  DetailReport,
  Chart,
  Manage,
  ManageCustomer,
  AddNewCustomer,
  UpdateCustomer,
  ManageProduct,
  FormAddNewUpdateProduct,
  FormUpLoadImage,
  AdjustProduct,
  AddGroupProdcut,
  ManageOrder,
  ScanHandleOrder,
  ListOrderScan,
  ManageDraftOrder,
  ManageRequestOrder,
  ListOrderManage,
  ShipOrder,
  ChangeAddressOrder,
  ManageNotify,
  SelectCustomer,
  ManageDiscount,
  CreateDiscount,
  ZaloOA,
  NotifiMail,
  ManagerStaff,
  CreateStaff,
  ManageStories,
  AddStories,
  ReportCompare,
  Cost,
  EnterCost,
  ListCost,
} from '~screens';

const Stack = createNativeStackNavigator();

const Navigation = ({skipScreen}) => {
  // Xác định màn hình khởi tạo dựa trên giá trị của skipScreen
  let initialRouteName = 'Splash';
  if (skipScreen === 'skipSplash') {
    initialRouteName = 'Login';
  } else if (skipScreen === 'skipLogin') {
    initialRouteName = 'Home';
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName} // Đặt màn hình khởi tạo
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
        }}>
        {/* login*/}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ChangePassword" component={ChangePassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="quet-ma" component={ScanAll} />
        <Stack.Screen name="Profile" component={Profile} />
        {/* sell*/}
        <Stack.Screen name="tao-don-hang" component={Sell} />
        <Stack.Screen name="quet-ma-ban-hang" component={ScanSell} />
        <Stack.Screen name="kho-hang" component={WareHouse} />
        <Stack.Screen name="thong-tin-khach-hang" component={InforUser} />
        <Stack.Screen name="san-pham-da-chon" component={SelectedProducts} />
        <Stack.Screen name="bao-hanh-sua-chua" component={WarrantyAndRepair} />
        <Stack.Screen name="dich-vu-cong-them" component={AdditionalService} />
        <Stack.Screen name="chon-dich-vu" component={SelectService} />
        <Stack.Screen name="chi-tiet-tao-don" component={DetailOrderCreate} />
        <Stack.Screen name="thong-tin-don-hang" component={InforOrder} />
        <Stack.Screen name="khuyen-mai-don-hang" component={Promotion} />
        <Stack.Screen name="in-lai-don" component={Print} />
        {/* report*/}
        <Stack.Screen name="bao-cao" component={Report} />
        <Stack.Screen name="bao-cao-tong-quan" component={OverViewReport} />
        <Stack.Screen name="bao-cao-chi-tiet" component={DetailReport} />
        <Stack.Screen name="bieu-do" component={Chart} />
        <Stack.Screen name="bieu-do-so-sanh" component={ReportCompare} />
        {/* checkin*/}
        <Stack.Screen name="quan-tri-checkin" component={Checks} />
        <Stack.Screen
          name="tao-sua-diem-check"
          component={CreateEditCheckPoint}
        />
        <Stack.Screen name="danh-sach-diem-check" component={ListCheckPoint} />
        <Stack.Screen name="lich-su-checkin" component={HistoryCheckIn} />
        <Stack.Screen name="checkin" component={Checkin} />
        {/* cskh*/}
        <Stack.Screen name="tao-thong-bao" component={ManageNotify} />
        <Stack.Screen name="quan-tri-khuyen-mai" component={ManageDiscount} />
        <Stack.Screen name="tao-ma-khuyen-mai" component={CreateDiscount} />
        <Stack.Screen name="zalo-oa" component={ZaloOA} />
        <Stack.Screen name="thong-bao-mail" component={NotifiMail} />
        {/* manage*/}
        <Stack.Screen name="quan-tri" component={Manage} />
        <Stack.Screen name="quan-tri-khach-hang" component={ManageCustomer} />
        <Stack.Screen name="them-moi-khach-hang" component={AddNewCustomer} />
        <Stack.Screen name="chinh-sua-khach-hang" component={UpdateCustomer} />
        <Stack.Screen name="quan-tri-san-pham" component={ManageProduct} />
        <Stack.Screen name="quan-tri-cua-hang" component={ManageStories} />
        <Stack.Screen name="them-cua-hang" component={AddStories} />
        <Stack.Screen
          name="them-moi-san-pham"
          component={FormAddNewUpdateProduct}
          initialParams={{type: 'add'}}
        />
        <Stack.Screen
          name="sua-san-pham"
          component={FormAddNewUpdateProduct}
          initialParams={{type: 'update'}}
        />
        <Stack.Screen
          name="them-moi-hinh-san-pham"
          component={FormUpLoadImage}
          initialParams={{type: 'add'}}
        />
        <Stack.Screen
          name="sua-hinh-san-pham"
          component={FormUpLoadImage}
          initialParams={{type: 'update'}}
        />
        <Stack.Screen
          name="them-nhom-san-pham"
          component={AddGroupProdcut}
          initialParams={{type: 'add'}}
        />
        <Stack.Screen
          name="sua-nhom-san-pham"
          component={AddGroupProdcut}
          initialParams={{type: 'update'}}
        />
        <Stack.Screen name="dieu-chinh-san-pham" component={AdjustProduct} />
        <Stack.Screen name="quan-tri-nguoi-dung" component={ManagerStaff} />
        <Stack.Screen name="them-moi-nhan-vien" component={CreateStaff} />
        <Stack.Screen name="chon-khach-hang" component={SelectCustomer} />
        <Stack.Screen name="don-hang" component={ManageOrder} />
        <Stack.Screen name="quan-tri-don-nhap" component={ManageDraftOrder} />
        <Stack.Screen name="don-huy-xac-nhan" component={ManageRequestOrder} />
        <Stack.Screen name="danh-sach-don-hang" component={ListOrderManage} />
        <Stack.Screen name="quet-ma-xu-ly-don" component={ScanHandleOrder} />
        <Stack.Screen name="danh-sach-don-quet" component={ListOrderScan} />
        <Stack.Screen name="giao-hang" component={ShipOrder} />
        <Stack.Screen name="doi-dia-chi-nhan" component={ChangeAddressOrder} />
        <Stack.Screen name="chi-phi" component={Cost} />
        <Stack.Screen name="nhap-chi-phi" component={EnterCost} />
        <Stack.Screen name="danh-sach-chi-phi" component={ListCost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
