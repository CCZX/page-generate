import React, { CSSProperties, FC, useCallback, useMemo } from 'react'
import { useDispatch } from 'react-redux'
import DragPosition from './../components/drag-position'
import { actions } from './../../store'
import { useDragPosition } from './../../utils'

interface ICmpItemProps {
  cmp: ICmpSchema
}

const CmpItem: FC<ICmpItemProps> = ({ cmp }) => {
  const { props } = cmp
  const dispatch = useDispatch()
  const [dragRef, diffPosition] = useDragPosition()
  console.log(diffPosition)

  const handleClick = useCallback(() => {
    dispatch(actions.setSelectedCmp(cmp.key || ''))
  }, [])

  const cmpPosition = useMemo(() => {
    const { left, top } = cmp.position || { left: 0, top: 0 }
    const { x, y } = diffPosition
    return {
      left: `${left + x}px`,
      top: `${top + y}px`,
    }
  }, [cmp.position, diffPosition])

  const style: CSSProperties = {
    width: props.find(p => p.key === 'width')?.defaultValue + 'px',
    ...cmpPosition,
  }

  return <div
    ref={dragRef as any}
    className="cmp-item"
    style={style}
    onClick={handleClick}
  >
    {cmp.label}
  </div>

  return <DragPosition onPositionChange={() => {}}>
    <div
      className="cmp-item"
      style={style}
      onClick={handleClick}
    >
      {cmp.label}
    </div>
  </DragPosition>
}

export default CmpItem
