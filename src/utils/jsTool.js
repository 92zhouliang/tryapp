import axios from "axios";
import { Indicator, Toast } from "mint-ui";
export function getDeviceId() {
  // 获取初始信息
  var app = navigator.appVersion;
  //    根据括号进行分割
  var left = app.indexOf("(");
  var right = app.indexOf(")");
  var str = app.substring(left + 1, right);
  // console.log(str+'裁剪过后的');
  var Str = str.split(";");
  // 手机型号--苹果 iPhone
  var Mobile_Iphone = Str[0];
  // 手机型号--安卓
  var Mobile_Android = Str[2];
  // 红米手机等特殊型号处理 匹配字符
  var res = /Android/;
  var reslut = res.test(Mobile_Android);
  // 根据设备型号判断设备系统
  if (Mobile_Iphone == "iPhone") {
    //   alert('访问设备型号'+Mobile_Iphone+'系统版本'+Str[1].substring(4,19));
    return Mobile_Iphone.trim() + "~" + Str[1].substring(4, 19).trim();
  } else if (Mobile_Iphone == "Linux") {
    if (reslut) {
      // alert('访问设备型号'+Str[4].substring(0,9)+'系统版本'+Str[2]);
      return Str[4].substring(0, 9).trim() + "~" + Str[2].trim();
    } else {
      // alert('访问设备型号'+Mobile_Android.substring(0,9)+'系统版本'+Str[1]);
      return Mobile_Android.substring(0, 9).trim() + "~" + Str[1].trim();
    }
  } else if (Mobile_Iphone == "iPad") {
    //   alert('访问设备'+Str[0]+'系统版本'+Str[1].substring(4,12));
    return Str[0].trim() + "~" + Str[1].substring(4, 12).trim();
  }
}

export const setLocalStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== "string") {
    val = JSON.stringify(value);
  }
  window.localStorage.setItem(key, val);
};

export const getLocalStorage = key => {
  if (!key) return;
  return window.localStorage.getItem(key);
};

export const removeLocalStorage = key => {
  if (!key) return;
  window.localStorage.removeItem(key);
};

export const setSessionStorage = (key, value) => {
  if (!key) return;
  let val = value;
  if (typeof value !== "string") {
    val = JSON.stringify(value);
  }
  window.sessionStorage.setItem(key, val);
};

export const getSessionStorage = key => {
  if (!key) return;
  return window.sessionStorage.getItem(key);
};

export const removeSessionStorage = key => {
  if (!key) return;
  window.sessionStorage.removeItem(key);
};

// export const search = (key) => {
//   if (!key) return;
//   var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
//   var url = window.location.hash == '' ? window.location.search : window.location.hash.substring(window.location.hash.indexOf('?'));
//   var r = url.substr(1).match(reg);
//   if (r != null) return unescape(r[2]);
//   return null;
// }
export const getDefaultCity = async () => {
  return new Promise((resolve, reject) => {
    return (
      axios
        .get(
          "/iplookup/iplookup.php?format=js",
          {},
          { responseType: XMLDocument }
        )
        //product
        // .get("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js", {}, { responseType:XMLDocument })
        .then(res => {
          if (res) {
            const data = res.data.substring(
              res.data.indexOf("{"),
              res.data.indexOf("}") + 1
            );
            let resData = JSON.parse(data);
            console.log(resData.city + "---初始化城市");
            return resolve(resData.city);
          }
        })
        .catch(err => {
          Toast({
            message: "定位失败，默认设置城市为上海",
            position: "middle"
          });
          return reject("上海");
        })
    );
  });
};
