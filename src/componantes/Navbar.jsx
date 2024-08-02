import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar({logOut  , logUserID}) {
  if(logUserID)
  return (
    <div className="navbar bg-base-100">
    <div className="flex-1">
      <img className='w-14' src="../../public/logo.png" alt="not" srcset="" />
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><Link onClick={()=> {logOut()}} className='btn btn-primary text-lg'>LogOut</Link></li>
      </ul>
    </div>
  </div>
  )
  else {
    return (
      <div className="navbar bg-base-100">
      <div className="flex-1">
        <img className='w-14' src="../../public/logo.png" alt="not" srcset="" />
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
        <li><Link to='/login' className='btn btn-primary text-lg'>Login</Link></li>
        </ul>
      </div>
    </div>
    )
  }
}
