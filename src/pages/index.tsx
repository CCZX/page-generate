import React, { FC } from 'react'
import SideBar from './side-panel'
import SettingProps from './setting-props'
import './index.scss'

// Handwerker
const App: FC<any> = () => {
  return <div className="pg-container">
    <header className="pg-header"></header>
    <main className="pg-body">
      <aside className="side-panel">
        <SideBar />
      </aside>
      <div className="editor-layout">
        
      </div>
      <div className="setting-props">
        <SettingProps />
      </div>
    </main>
  </div>
}

export default App
