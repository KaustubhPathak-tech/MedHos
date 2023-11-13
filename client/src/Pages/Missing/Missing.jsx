import React from 'react'
import {Link} from 'react-router-dom'
import './Missing.css'
import img_4O4 from '../../Assets/1694272456019.jpg'
const Missing = () => {
  return (
    <div className="not-found">
      
      <img src={img_4O4} alt="Page Not Found" id='img_404'/><br />
      <Link to="/">Go back to the home page</Link>
    </div>
  )
}

export default Missing
