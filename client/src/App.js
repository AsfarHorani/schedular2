import './App.css';
import Signin from './pages/auth/auth'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import Admindashboard from './pages/dashboard/admindashboard';
import UserProfile from './components/staffprofile';
import Header from './components/header/header';
import Sidebar from './components/sidebar/sidebar';
import AddUser from './components/AddUser/addUser';
import AddStaffTable from './components/AddStaffTable/AddStaffTable';
function App() {
  return (
    <div className="App">
      <Header />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Admindashboard />} />
        <Route path="/u/:id" element={<UserProfile />} />
        <Route path="/addStaffTimeTable" element={<AddStaffTable />} />
        <Route path="/addUser" element={<AddUser />} />

        <Route exact path="/signin" element={<Signin />} />
      </Routes>
    </div>
  );
}

export default App;
