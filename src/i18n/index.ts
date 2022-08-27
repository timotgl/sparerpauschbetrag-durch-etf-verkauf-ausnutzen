import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import locale_de_DE from './locales/de.json';
import locale_en_US from './locales/en.json';

export const locales = ['en-US', 'de-DE'];

const options: InitOptions = {
  resources: {
    'en-US': { translation: locale_en_US },
    'de-DE': { translation: locale_de_DE },
  },
  lng: 'en-US',
  fallbackLng: false,
  interpolation: {
    escapeValue: false,
  },
};

const initializeI18N = () => {
  i18n.use(initReactI18next).init(options);
};

export default initializeI18N;
