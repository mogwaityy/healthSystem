import axios from 'axios'
import {  toast } from 'react-toastify';

/* axios.defaults.baseURL = '/api';*/

const api = axios.create({
    // baseURL: import.meta.env.DEV ? '/api/' : import.meta.env.VITE_APP_API_BASEURL,
    // baseURL: "http://localhost:8080/",
   baseURL: "https://healthystem.nicesea-44cd997c.eastus.azurecontainerapps.io/",
    timeout: 30000,
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',

    }
})

api.interceptors.request.use(
    (config) => {
      // 在发送请求之前做些什么，例如添加token
      const token = localStorage.getItem('token');
    
      if (token) {
        // 如果存在token，将其添加到headers的Authorization字段
        config.headers.satoken = `${token}`;
       // config.headers.Cookie = `satoken=${token}`

      }
     config.withCredentials = true;
  
      return config;
    },
    (error) => {
      // 对请求错误做些什么
      return Promise.reject(error);
    }
  );
  
  // 添加响应拦截器
  api.interceptors.response.use(
    (response) => {
      // 对响应数据做处理
      
      if(response.data?.status == 200){
        return response.data.data;
      }else{
        let msg = response.data?.message ?? response.data?.msg
        //缺少角色：doctor
        
        if(msg.includes('缺少角色：')){
          msg = msg.replace("缺少角色：","Lack of role :")
        }else if(msg.includes("无效")){
          msg = "Invalid token"
        }
        window.alertTsg(msg)
        return Promise.resolve({
            msg,
            reponseFailStatus:1
        })
      }
      
    },
    (error) => {
      // 对响应错误做处理
      return Promise.reject(error);
    }
  );

export default api
