import React, { FC } from 'react'
import HeaderMenu from './header-menu'
import SideBar from './side-panel'
import EditorLayout from './editor-layout'
import EditorCmp from './editor-cmp'
import './index.scss'

// Handwerker
const App: FC<any> = () => {
  return <div className="pg-container">
    <header className="pg-header">
      <HeaderMenu />
    </header>
    <main className="pg-body">
      <aside className="side-panel-wrapper">
        <SideBar />
      </aside>
      <div className="editor-layout-wrapper">
        <EditorLayout />
      </div>
      <div className="editor-cmp-wrapper">
        <EditorCmp />
      </div>
    </main>
  </div>
}

export default App
