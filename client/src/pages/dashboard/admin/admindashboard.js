import Header from '../../../components/header/header';
import Sidebar from '../../../components/sidebar/sidebar'
import Main from '../../../components/main/main';
import React, { useContext, useEffect } from 'react'
import { Context } from '../../../context/context'
import { useNavigate } from 'react-router-dom';
export default function Admindashboard() {
  const { isAuth,navselected, setNavselected } = useContext(Context);
  console.log(navselected)
const navigate = useNavigate();
  useEffect(()=>{
    if(!isAuth){
      navigate("/signin");
    }
  },[isAuth])
  return (
    <div>

      <div className='container-fluid'>

        <Main navselected={navselected} className="content" />

      </div>
    </div>

  )
}
