const TOKEN_KEY = "jwt-pos";

function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([$?*|{}[\]\\^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


export const logout = () => {
  localStorage.clear();
  sessionStorage.clear()
  document.cookie = TOKEN_KEY + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const isLogin = () => {
  if (getCookie(TOKEN_KEY)) {
    return true;
  }

  return false;
};
