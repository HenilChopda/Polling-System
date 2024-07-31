// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import translationEN from './locales/en/translation.json';
import translationDE from './locales/de/translation.json';
import translationGU from './locales/gu/translation.json';

// The translations
const resources = {
  en: {
    translation: translationEN,
  },
  de: {
    translation: translationDE,
  },
  gu: {
    translation: translationGU,
  },
};

i18n
  .use(initReactI18next) // Passes i18n down to react-i18next
  .init({
    resources,
    lng: 'en', // Default language
    fallbackLng: 'en',

    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
