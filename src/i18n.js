import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import translation from "./resources/translation.json";
import {getLangIso2} from "./utils";

i18n
  .use(initReactI18next)
  .init({
    lng: getLangIso2(),
    fallbackLng: "en",
    resources: translation,
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
      transKeepBasicHtmlNodesFor: ["br", "b"]
    },
  });

export default i18n;
