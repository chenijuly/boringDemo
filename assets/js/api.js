/*
* 接口地址集合
*/ 
var pbApi = (function () {
    const ip = ""
    return {
      getVerifycode: ip + 'code/send/validateCode/', // 获取验证码
      areaCodeApi: ip + 'meta/area', // 获取省市区
      submitForm: ip + 'business/submit', // 提交表单
    }
})()
