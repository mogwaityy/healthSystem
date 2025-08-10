
import {  useLocation,Redirect } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import React, { createContext, useContext, useState } from 'react';
const AuthTxContext = createContext();
// createContext, useContext,

export const useTxAuth = () => useContext(AuthTxContext);

export default function AuthRoute({ children }) {
  console.log("===useAuth===>")
  const location = useLocation()
  const currentPath = location.pathname
  let history = useHistory();
  const condition = currentPath == "/login"
  //Please sign in first.
  let token = localStorage.getItem("token")
  let role = localStorage.getItem("role")
  let pcStatus = localStorage.getItem("pStatus")
  let whiList = ["/","/admin-login","/register","/register-2","/register-3"]
  //未登录用户的判断
  console.log("currentPath==>",currentPath)
  if(whiList.includes(currentPath)){
    return (
      <AuthTxContext.Provider value={{ role }}>
          {children}
      </AuthTxContext.Provider>
  );
  }
  //|| (!token &&  currentPath != "/admin-login")
  if((!token &&  currentPath != "/")  ){
    console.log("未登录用户")
    window.alertTsg("请先登录");
    history.replace("/"); // 使
  }

  
  if ((pcStatus == 0 ) && role == "patient") {
    window.alertTsg("对不起，您的账户还未被授权");
    history.replace("/"); // 使
    return
  }
  if ((pcStatus == 2) && role == "patient") {
    window.alertTsg("对不起，您的账户有异常，已被拒绝授权");
    history.replace("/"); // 使
    return
  }

  return (
    <AuthTxContext.Provider value={{ role }}>
        {children}
    </AuthTxContext.Provider>
);
}
