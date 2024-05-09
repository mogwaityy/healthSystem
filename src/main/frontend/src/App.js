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
import StaffRegister from './components/StaffRegister';
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

window.alert = toast;
emitter.on("ccc",(data)=>{
  console.log("ccc->data",data)
})
emitter.emit('ccc','dd')


function App() {
  return (
      <Router>
      <ToastContainer />
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

          <Route path="/admin/create-doctor" exact>
            <div className="dashboard-container">
              <Sidebar />
              <CreateDoctor />
            </div>
          </Route>

          <Route path="/doctor/test" exact>
            <div className="dashboard-container">
              <Sidebar2 />
              <AllTest />
            </div>
          </Route>



          <Route path="/admin/schedule" exact>
            <div className="dashboard-container">
              <Sidebar2 />
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

          <Route path="/detail" exact>
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

          <Route path="/staff-register" exact>
            <StaffRegister />
          </Route>

          <Route path="/prescription" exact>
            <Prescription />
          </Route>

          <Route path="/doctor" exact>
            <DoctorDash />
          </Route>


          <Route path="/prescription/:applicationId" component={PrescriptionDetail} />

          <Route path="/result" exact>
            <TestResult />
          </Route>

        </Switch>
      </Router>
  );
}

export default App;
