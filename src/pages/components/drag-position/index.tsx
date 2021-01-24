import React, { FC } from 'react'

interface IDragPositionProps {
  onPositionChange: () => void
}

const DragPosition: FC<IDragPositionProps> = (props) => {
  return <div>
    {props.children}
  </div>
}

export default DragPosition
