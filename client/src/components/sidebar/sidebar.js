import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { Context } from '../../context/context';

import "./sidebar.css";



function Sidebar() {
    const navigate = useNavigate();
    const { navselected, setNavselected } = useContext(Context);
    const clickHandler = (val) => {
        setNavselected(val);
        navigate('/');

    }
    return (
        <div class="sidebar">
            <div className="sidebar__logoContainer">
                <img className="sidebar__logo" alt="any picture" />
                <h2 className="heading">Company</h2>
            </div>
            <ul>
                <li onClick={() => clickHandler("staff")} >Staff</li>
                <li onClick={() => clickHandler("students")} >Students</li>
            </ul>
        </div>
    )
}

export default Sidebar