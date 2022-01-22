import {useApi} from "./useApi";

export const useTrainingService = () => {

  const {getPrivateData, postPrivateData} = useApi();

  const getPhrases = async (params) => {
    return getPrivateData("/v1/training/phrases", params);
  }

  const sendAnswer = async (params) => {
    return postPrivateData("/v1/training/handle-answer", params);
  }

  return {
    getPhrases,
    sendAnswer
  }
}
