import React, { useContext } from 'react'
import { AuthContext } from '../../context/context';
import Card from './card';
import './main.css'
import Admins from './users/admins';
import Staffs from './users/staffs';
import Students from './users/students';

function Main(props){
   console.log(props.navselected)
  let content;
  if (props.navselected === "staff") {
    content = (
      <>
      <Staffs/>
      </>
    )
    
  }
  else if (props.navselected === "students") {
    content = (
      <>
      <Students/>
      </>
    )
  }
  else if (props.navselected === "admins") {
    console.log("admins");
    content = (
      <>
      <Admins/>
      </>)
}

  return (<div className="main container">{content}</div>)
 
}

export default Main