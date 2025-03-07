/**
 * Local database with AsyncStorage
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
/**
 * Keys for the data stored in local database
 */
const KEY_ENVIRONMENT = '@environment'; // Environment, used for testing
const KEY_WEB_URL = '@webUrl'; // Web url
const KEY_API_URL = '@apiUrl'; // API url
const KEY_LANGUAGE = '@language';
const KEY_SKIP_SCREEN = '@skipScreen';
const KEY_SAVE_LOGIN = '@SaveLogin';

const KEY_USER_DATA = '@userData'; // User data
const KEY_USER_TOKEN = '@userToken'; // User token
const KEY_USER_REFRESH_TOKEN = '@userRefreshToken'; // User refresh token
const KEY_NAVIGATE_UPDATE = '@QuanLyDonHang'; // Navigate to update screen
const KEY_STATUS_UPDATE = '@StatusUpdate'; // Status update screen

// const DEFAULT_ENVIRONMENT = 'PROD';
const DEFAULT_ENVIRONMENT = 'DEV';

// const DEFAULT_WEB_URL = 'https://phuckhanggem.com/';

// const DEFAULT_API_URL = 'https://api.phuckhanggem.com';

// const DEFAULT_ENVIRONMENT = 'UAT';

// const DEFAULT_WEB_URL = 'https://uat.phuckhanggem.com/';
const DEFAULT_WEB_URL = 'https://web4id.phuckhangnet.vn/';

const DEFAULT_API_URL = 'https://api.web4id.phuckhangnet.vn';

export default class LocalDB {
  static async initializeDefaults() {
    try {
      // Kiểm tra và thiết lập giá trị mặc định cho môi trường
      const environment = await AsyncStorage.getItem(KEY_ENVIRONMENT);
      if (environment === null) {
        await AsyncStorage.setItem(
          KEY_ENVIRONMENT,
          JSON.stringify(DEFAULT_ENVIRONMENT),
        );
      }

      // Kiểm tra và thiết lập giá trị mặc định cho web URL
      const webUrl = await AsyncStorage.getItem(KEY_WEB_URL);
      if (webUrl === null) {
        await AsyncStorage.setItem(
          KEY_WEB_URL,
          JSON.stringify(DEFAULT_WEB_URL),
        );
      }

      // Kiểm tra và thiết lập giá trị mặc định cho API URL
      const apiUrl = await AsyncStorage.getItem(KEY_API_URL);
      if (apiUrl === null) {
        await AsyncStorage.setItem(
          KEY_API_URL,
          JSON.stringify(DEFAULT_API_URL),
        );
      }
    } catch (error) {
      console.error('Error initializing defaults:', error);
    }
  }
  /**
   * save Login
   * @returns {Promise<bool>} Save Login
   */
  static async getSaveLogin() {
    return AsyncStorage.getItem(KEY_SAVE_LOGIN).then(json => JSON.parse(json));
  }
  /**
   * Set save Login
   * @param {bool} saveLogin Language
   */
  static async setSaveLogin(saveLogin) {
    await AsyncStorage.setItem(KEY_SAVE_LOGIN, JSON.stringify(saveLogin));
  }

  /**
   * Get language
   * @returns {Promise<string>} Language
   */
  static async getLanguage() {
    return AsyncStorage.getItem(KEY_LANGUAGE).then(json => JSON.parse(json));
  }
  /**
   * Set language
   * @param {string} language Language
   */
  static async setLanguage(language) {
    await AsyncStorage.setItem(KEY_LANGUAGE, JSON.stringify(language));
  }

  static async getSkipScreen() {
    return AsyncStorage.getItem(KEY_SKIP_SCREEN).then(json => JSON.parse(json));
  }
  static async setSkipScreen(skipScreen) {
    await AsyncStorage.setItem(KEY_SKIP_SCREEN, JSON.stringify(skipScreen));
  }
  /**
   * Set user data
   * @param {object} userData User data
   */
  static async setUserData(userData) {
    await AsyncStorage.setItem(KEY_USER_DATA, JSON.stringify(userData));
  }

  /**
   * Get user data
   * @returns {Promise<object>} User data
   */
  static async getUserData() {
    return AsyncStorage.getItem(KEY_USER_DATA).then(json => JSON.parse(json));
  }

  /**
   * Set user token
   * @param {object} userData User data
   */
  static async setUserToken(userData) {
    await AsyncStorage.setItem(KEY_USER_TOKEN, JSON.stringify(userData));
  }

  /**
   * Set user refresh token
   * @param {object} userData User data
   */
  static async setUserRefreshToken(userData) {
    await AsyncStorage.setItem(
      KEY_USER_REFRESH_TOKEN,
      JSON.stringify(userData),
    );
  }

  /**
   * Get user token
   * @returns {Promise<object>} User token
   */
  static async getUserToken() {
    return AsyncStorage.getItem(KEY_USER_TOKEN).then(json => JSON.parse(json));
  }

  /**
   * Get user refresh token
   * @returns {Promise<object>} User refresh token
   */
  static async getUserRefreshToken() {
    return AsyncStorage.getItem(KEY_USER_REFRESH_TOKEN).then(json =>
      JSON.parse(json),
    );
  }

  /**
   * Get navigate to update screen
   * @returns {Promise<boolean>} Navigate to update screen
   */
  static async getNavigateUpdate() {
    return AsyncStorage.getItem(KEY_NAVIGATE_UPDATE).then(json =>
      JSON.parse(json),
    );
  }

  /**
   * Set navigate to update screen
   * @param {boolean} navigate Navigate to update screen
   */
  static async setNavigateUpdate(navigate) {
    await AsyncStorage.setItem(KEY_NAVIGATE_UPDATE, JSON.stringify(navigate));
  }

  /**
   * Get status update screen
   * @returns {Promise<number>} Status update screen
   */
  static async getStatusUpdate() {
    return AsyncStorage.getItem(KEY_STATUS_UPDATE).then(json =>
      JSON.parse(json),
    );
  }

  /**
   * Set status update screen
   * @param {number} navigate Status update screen
   */
  static async setStatusUpdate(navigate) {
    await AsyncStorage.setItem(KEY_STATUS_UPDATE, JSON.stringify(navigate));
  }

  /**
   * Log out
   */
  static async logOut() {
    await AsyncStorage.multiRemove([
      KEY_USER_TOKEN,
      KEY_USER_DATA,
      KEY_USER_REFRESH_TOKEN,
      KEY_NAVIGATE_UPDATE,
      KEY_STATUS_UPDATE,
    ]);
  }

  /**
   * Get environment
   * @returns {Promise<string>} Environment
   */
  static async getEnviroment() {
    return AsyncStorage.getItem(KEY_ENVIRONMENT).then(json => JSON.parse(json));
  }

  /**
   * Set environment
   * @param {string} enviroment Environment
   */
  static async setEnviroment(enviroment) {
    await AsyncStorage.setItem(KEY_ENVIRONMENT, JSON.stringify(enviroment));
  }

  /**
   * Get web url
   * @returns {Promise<string>} Web url
   */
  static async getWebUrl() {
    return AsyncStorage.getItem(KEY_WEB_URL).then(json => JSON.parse(json));
  }

  /**
   * Set web url
   * @param {string} webUrl Web url
   */
  static async setWebUrl(webUrl) {
    await AsyncStorage.setItem(KEY_WEB_URL, JSON.stringify(webUrl));
  }

  /**
   * Get API url
   * @returns {Promise<string>} API url
   */
  static async getApiUrl() {
    return AsyncStorage.getItem(KEY_API_URL).then(json => JSON.parse(json));
  }

  /**
   * Set API url
   * @param {string} apiUrl API url
   */
  static async setApiUrl(apiUrl) {
    await AsyncStorage.setItem(KEY_API_URL, JSON.stringify(apiUrl));
  }
  /**
   * Clean env
   */
  static async cleanEnv() {
    await AsyncStorage.multiRemove([KEY_ENVIRONMENT, KEY_WEB_URL, KEY_API_URL]);
  }
}
