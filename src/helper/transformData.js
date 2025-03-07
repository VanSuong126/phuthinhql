import CryptoJS from 'crypto-js';
import { SECRET_KEY } from '@env';

function getAesEncryptor(keyBytes, iv) {
    return CryptoJS.algo.AES.createEncryptor(keyBytes, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
}

function getAesDecryptor(keyBytes, iv) {
    return CryptoJS.algo.AES.createDecryptor(keyBytes, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
}

export function encodeData(data) {
    const iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0], 16);  // Khởi tạo vector khởi tạo IV là mảng 16 byte bằng 0
    const jsonString = JSON.stringify(data);
    const keyBytes = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const dataBytes = CryptoJS.enc.Utf8.parse(jsonString);

    // Mã hóa dữ liệu bằng AES
    const encrypted = getAesEncryptor(keyBytes, iv).finalize(dataBytes);
    const encryptedData = CryptoJS.enc.Base64.stringify(encrypted);

    // Tạo HMAC SHA-256
    const hmac = CryptoJS.HmacSHA256(encrypted, keyBytes);
    const hash = CryptoJS.enc.Base64.stringify(hmac);

    return { dataBody: encryptedData, Hash: hash };
}

export function decodeData(encodedData, hashValue) {
    const iv = CryptoJS.lib.WordArray.create([0, 0, 0, 0], 16);  // Khởi tạo vector khởi tạo IV là mảng 16 byte bằng 0
    const keyBytes = CryptoJS.enc.Utf8.parse(SECRET_KEY);
    const dataBytes = CryptoJS.enc.Base64.parse(encodedData);

    // Tính toán lại HMAC SHA-256
    const hmac = CryptoJS.HmacSHA256(dataBytes, keyBytes);
    const computedHashValue = CryptoJS.enc.Base64.stringify(hmac);

    if (computedHashValue === hashValue) {
        // Giải mã dữ liệu bằng AES
        const decrypted = getAesDecryptor(keyBytes, iv).finalize(dataBytes);
        const jsonString = CryptoJS.enc.Utf8.stringify(decrypted);
        return JSON.parse(jsonString);
    } else {
        throw new Error('Hash verification failed. Data integrity cannot be confirmed.');
    }
}
