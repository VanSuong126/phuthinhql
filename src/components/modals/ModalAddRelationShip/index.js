import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import { Colors, parseSizeWidth, parseSizeHeight, Sizes } from '~theme';
import Modal from 'react-native-modal';
import { MyView, MySafeAreaView, MyAvoidView } from '~components/MyStyles';
import FormAddRelationShip from '~components/FormAddRelationship';
import Button from '~buttons/MyButton';

const Index = props => {
    const { t } = useTranslation();
    const { isVisible, onClose, onConfirm = null,data = null, type='add' } = props;
    const [dataRelationShip, setDataRelationShip] = useState();

    useEffect(()=>{
        if(type==='update'&& isVisible){
            setDataRelationShip(data);
        }
        else{
            setDataRelationShip({});
        }

    }, [isVisible])

    const handleConfirm = () => {
        // Bắt đầu bằng cách sao chép đối tượng dataRelationShip hiện tại
        const updatedDataRelationShip = { ...dataRelationShip };
      
        const checks = [
          { condition: !dataRelationShip?.HoTen, errorKey: 'HoTenError', message: t('emptyFullName') },
          { condition: !dataRelationShip?.MoiQuanHe, errorKey: 'MoiQuanHeError', message: t('emptyRelationship') },
          { condition: !dataRelationShip?.NgaySinh, errorKey: 'NgaySinhError', message: t('emptyBirthday') },
        ];
      
        // Đặt biến kiểm soát có lỗi hay không
        let hasError = false;
      
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
          setDataRelationShip(updatedDataRelationShip);
          return false;
        }
      
        // Nếu không có lỗi, tiếp tục xử lý xác nhận
        onConfirm([dataRelationShip]);
        setDataRelationShip({});
      };
      
    return (
        <Modal
            onBackdropPress={onClose}
            visible={isVisible}
            transparent={true}
            animationType="slide"
            style={styles.modal}>
            <MySafeAreaView style={styles.container}>
                <MyView style={styles.line} />
                <MyAvoidView>
                    <FormAddRelationShip
                        data={dataRelationShip}
                        onChange={data => setDataRelationShip(data)}
                    />
                </MyAvoidView>
                <MyView style={styles.wrapButton}>
                    <Button
                        title={t('confirm')}
                        onPress={() =>handleConfirm()}
                        type="1"
                        size="primary"
                    />
                </MyView>
            </MySafeAreaView>
        </Modal>
    );
};

export default Index;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0,0.35)',
        justifyContent: 'flex-end',
    },
    line: {
        alignSelf: 'center',
        width: parseSizeWidth(45),
        height: parseSizeHeight(5),
        borderRadius: parseSizeWidth(100),
        backgroundColor: Colors.neutrals_400,
        marginTop: parseSizeHeight(20),
    },
    container: {
        flex: 0.6,
        backgroundColor: Colors.neutrals_50,
        borderTopLeftRadius: parseSizeWidth(24),
        borderTopRightRadius: parseSizeWidth(24),
    },
    wrapButton: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});
