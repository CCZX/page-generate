import React, { FC, useCallback } from 'react'
import cmpsSchema from '../../cmps'
import { DRAG_DROP_CMP } from './../../const'
import { IDragSourceCmpItemProps } from './type'
import './index.scss'

const DragSourceCmpItem: FC<IDragSourceCmpItemProps> = ({ cmp }) => {
  const { label } = cmp

  const handleDragStart = useCallback((e: React.DragEvent, type: string) => {
    console.log('handleDragStart', e, type)
    e.dataTransfer.setData(DRAG_DROP_CMP, type)
  }, [])

  return <div
    className="cmp-item"
    draggable={true}
    onDragStart={(e) => handleDragStart(e, cmp.type)}
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
