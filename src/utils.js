export const getLangIso2 = () => {
  const dashIndex = navigator.language.indexOf("-")
  return dashIndex > 0 ? navigator.language.substring(0, dashIndex) : navigator.language;
}

export const getCurrentPage = () => {
  return window.location.pathname + window.location.search;
}

export const checkEmail = (email) => {
  return (/.+@.+\..+/i).test(email);
}
