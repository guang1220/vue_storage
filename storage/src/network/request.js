import axios from 'axios'

axios.defaults.withCredentials = true //允许跨域
//Content-Type响应头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers['X-CSRF-TOKEN'] = "[[${_csrf.token}]]";
export function request(config){
  const install=axios.create({
    baseURL:'/storage',
    //  baseURL:'http://localhost:8080/storage',
  // baseURL:'/api',
    timeout:10000,
 headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
  });
  return install(config);
}
