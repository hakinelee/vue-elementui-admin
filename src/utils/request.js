import axios from "axios";

// 返回一个axios实例，命名为http
const http = axios.create({
  // 通用请求的地址前缀
  baseURL: "http://localhost:8082",
  // 超时时间：最大请求时间，单位毫秒
  timeout: -1,
});

// 请求拦截器和响应拦截器可以封装一些公共的方法
// 添加请求拦截器
http.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
http.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    console.log("拦截器响应成功！");
    return response;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    console.log("拦截器响应失败");
    console.log(error);
    if (error.request) {
      console.log(error.request);
    } else if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
    }
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          error.message = "请求错误(400)";
          break;
        case 401:
          error.message = "未授权，请重新登录(401)";
          break;
        case 403:
          error.message = "拒绝访问(403)";
          break;
        case 404:
          error.message = "请求出错(404)";
          break;
        case 408:
          error.message = "请求超时(408)";
          break;
        case 500:
          error.message = "服务器错误(500)";
          break;
        case 501:
          error.message = "服务未实现(501)";
          break;
        case 502:
          error.message = "网络错误(502)";
          break;
        case 503:
          error.message = "服务不可用(503)";
          break;
        case 504:
          error.message = "网络超时(504)";
          break;
        case 505:
          error.message = "HTTP版本不受支持(505)";
          break;
        default:
          error.message = "连接出错";
      }
    } else {
      error.message = "连接服务器失败!";
    }
    return Promise.reject(error);
  }
);

export default http;
