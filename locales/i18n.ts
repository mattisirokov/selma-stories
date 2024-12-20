import AsyncStorage from "@react-native-async-storage/async-storage";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en.json";
import fi from "./fi.json";

const resources = {
  en: { translation: en },
  fi: { translation: fi },
};

// Load saved language preference
const loadLanguage = async () => {
  try {
    const savedLanguage = await AsyncStorage.getItem("user-language");
    return savedLanguage || "en";
  } catch (error) {
    return "en";
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

// Load saved language on app start
loadLanguage().then((lng) => {
  i18n.changeLanguage(lng);
});

export default i18n;
