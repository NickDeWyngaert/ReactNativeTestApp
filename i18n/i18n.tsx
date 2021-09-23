import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resources from "./resources";
//import LanguageDetector from "i18next-browser-languagedetector";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
