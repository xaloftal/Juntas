import React from 'react';
import './HeaderLogin.css'

const Header = () => {
    return (
      <div className="header">
            <img
                src={require("./juntas-logo.png")}
                alt="logo"
                className='img'/>
      </div>   
    );
  }
  
export default Header;
  