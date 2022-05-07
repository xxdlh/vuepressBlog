## 度°分′秒″转度
```js
function lnglatConvert(str, len) {
  //  112°24'04.362″ =>  strDu: "112", strFen: "24",strMiao: "04.362"
  let [strDu, otherStr] = str.split("°")
  let strFen = otherStr.split("'")[0]
  let strMiao = otherStr.split("'")[1].slice(0, -1)
  //度°分′秒″转度
  len = len > 6 || typeof len == "undefined" ? 6 : len; //精确到小数点后最多六位
  strDu =
    typeof strDu == "undefined" || strDu == "" ? 0 : parseFloat(strDu);
  strFen =
    typeof strFen == "undefined" || strFen == ""
      ? 0
      : parseFloat(strFen) / 60;
  strMiao =
    typeof strMiao == "undefined" || strMiao == ""
      ? 0
      : parseFloat(strMiao) / 3600;
  var digital = strDu + strFen + strMiao;
  if (digital == 0) {
    return "";
  } else {
    return digital.toFixed(len);
  }
}
```