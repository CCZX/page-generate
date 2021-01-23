import React, { CSSProperties, FC, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { actions } from './../../store'
import { ICmpSchema } from './../../cmps/type'

interface ICmpItemProps {
  cmp: ICmpSchema
}

const CmpItem: FC<ICmpItemProps> = ({ cmp }) => {
  const { props } = cmp
  const dispatch = useDispatch()

  const handleClick = useCallback(() => {
    dispatch(actions.setSelectedCmp(cmp.key || ''))
  }, [])

  const style: CSSProperties = {
    width: props.find(p => p.key === 'width')?.defaultValue + 'px'
  }

  return <div
    className="cmp-item"
    style={style}
    onClick={handleClick}
  >
    {cmp.label}
  </div>
}

export default CmpItem
