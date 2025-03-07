import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationVN from './locales/vi.json';
import translationEN from './locales/en.json';

// the translations
const resources = {
  vi: {
    translation: translationVN,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources, 
    compatibilityJSON: 'v3',
    lng: 'vi', // if you're using a language detector, do not define the lng option
    fallbackLng: "vi",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
