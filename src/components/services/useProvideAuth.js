import {useState} from "react";

const USER_STORAGE_KEY = "user";

export const useProvideAuth = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem(USER_STORAGE_KEY)));

  const login = user => {
    setUser(user);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return {
    user,
    login,
    logout
  };
}
