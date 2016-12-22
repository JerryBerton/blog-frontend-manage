export function setCookie(ckey, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = ckey + "=" + cvalue + "; " + expires;
}
export function getCookie(ckey) {
 var key = ckey + "=";
 var ca = document.cookie.split(';');
 for(var i = 0; i< ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1);
    if (c.indexOf(key) != -1) {
      return c.substring(key.length, c.length);
    }
 }
 return "";
}
