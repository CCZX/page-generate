import React, { FC, useCallback } from 'react'
import cmpsSchema from '../../atom-cmps'
import { DRAG_DROP_CMP } from './../../const'
import { IDragSourceCmpItemProps } from './type'
import './index.scss'

const DragSourceCmpItem: FC<IDragSourceCmpItemProps> = ({ cmp }) => {
  const { label } = cmp

  const handleDragStart = useCallback((e: React.DragEvent, type: string) => {
    const { offsetX, offsetY } = e.nativeEvent
    // @ts-ignore
    e.nativeEvent.target.style.cursor = 'grabbing'
    e.dataTransfer.setData(DRAG_DROP_CMP, JSON.stringify({
      cmpType: type,
      offsetX: offsetX,
      offsetY: offsetY
    }))
  }, [])

  const handleDragEnd = useCallback((e: React.DragEvent) => {
    // @ts-ignore
    e.nativeEvent.target.style.cursor = 'grab'
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    // @ts-ignore
    e.nativeEvent.target.style.cursor = 'grabbing'
  }, [])

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    // @ts-ignore
    e.nativeEvent.target.style.cursor = 'grab'
  }, [])

  return <div
    className="cmp-item"
    draggable={true}
    onDragStart={(e) => handleDragStart(e, cmp.type)}
    onDragEnd={handleDragEnd}
    
    // onMouseDown={handleMouseDown}
    // onMouseUp={handleMouseUp}
  >
    {label}
  </div>
}

const SidePanel: FC<any> = () => {

  return <div className="side-panel">
    <div className="side-panel__cmp-list">
      {
        cmpsSchema.map(cmp => {
          return <DragSourceCmpItem key={cmp.type} cmp={cmp} />
        })
      }
    </div>
  </div>
}

export default SidePanel
