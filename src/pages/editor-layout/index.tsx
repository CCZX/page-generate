import React, { FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import CmpItem from './cmp-item'
import { IAppState } from './../../store'
import Grid from './../components/grid'
import './index.scss'

const EditorLayout: FC<any> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorRect, setEditorRect] = useState({width: 0, height: 0})
  const renderedCmps = useSelector((state: IAppState) => {
    return state.renderedCmps
  })

  useEffect(() => {
    function getEditorRect() {
      const rect = editorRef.current?.getBoundingClientRect()
      setEditorRect({
        width: rect?.width || 0,
        height: rect?.height || 0,
      })
    }
    getEditorRect()
    window.addEventListener('resize', getEditorRect)

    return () => {
      window.removeEventListener('resize', getEditorRect)
    }
  }, [])

  return <div ref={editorRef} className="editor-layout">
    <Grid width={editorRect.width} height={editorRect.height} />
    {
      renderedCmps.map(cmp => {
        return <CmpItem cmp={cmp} />
      })
    }
  </div>
}

export default EditorLayout
