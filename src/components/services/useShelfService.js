import {useApi} from "./useApi";

export const useShelfService = () => {

  const {getPrivateData, postPrivateData} = useApi();

  const getBooks = async (params) => {
    return getPrivateData("/v1/shelf/books", params);
  }

  const uploadBook = async ({title, file}) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    return postPrivateData("/v1/shelf/upload", formData, {"Content-Type": "multipart/form-data"});
  }

  return {
    getBooks,
    uploadBook
  }
}
