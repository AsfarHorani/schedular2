import React from 'react'
import { Link } from 'react-router-dom'
import './header.css'
function header() {
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
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Home</a>
                        </li>




                    </ul>

                </div>
            </div>
        </nav>
    )
}

export default header