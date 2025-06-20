import React from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Header from './components/home/Header';
import Footer from './components/home/Footer';
import HomePages from './components/pageContent/HomePages';
import MainDash from './components/PractitionerDash/MainDash/MainDash';
import Sidebar from './components/PractitionerDash/Sidebar/Sidebar';
import SignUp from './components/home/Login/SignUp';
import SignUpStep2 from './components/home/Login/SignUpStep2';
import SignUpStep3 from './components/home/Login/SignUpStep3';
import AdminLogin from './components/home/Login/AdminLogin';
import PatientDetail from './components/PatientDetail/PatientDetail';
import MakeAppointment from './components/Patient/MakeAppointment';
import { AdminDash } from './components/AdminDash';
import { CheckAppointment } from './components/Patient/CheckAppointment';
import Prescription from './components/Prescription';
import DoctorDash from './components/DoctorDash';
import PrescriptionDetail from './components/PrescriptionDetail';
import TestResult from './components/TestResult';
import PatientDetail2 from "./components/PatientDetail/PatientDetail2";
import {emitter} from "@m/index"
import { ToastContainer,toast } from 'react-toastify'; // 引入ToastContainer
import 'react-toastify/dist/ReactToastify.css';
import Sidebar2 from "./components/PractitionerDash/Sidebar/Sidebar2";
import DoctorTimetable from "./components/DoctorTimetable";
import PersonalTimetable from "./components/PersonalTimetable";
import CreateDoctor from "./components/CreateDoctor";
import AllTest from "./components/AllTest";
import AuthRoute from './components/useAuth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Cookies from 'js-cookie';
import MedicalAssistant from './components/MedicalAssistant';
window.alert = toast;
emitter.on("ccc",(data)=>{
  console.log("ccc->data",data)
})

function debounce(func, wait) {
  let timeout;

  return function(...args) {
    clearTimeout(timeout); // 每次调用时清除之前的定时器
    timeout = setTimeout(() => {
      func.apply(this, args); // 在延迟时间结束后执行原函数
    }, wait);
  };
}

// 使用示例


window.alertTsg = debounce(window.alert, 300); // 创建防抖后的函数，延迟时间为300毫秒


emitter.on("userLoginOut", () => {
  console.log('userLoginOut====>')
  let role = localStorage.getItem("role");
  localStorage.clear();

  const cookies = document.cookie.split(';').map(cookie => cookie.trim().split('=')[0]);
// 遍历所有cookie名称并使用js-cookie的remove方法删除它们
  cookies.forEach(cookieName => {
      Cookies.remove(cookieName);
  });
  console.log("role===>",role)
  alert("退出成功")
  window.setTimeout(()=>{
    if(role == "admin"){
      window.location.href='/#/admin-login'
  }else{
    window.location.href='/'
  }
  },1000)


  
})
emitter.emit("clearOut")
emitter.emit('ccc','dd')

//AuthRoute
function App() {
  return (
      <Router>
      <ToastContainer />
      <AuthRoute>
        <Switch>
          <Route path="/" exact >
              <Header />
              <HomePages />
              <Footer />
          </Route>
       

          <Route path="/admin/dash" exact>
            <div className="dashboard-container">
              <Sidebar />
              <MainDash />
            </div>
          </Route>

          <Route path="/doctor/schedule" exact>
            <div className="dashboard-container">
              <Sidebar2 />
              <PersonalTimetable />
            </div>
          </Route>

          <Route path="/doctor/test" exact>
            <div className="dashboard-container">
              <Sidebar2 />
              <AllTest />
            </div>
          </Route>

          <Route path="/admin/create-doctor" exact>
            <div className="dashboard-container">
              <Sidebar />
              <CreateDoctor />
            </div>
          </Route>

          <Route path="/doctor/test/:patientId" exact>
              <AllTest />
          </Route>



          <Route path="/admin/schedule" exact>
            <div className="dashboard-container">
              <Sidebar />
              <DoctorTimetable />
            </div>
          </Route>

          <Route path="/register" exact>
            <SignUp />
          </Route>

          <Route path="/register-2" exact>
            <SignUpStep2 />
          </Route>

          <Route path="/register-3" exact>
            <SignUpStep3 />
          </Route>

          <Route path="/admin/dash/detail" exact>
            <PatientDetail />
          </Route>

          <Route path="/doctor/detail" exact>
            <PatientDetail2 />
          </Route>

          <Route path="/make-appointment" exact>
            <MakeAppointment />
          </Route>

          <Route path="/admin/register-request" exact>
            <div className="dashboard-container">
              <Sidebar />
              <AdminDash />
            </div>

          </Route>

          
          <Route path="/admin-login" exact>
            <AdminLogin />
          </Route>

          <Route path="/check-appointment" exact>
            <CheckAppointment />
          </Route>


          <Route path="/prescription" exact>
            <Prescription />
          </Route>

          <Route path="/doctor/dash" exact>
            <Sidebar2/>
            <DoctorDash />
          </Route>


          <Route path="/prescription/:applicationId" component={PrescriptionDetail} />

          <Route path="/result" exact>
            <TestResult />
          </Route>

        </Switch>
        </AuthRoute>
        <MedicalAssistant />
      </Router>
  );
}

export default App;
