import Header from '../../components/header/header';
import Sidebar from '../../components/sidebar/sidebar'
import Main from '../../components/main/main';
import React, { useContext } from 'react'
import { Context } from '../../context/context'
export default function Admindashboard() {
  const { navselected, setNavselected } = useContext(Context);
  console.log(navselected)
  return (
    <div>

      <div className='container-fluid'>

        <Main navselected={navselected} className="content" />

      </div>
    </div>

  )
}
