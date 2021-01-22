import React, { FC, useEffect, useRef, useState } from 'react'
import Grid from './../components/grid'
import './index.scss'

const EditorLayout: FC<any> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorRect, setEditorRect] = useState({width: 0, height: 0})

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
    editor-layout
  </div>
}

export default EditorLayout
