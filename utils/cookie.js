//设置cookies
export const setCookie=function(cname, cvalue,exs ) {
  var d = new Date();
  d.setTime(d.getTime() + (exs*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//获取设置cookie
export const getCookie=function(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
       }
       if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
       }
   }
  return "";
}

//清除cookie
export function clearCookie(name) {
  setCookie(name, "", -1);
 } 
