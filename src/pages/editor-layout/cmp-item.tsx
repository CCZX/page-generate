import { CSSProperties, FC, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions, IAppState } from './../../store'
import { useDragPosition } from './../../utils'

interface ICmpItemProps {
  cmp: ICmpSchema
}

const CmpItem: FC<ICmpItemProps> = ({ cmp }) => {
  const { props } = cmp
  const dispatch = useDispatch()
  const [dragRef, isMoveing, diffPosition] = useDragPosition<HTMLDivElement>()

  const selectedCmp =  useSelector((state: IAppState) => {
    return state.selectedCmp
  })

  const handleClick = useCallback(() => {
    dispatch(actions.setSelectedCmp(cmp.key || ''))
  }, [])

  const cmpPosition = useMemo(() => {
    const { left, top } = cmp.position || { left: 0, top: 0 }
    return {
      left: `${left}px`,
      top: `${top}px`,
    }
  }, [cmp.position])

  useEffect(() => {
    setTimeout(() => {
      if (isMoveing && dragRef.current) {
        const { left, top } = diffPosition
        dragRef.current.style.top = top + 'px'
        dragRef.current.style.left = left + 'px'
      }
    }, 0)
  }, [diffPosition, isMoveing])

  const style: CSSProperties = {
    width: props.find(p => p.key === 'width')?.defaultValue + 'px',
    ...cmpPosition,
  }

  return <div
    ref={dragRef}
    className={ selectedCmp.key === cmp.key ? "cmp-item active" : "cmp-item"}
    style={style}
    onClick={handleClick}
  >
    {cmp.label}
  </div>
}

export default CmpItem
