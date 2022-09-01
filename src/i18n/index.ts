import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import locale_de_DE_translations from './locales/de.json';
import locale_en_US_translatons from './locales/en.json';

export const locale_de_DE = 'de-DE';
export const locale_en_US = 'en-US';

export const locales = [locale_en_US, locale_de_DE];

const options: InitOptions = {
  resources: {
    'en-US': { translation: locale_en_US_translatons },
    'de-DE': { translation: locale_de_DE_translations },
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
