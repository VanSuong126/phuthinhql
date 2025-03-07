import {
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import Toast from 'react-native-toast-message';


import { FontStyles, Colors, Sizes, parseSizeHeight, parseSizeWidth } from '~theme';
import Modal from 'react-native-modal';
import { MyView, MyText } from '~components/MyStyles';
import Icon from '~components/IconXML';
import Button from '~buttons/MyButton';
import InputText from '~components/inputs/InputText';
import fetchData from '~providers';

const Index = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch(); 

    const { isVisible,  onClose } = props;
    const [userNameError, setUserNameError] = useState('');
    const [userName, setUsername] = useState('');

    useEffect(()=>{
        setUsername('');
    },[isVisible])

    const handleSubmit = () => {
        if (!userName) {
            setUserNameError(t('emptyUserName'));
            return;
        }
        onClose();
        fetchData(
            dispatch,
            'forgotPassword',
            {
                taiKhoan: userName,
            },
            data => {
                if (data.success === true) {
                    Toast.show({
                        type: 'success',
                        props: {message:  t('passSendMail')},
                    });
                } else {
                    Toast.show({
                        type: 'error',
                        props: {message:  t('accountNotFound')},
                    });
                }
            },
        );
    }

    return (
        <Modal onBackdropPress={onClose} visible={isVisible} transparent={true} animationType="slide" style={styles.modal}>
            <MyView style={styles.container}>
                <MyView style={styles.content}>
                    <TouchableOpacity onPress={onClose} style={styles.iconClose}>
                        <Icon name={'undo'} width={24} height={24} />
                    </TouchableOpacity>
                    <MyText style={styles.textTitle}>{t('forgetPassword')}</MyText>
                    <MyView style={styles.wrapInput}>
                        <InputText
                            value={userName}
                            labelName={t('userName')}
                            type="text"
                            placeholder={t('userName')}
                            contentError={userNameError}
                            onChangeText={value => { setUsername(value); setUserNameError('') }}
                        />
                    </MyView>
                    <MyView style={styles.wrapButton}>
                        <Button
                            title={t('confirm')}
                            size="medium"
                            type={1}
                            onPress={() => handleSubmit()}
                        />
                    </MyView>
                </MyView>
            </MyView>
        </Modal>
    );
};

export default Index;

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        margin: 0,
        backgroundColor: 'rgba(0, 0, 0,0.35)',
    },
    container: {
        position: 'absolute',
        top: parseSizeHeight(212),
        // height: parseSizeHeight(220),
        width: parseSizeWidth(329),
        backgroundColor: Colors.neutrals_50,
        borderRadius: parseSizeWidth(16),
        alignSelf: 'center',
        paddingHorizontal: parseSizeWidth(22),
        paddingVertical: parseSizeHeight(30),
        justifyContent: 'center',
    },
    content: {
        flex: 1,
    },
    iconClose: {
        position: 'absolute',
        top: parseSizeHeight(-18),
        right: parseSizeWidth(0),
    },
    wrapInput: {
        marginVertical: parseSizeHeight(20),
        gap: parseSizeHeight(24),

    },
    textTitle: {
        fontFamily: FontStyles.InterSemiBold,
        fontSize: Sizes.text_h5,
        fontWeight: '600',
        color: Colors.semantics_Grey,
        textAlign: 'center',
    },
    labelInput: {
        fontFamily: FontStyles.InterRegular,
        fontSize: Sizes.text_tagline1,
        fontWeight: '500',
        color: Colors.semantics_Grey,
    },
    wrapButton: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
