import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import { Context } from '../../context/context';

function Header() {
    const { userType, setUserType, setNavSelected } = useContext(Context);
    const navigate = useNavigate()
    const clickHandler = (e) => {

        setUserType(e.target.value)
        if (e.target.value === "admin") { navigate('/Admin-dashboard') }
        else if (e.target.value === "student") { navigate('/Student-dashboard') }
        else if (e.target.value === "staff") { navigate('/Staff-dashboard') }


    }
    return (
        <nav className="header navbar navbar-expand-sm">
            <div className="header container">
                <a className="navbar-brand" href="#">Schedular</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/addUser">Add User</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/addStaffTimeTable">Add Staff Time Table</Link>
                        </li>

                        <li className="nav-item">

                            <select onChange={(e) => clickHandler(e)} className="form-select w-70 mb-4" aria-label="Default select example">
                                <option  className="font-weight-bold ">---Who you are---</option>
                                <option  value="staff">Staff</option>
                                <option value="student">Sudent</option>
                                <option selected value="admin">Admin</option>
                            </select>
                        </li>





                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default Header