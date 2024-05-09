import { useState, useEffect } from 'react';

// 自定义Hook：用于获取数据
export default function useToken() {
    
  const [token, setToken] = useState(null);
  useEffect(() => {
     let  tokenItem = localStorage.getItem('token')
     setToken(tokenItem)
     console.log("token===>",token)
 
  }, []); // 当url变化时重新获取数据
  let hasToken = token ? true : false;
  return { token,hasToken };
}