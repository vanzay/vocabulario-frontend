import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../AuthState";

const API_URL = process.env.REACT_APP_API_URL;

const buildQueryString = (obj) => {
  let params = [];
  for (let key of Object.keys(obj)) {
    let value = obj[key];
    // use exact condition to allow "0" values
    if (value !== null && value !== undefined) {
      params.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
  }
  return params.join("&");
}

export const useApi = () => {

  const {user} = useContext(AuthContext);

  const authHeader = user && user.accessToken ? {Authorization: "Bearer " + user.accessToken} : {};

  const getPublicData = async (requestPath, params) => {
    const response = await axios.get(API_URL + requestPath + (params ? "?" + buildQueryString(params) : ""));
    return response.data;
  }

  const getPrivateData = async (requestPath, params) => {
    const response = await axios.get(API_URL + requestPath + (params ? "?" + buildQueryString(params) : ""), {headers: authHeader});
    return response.data;
  }

  const downloadPrivateFile = async (requestPath, params, filename) => {
    const response = await axios.post(API_URL + requestPath, params, {responseType: "blob", headers: authHeader});
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  const postPublicData = async (requestPath, params, headers = {}) => {
    const response = await axios.post(API_URL + requestPath, params, {headers});
    return response.data;
  }

  const postPrivateData = async (requestPath, params, headers = {}) => {
    const response = await axios.post(API_URL + requestPath, params, {headers: Object.assign({}, headers, authHeader)});
    return response.data;
  }

  return {
    getPublicData,
    getPrivateData,
    downloadPrivateFile,
    postPublicData,
    postPrivateData
  }
}
