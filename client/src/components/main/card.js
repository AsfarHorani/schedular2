import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'
function Card({user,type}) {
  console.log(user)
    console.log(type)
   const clickHandler=(id)=>{
    if( type==="staff"){
        return `/u/${id}` 
    }else if(type==="students"){
        return `/s/${id}`
     
    }  else{
        return `/a/${id}`;
    }


   }
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{user.name}</h4>
                <p className="card-text">id: {user.userId}</p>
                <p className="card-text pt-0 mt-0">{user.depart}</p>
                <Link to={clickHandler(user._id)} className="btn btn-primary">Check his profile</Link>
            </div>
        </div>

    )
}

export default Card