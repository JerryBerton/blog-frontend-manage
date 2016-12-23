export const setCookie = function (ckey, cvalue, exdays = 1) {
  let d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires=" + d.toUTCString();
  document.cookie = ckey + "=" + cvalue + "; " + expires;
}
export const getCookie = function (ckey) {
  let name = ckey + "=";
  let ca = document.cookie.split(';');
  for(let i=0; i< ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) ==' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
   return "";
}
//删除cookies
export const clearCookie = function (name) {
  setCookie(name, "", -1);
}
