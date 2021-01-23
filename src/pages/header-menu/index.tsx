import React, { FC } from 'react'
import logo from './../../assets/logo.png'
import './index.scss'

const HeaderMenu: FC<any> = (props) => {
  return <div className="header-menu">
    <div className="header-menu__logo">
      <img src={logo} height="100%" alt=""/>
      <span className="title">Page Generate</span>
    </div>
  </div>
}

export default HeaderMenu
