import {useApi} from "./useApi";

export const useSearchService = () => {

  const {getPublicData} = useApi();

  const getBooks = async (params) => {
    return getPublicData("/v1/search/books", params);
  }

  const getBooksForAutocomplete = async (params) => {
    return getPublicData("/v1/search/books-for-autocomplete", params);
  }

  return {
    getBooks,
    getBooksForAutocomplete
  }
}
