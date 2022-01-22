import {useApi} from "./useApi";

export const useBookService = () => {

  const {getPrivateData} = useApi();

  const getBook = async ({bookId}) => {
    return getPrivateData("/v1/book/info/" + bookId);
  }

  const getPhrases = async (params) => {
    return getPrivateData("/v1/book/phrases", params);
  }

  return {
    getBook,
    getPhrases
  }
}
