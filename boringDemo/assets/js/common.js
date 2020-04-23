/*
* 通用方法
* ps: 该文件定义通用方法, 
*     需要注意的是 该文件同时作为axios拦截器 需在axios之后引入
*    （如果你确实需要用到该文件中定义的方法和拦截器）
*/ 

// HTTPrequest拦截
axios.interceptors.request.use(config => {
  let token =  getUrlKey('token')
  if (token) {
    config.headers['token'] = token// token
  }
  return config
}, error => {
  return Promise.reject(error)
})

const DELAYBTNTIME = 1000
// 获取地址栏中hash参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.hash.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}

function getUrlParams(url) {
  let params = {}
  let white = ['id'];
  if (!url) return params;
  if (url.indexOf("#") !== -1) {
    const index = url.indexOf("#");
    url = url.substr(index + 1);
    let list = url.split('&');
    list.forEach(ele => {
      let dic = ele.split('=');
      let label = dic[0];
      let value = dic[1];
      if (white.indexOf(label) === -1) {
        params[label] = value;
      }

    })
  }
  return params
}

// 校验规则
/**
 * @param check [校验规则]
 * @param value [需要校验的值]
 */

function regularCheck(check, value) {
  var reg = '';
    switch (check) {
        case 'phone': // 移动电话
            reg = /^1\d{10}$/
            break;

        case 'idcard': // 身份证
            reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
            break
    }
    // 存储校验失败信息
    var res = reg.test(value)

    return res
}
function getUrlKey(name){
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
}

function validateMobile(value){
  // console.log(isNaN(value))
  var reg =/^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
  return reg.test(value)
  
}

function doubleNumber(value){
  var reg = /^[0-9]+(.[0-9]{0,2})?$/
  return reg.test(value)
}

function intNumber(value){
  var reg = /^[0-9]*$/
  return reg.test(value)
}

