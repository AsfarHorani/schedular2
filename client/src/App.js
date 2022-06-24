import './App.css';
import Signin from './pages/auth/auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Admindashboard from './pages/dashboard/admin/admindashboard';
import Staffdashboard from './pages/dashboard/staff/staffdashboard';
import Studentdashboard from './pages/dashboard/student/studentdashboard';

import StaffProfile from './components/staffprofile';
import StudentProfile from './components/studentProfile';

import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import AddUser from './components/AddUser/addUser';
import AddStaffTable from './components/AddStaffTable/AddStaffTable';
import React,{ useContext, useEffect } from 'react';
import { Context } from './context/context';
function App() {
  const { userType } = useContext(Context);
  const IndElement = () => {
    const navigate = useNavigate();
    useEffect(() => {
      if (userType === "admin") {
        navigate('/Admin-dashboard')
      } else if (userType === "staff") {
        navigate('/Staff-dashboard')
      } else if (userType === "admin") {
        navigate('/Student-dashboard')
      }
    }, [userType])
  }
  return (
    <div className="App">
      <Header />
      {userType === "admin" && <Sidebar />}
      <Routes>
        <Route path='/' exact element={<IndElement />} />

        <Route exact path='/Admin-dashboard' element={<Admindashboard />} />
        <Route exact path='/Staff-dashboard' element={<Staffdashboard />} />
        <Route exact path='/Student-dashboard' element={<Studentdashboard />} />
        <Route path="/u/:id" element={<StaffProfile />} />
        <Route path="/s/:id" element={<StudentProfile />} />
        <Route path="/addStaffTimeTable" element={<AddStaffTable />} />
        <Route path="/addUser" element={<AddUser />} />

        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
