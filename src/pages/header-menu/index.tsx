import { FC } from 'react'
import { Tooltip } from 'antd'
import logo from './../../assets/logo.png'
import './index.scss'

const HeaderMenu: FC<any> = (props) => {
  return <div className="header-menu">
    <div className="header-menu__logo">
      <img src={logo} height="100%" alt=""/>
      <span className="title">Page Generate</span>
    </div>
    <Tooltip placement="bottom" title="点击预览布局">
      <div className="preview"></div>
    </Tooltip>
  </div>
}

export default HeaderMenu
