import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, Linking, NativeEventEmitter } from 'react-native';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';
import Modal from 'react-native-modal';

import {
    Sizes,
    Colors,
    FontStyles,
    parseSizeHeight,
    parseSizeWidth,
} from '~theme';
import { MyView, MyText, MyTouchableOpacity, MySafeAreaView } from '~components/MyStyles';
import Icon from '~components/IconXML';
import HeaderToolBar from '~components/headers/HeaderToolBar';
import ModalItemSelector from '~modals/ModalItemSelector';
import fetchData from '~providers';
import VnpayMerchant, { VnpayMerchantModule } from 'react-native-vnpay-merchant';
const eventEmitter = new NativeEventEmitter(VnpayMerchantModule);

export default Index = props => {
    const { isVisible, onClose, orderCode, totalAmountPayment = 0 } = props;
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [modalItemSelector, setModalItemSelector] = useState(false);

    const dataPaymentMoMo = [
        { value: 'captureWallet', title: "Ví MoMo", nameIcon: 'momo', widthIcon: 24, heightIcon: 24 },
        { value: 'payWithATM', title: "ATM", nameIcon: 'napas', widthIcon: 30, heightIcon: 20 },
        { value: 'payWithCC', title: "Visa", nameIcon: 'visa', widthIcon: 30, heightIcon: 24 },
    ]
    // Handle payment MôM
    const handleSelectPaymentMoMo = item => {
        if (orderCode && totalAmountPayment > 0) {
            const dataPayment = {
                MaDoiTac: 'PKG',
                orderId: orderCode,
                orderInfo: 'Thanh Toán hoá đơn qua ví Momo',
                amount: totalAmountPayment,
                requestType: item?.value,
                extraData: '',
                storeId: 'PhucKhangGems',
                orderGroupId: '',
                autoCapture: true,
                lang: 'vi',
            }
            fetchData(dispatch, "createPaymentLinkMomo", dataPayment, (res) => {
                if (res.success === true)
                    if (item?.value === 'captureWallet') {
                        OpenURLButton(res?.data?.deeplink);
                    }
                    else {
                        Linking.openURL(res?.data?.payUrl).catch(err => {
                            Toast.show({
                                type: 'error',
                                props: { message: t('Không mở được liên kết') + err },
                            });
                        }
                        );
                    }
            });
        }

    }
    const OpenURLButton = async url => {
        const supported = await Linking.canOpenURL(url);

        if (supported) {
            // Opening the link with some app, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            await Linking.openURL(url);
        } else {
            Toast.show({
                type: 'error',
                props: { message: t('Không liên kết được ứng dụng Momo hãy đảm bảo bạn đã tải tải app trước khi thanh toán') },
            });
        }
    };

    // Tạo đường link thanh toán vnpay
    const createPaymentLinkVnpay = () => {
        if (orderCode && totalAmountPayment > 0) {
            const dataPayment = {
                MaDoiTac: 'PKG',
                vnp_Amount: totalAmountPayment,
                vnp_CurrCode: 'VND',
                vnp_Locale: 'vn',
                vnp_OrderInfo: 'Thanh Toán hoá đơn',
                vnp_OrderType: 'other',
                vnp_TxnRef: orderCode,
            };
            fetchData(dispatch, "createPaymentLinkVnpay", dataPayment, (res) => {
                if (res.success === true) {
                    VnpayMerchant.show({
                        "isSandbox": true,
                        "scheme": "phuckhanggems",
                        "title": "Thanh toán VNPAY",
                        "titleColor": "#333333",
                        "beginColor": "#ffffff",
                        "endColor": "#ffffff",
                        "iconBackName": "close",
                        "tmn_code": "PKGSWT01",
                        "paymentUrl": res?.data?.url,
                    });
                }
                else {
                    Toast.show({
                        type: 'error',
                        props: { message: t('Lỗi tạo link thanh toán Vnpay') },
                    });
                }

            });
        }
    };

    // Xử lý quay về khi đã hoàn thành thanh toán
    useEffect(() => {
        // Xử lý deep linking khi hoàn thành thanh toán MoMo
        const handleDeepLink = async () => {
            const initialUrl = await Linking.getInitialURL();
            if (initialUrl) {
                handleUrlEvent(initialUrl);
            }
        };

        // Xử lý khi nhận sự kiện URL MoMo
        const handleUrlEvent = url => {
            const params = querystring.parse(url.split('?')[1]);
            const resultCode = params.resultCode;

            switch (resultCode) {
                case '9000':
                    Toast.show({
                        type: 'success',
                        props: { message: t('Thanh toán MoMo thành công') },
                    });
                    break;
                case '0':
                    Toast.show({
                        type: 'error',
                        props: { message: t('Thanh toán MoMo không thành công') },
                    });
                    break;
                default:
                    break;
            }
        };

        // Callback cho sự kiện URL từ deep linking Vnpay
        const handleUrlEventCallback = event => {
            handleUrlEvent(event.url);
        };

        // Lắng nghe sự kiện URL
        const urlSubscription = Linking.addListener('url', handleUrlEventCallback);

        // Gọi hàm kiểm tra URL ban đầu
        handleDeepLink();

        // Lắng nghe sự kiện PaymentBack
        const paymentBackSubscription = eventEmitter.addListener('PaymentBack', (e) => {
            console.log('Sdk back!');
            if (e) {
                console.log("e.resultCode = " + e.resultCode);
                switch (e.resultCode) {
                    case -1:
                        Toast.show({
                            type: 'error',
                            props: { message: t('Chưa hoàn thành thanh toán Vnpay') },
                        });
                        break;
                    case 99:
                        Toast.show({
                            type: 'error',
                            props: { message: t('Giao dịch thanh toán Vnpay bị hủy') },
                        });
                        break;
                    case 98:
                        Toast.show({
                            type: 'error',
                            props: { message: t('Thanh toán VNpay thất bại') },
                        });
                        break;
                    case 97:
                        Toast.show({
                            type: 'success',
                            props: { message: t('Thanh toán Vnpay thành công') },
                        });
                        break;
                    default:
                        break;
                }
            }
        });

        // Clean up
        return () => {
            urlSubscription.remove(); // Sử dụng remove() để xóa listener
            paymentBackSubscription.remove(); // Xóa event listener của PaymentBack
        };
    }, []);

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            style={styles.modal}>
            <MySafeAreaView style={styles.container}>
                <HeaderToolBar nameHeaderTitle={t('payment')} onPressBack={()=>onClose()} />
                <MyView style={styles.content}>
                    <MyTouchableOpacity style={styles.wrapDropDown} onPress={() => setModalItemSelector(true)} >
                        <Icon name="momo" width="30" height="30" />
                        <MyText style={styles.textReport}>{t('MoMo')}</MyText>
                        <Icon name="arrowRight" width="18" height="18" />
                    </MyTouchableOpacity>
                    <MyTouchableOpacity style={styles.wrapDropDown} onPress={createPaymentLinkVnpay} >
                        <Icon name="vnpay" width="30" height="30" />
                        <MyText style={styles.textReport}>{t('VNPAY')}</MyText>
                        <Icon name="arrowRight" width="18" height="18" />
                    </MyTouchableOpacity>
                </MyView>
                <ModalItemSelector
                    isVisible={modalItemSelector}
                    onClose={() => setModalItemSelector(false)}
                    data={dataPaymentMoMo}
                    getItem={item => handleSelectPaymentMoMo(item)}
                />
            </MySafeAreaView>

        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
        backgroundColor: Colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    content: {
        backgroundColor: Colors.background,
        paddingHorizontal: Sizes.paddingWidth,
        gap: parseSizeHeight(24),
    },
    wrapTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Sizes.paddingHeight,
    },
    txtTitle: {
        fontFamily: FontStyles.InterSemiBold,
        fontSize: Sizes.text_h5,
        color: Colors.neutrals_900,
        fontWeight: '600',
    },
    wrapDropDown: {
        height: parseSizeHeight(64),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Sizes.paddingWidth,
        borderColor: Colors.neutrals_300,
        borderRadius: 12,
        shadowColor: Colors.black,
        backgroundColor: Colors.neutrals_100,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#dddde3',
    },
    textReport: {
        flex: 1,
        marginLeft: parseSizeWidth(23),
        fontFamily: FontStyles.InterRegular,
        fontWeight: '500',
        fontSize: Sizes.text_subtitle1,
        color: Colors.neutrals_700,
    },
});
