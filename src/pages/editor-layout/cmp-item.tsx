import React, { CSSProperties, FC, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { IAppState } from './../../store'
import { ICmpSchema } from './../../cmps/type'

interface ICmpItemProps {
  cmp: ICmpSchema
}

const CmpItem: FC<ICmpItemProps> = ({ cmp }) => {

  const { props } = cmp

  const style: CSSProperties = {
    width: props.find(p => p.key === 'width')?.defaultValue + 'px'
  }

  return <div className="cmp-item" style={style}>
    {cmp.label}
  </div>
}

export default CmpItem
