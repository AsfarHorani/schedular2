import './App.css';
import Signin from './pages/auth/auth'
import Signup from './pages/auth/signup'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Admindashboard from './pages/dashboard/admin/admindashboard';
import Staffdashboard from './pages/dashboard/staff/staffdashboard';
import Studentdashboard from './pages/dashboard/student/studentdashboard';

import StaffProfile from './components/staffprofile';
import StudentProfile from './components/studentProfile';
import AdminProfile from './components/adminprofile';

import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import AddUser from './components/AddUser/addUser';
import AddStaffTable from './components/AddStaffTable/AddStaffTable';
import AddStudentTable from './components/AddStudentTimeTable/addstudenttimetabel';
import React, { useContext, useEffect } from 'react';
import { Context } from './context/context';
function App() {
  const {  token,userInfo, isAuth } = useContext(Context);
  console.log(token)
  const IndElement = () => {
    const navigate = useNavigate();
    useEffect(() => {
      console.log("rendering index element")
      if (isAuth) {
        if (userInfo.type === "admin") {
          navigate('/Admin-dashboard')
        } else if (userInfo.type === "staff") {
          navigate('/Staff-dashboard')
        } else if (userInfo.type === "student") {
          navigate('/Student-dashboard')
        }
      } else {
        navigate('/signin')

      }
    }, [userInfo.type])
  }
  return (
    <div className="App">
       { isAuth && <Header />}
      {userInfo && userInfo.type === "admin" && <Sidebar />}

      <Routes>

        <Route exact path='/Admin-dashboard' element={<Admindashboard />} />

        <Route exact path='/Staff-dashboard' element={<Staffdashboard />} />
        <Route exact path='/Student-dashboard' element={<Studentdashboard />} />
        <Route path="/a/:id" element={<AdminProfile />} />
        <Route path="/u/:id" element={<StaffProfile />} />
        <Route path="/s/:id" element={<StudentProfile />} />
        <Route path="/addStaffTimeTable" element={<AddStaffTable />} />
        <Route path="addStudentTimeTable" element={<AddStudentTable />} />
        <Route path="/addUser" element={<AddUser />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/signin" element={<Signin />} />
        <Route path='/' element={<IndElement />} />

      </Routes>
    </div>
  );
}

export default App;
