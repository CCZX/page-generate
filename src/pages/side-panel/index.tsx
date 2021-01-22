import React, { FC } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import cmpsSchema from '../../cmps'
import { IAppState, actions } from './../../store'
import { IDragSourceCmpItemProps } from './type'
import './index.scss'

const DragSourceCmpItem: FC<IDragSourceCmpItemProps> = ({ cmp }) => {
  const { label } = cmp
  const dispatch = useDispatch()

  return <div
    className="cmp-item"
    draggable={true}
    onClick={() => dispatch(actions.createCmp(cmp.type))}
  >
    {label}
  </div>
}

const SidePanel: FC<any> = () => {

  const config = useSelector((state: IAppState) => {
    return state
  })

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
