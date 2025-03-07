import DeviceInfo from 'react-native-device-info';
import { Platform } from "react-native";

export default new class deviceInfo {
    ip = Platform.select({
        ios: DeviceInfo?.getMacAddress(),
        android: DeviceInfo?.getIpAddress()
    })
    deviceType = DeviceInfo?.getSystemName()
    deviceId = DeviceInfo?.getUniqueId()
    deviceName = DeviceInfo?.getModel()
    osVersion = DeviceInfo?.getSystemVersion()
    buildNumber = DeviceInfo?.getBuildNumber()
    appVersion = DeviceInfo?.getVersion()
    deviceManufacturer = DeviceInfo?.getManufacturer()
    deviceToken = ''
}