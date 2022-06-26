import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './header.css'
import { Context } from '../../context/context';
import { BsArrowRightCircleFill } from 'react-icons/bs';

function Header() {
    const { signoutHandler, userInfo, userType, setUserType, setNavSelected } = useContext(Context);
    const navigate = useNavigate()


    let list = null;
    if (userInfo) {
        if (userInfo.type === "admin") {
            list = (<><li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/addUser">Add User</Link>
            </li>
                <li className="nav-item">
                    <Link className="nav-link active" aria-current="page" to="/addStaffTimeTable">Add Staff Time Table</Link>
                </li></>)
        }

        else if (userInfo.type === "student") {
            list = (<li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/addStudentTimeTable">Add Timetable</Link>
            </li>)
        }
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

                        {list}






                    </ul>
                    <div>
                    <BsArrowRightCircleFill onClick={signoutHandler} />
                    signout
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header