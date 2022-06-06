import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
//
import enLocales from './en.json';
import viLocales from './vi.json';
import 'bootstrap/dist/js/bootstrap';
// bootstrap.bundle.min.js
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'flag-icon-css/css/flag-icon.min.css';
import 'flag-icons/css/flag-icons.min.css';
// ----------------------------------------------------------------------

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['vi', 'en'],
    resources: {
      vi: { translations: viLocales },
      en: { translations: enLocales }
    },
    lng: localStorage.getItem('i18nextLng') || 'vi',
    fallbackLng: 'vi',
    debug: false,
    detection: {
      order: ['path', 'cookie', 'htmlTag'],
      caches: ['cookie']
    },
    ns: ['translations'],
    defaultNS: 'translations',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
