import React from 'react'
import { Link } from 'react-router-dom'
import './card.css'
function Card({user,type}) {
  console.log(user)
    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">{user.name}</h4>
                <p className="card-text">id: {user.userId}</p>
                <p className="card-text pt-0 mt-0">{user.depart}</p>
                <Link to={type==="staff"?`/u/${user._id}` : `/s/${user._id}`} className="btn btn-primary">Check his profile</Link>
            </div>
        </div>

    )
}

export default Card