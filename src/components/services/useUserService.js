import {useApi} from "./useApi";

export const useUserService = () => {

  const {postPublicData, postPrivateData} = useApi();

  const register = async (params) => {
    return postPublicData("/v1/user/register", params);
  }

  const login = async (params) => {
    return postPublicData("/v1/user/login", params);
  }

  const logout = async () => {
    return postPrivateData("/v1/user/logout");
  }

  const sendRestoreEmail = async (params) => {
    return postPublicData("/v1/user/send-restore-email", params);
  }

  const changePassword = async (params) => {
    return postPublicData("/v1/user/change-password", params);
  }

  return {
    register,
    login,
    logout,
    sendRestoreEmail,
    changePassword
  }
}
