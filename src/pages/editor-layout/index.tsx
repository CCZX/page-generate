import React, { FC, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Grid from './../components/grid'
import CmpItem from './cmp-item'
import { IAppState, actions } from './../../store'
import { DRAG_DROP_CMP, editorLayoutPosition } from './../../const'
import { useDebounce } from './../../utils'
import './index.scss'

interface IEditorLayoutProps {
  isPreview?: boolean
}

const EditorLayout: FC<IEditorLayoutProps> = (props) => {
  const { isPreview = false } = props

  const editorRef = useRef<HTMLDivElement>(null)
  const [editorRect, setEditorRect] = useState<DOMRect>({} as DOMRect)
  const dispatch = useDispatch()
  const renderedCmps = useSelector((state: IAppState) => {
    return state.renderedCmps
  })

  const getEditorRect = useDebounce(() => {
    const rect = editorRef.current?.getBoundingClientRect()
    setEditorRect(rect!)
  })

  useEffect(() => {
    function getEditorRect() {
      const rect = editorRef.current?.getBoundingClientRect()
      setEditorRect(rect!)
    }
    getEditorRect()
    window.addEventListener('resize', getEditorRect)

    return () => {
      window.removeEventListener('resize', getEditorRect)
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const { clientX, clientY } = e.nativeEvent
    const { left, top } = editorLayoutPosition
    const data = JSON.parse(e.dataTransfer.getData(DRAG_DROP_CMP))
    const { cmpType, offsetX, offsetY } = data
    const cmpPosition = { top: clientY - top - offsetY, left: clientX - left - offsetX }
    dispatch(actions.createCmp({ cmpType, cmpPosition }))
  }, [])

  return <div
    ref={editorRef}
    className="editor-layout"
    onDragOver={handleDragOver}
    onDrop={handleDrop}
  >
    {
      !isPreview && <Grid width={editorRect.width} height={editorRect.height} />
    }
    {
      renderedCmps.map(cmp => {
        return <CmpItem 
          key={cmp.key}
          cmp={cmp}
          isPreview={isPreview}
          editorRect={editorRect}
        />
      })
    }
  </div>
}

export default EditorLayout
