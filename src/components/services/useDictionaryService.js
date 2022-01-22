import {useApi} from "./useApi";

export const useDictionaryService = () => {

  const {getPrivateData, postPrivateData, downloadPrivateFile} = useApi();

  const getLanguages = async () => {
    return getPrivateData("/v1/dictionary/languages");
  }

  const getDictionary = async (params) => {
    return getPrivateData("/v1/dictionary/info", params);
  }

  const getPhrases = async (params) => {
    return getPrivateData("/v1/dictionary/phrases", params);
  }

  const getPronunciation = async (params) => {
    return getPrivateData("/v1/dictionary/pronunciation", params);
  }

  const saveTranslation = (params) => {
    return postPrivateData("/v1/dictionary/save-translation", params);
  }

  const addPhrases = async (params) => {
    return postPrivateData("/v1/dictionary/add-phrases", params);
  }

  const updateStudyingStatus = (params) => {
    return postPrivateData("/v1/dictionary/update-studying-status", params);
  }

  const removePhrases = (params) => {
    return postPrivateData("/v1/dictionary/remove-phrases", params);
  }

  const exportPhrases = (params) => {
    return downloadPrivateFile("/v1/dictionary/export-phrases", params, "dictionary.csv");
  }

  return {
    getLanguages,
    getDictionary,
    getPhrases,
    getPronunciation,
    addPhrases,
    saveTranslation,
    updateStudyingStatus,
    removePhrases,
    exportPhrases
  }
}
