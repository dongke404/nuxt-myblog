/**
 * @file i18n 配置转换语言/ ES module
 * @module transforms/i18n
 */

//递归改数据
function i18nTransfer(i18nConfig, language) {
  const i18nData = i18nConfig.data

  function getdata(obj, newobj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        if (typeof (element) === "object" && !(element instanceof Array) ) {
          newobj[key] = {}
          getdata(element, newobj[key])
        } else {
          newobj.value = obj[language]
          break
        }
      }
    }
    return newobj
  }
  return getdata(i18nData, {})
}

export default i18nTransfer
