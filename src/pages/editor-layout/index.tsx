import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from './../components/grid'
import CmpItem from './cmp-item'
import cmpsSchema from '../../cmps'
import { IAppState, actions } from './../../store'
import { DRAG_DROP_CMP } from './../../const'
import './index.scss'

const EditorLayout: FC<any> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editorRect, setEditorRect] = useState({width: 0, height: 0})
  const dispatch = useDispatch()
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

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    console.log('handleDragOver')
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const cmpType = e.dataTransfer.getData(DRAG_DROP_CMP)
    dispatch(actions.createCmp(cmpType))
  }, [])

  return <div
    ref={editorRef}
    className="editor-layout"
    onDragOver={handleDragOver}
    onDrop={handleDrop}
  >
    <Grid width={editorRect.width} height={editorRect.height} />
    {
      renderedCmps.map(cmp => {
        return <CmpItem key={cmp.key} cmp={cmp} />
      })
    }
  </div>
}

export default EditorLayout
