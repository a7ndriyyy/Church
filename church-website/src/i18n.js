import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import translationUK from './locales/uk.json';
import translationFR from './locales/fr.json';
import translationEN from './locales/en.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      uk: { translation: translationUK },
      fr: { translation: translationFR },
      en: { translation: translationEN },
      
    },
    lng: 'fr', // default language
    fallbackLng: 'fr',
    interpolation: { escapeValue: false },
  });

export default i18n;
