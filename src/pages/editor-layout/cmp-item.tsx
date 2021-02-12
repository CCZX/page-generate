import { CSSProperties, FC, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCmpField } from './../../cmps/field'
import { actions, IAppState } from './../../store'
import { useDragPosition } from './../../utils'
import { processRenderCmpProps } from './utils'

interface ICmpItemProps {
  cmp: ICmpSchema
}

const DEFAULT_CLS = "cmp-item-wrapper"

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
  const RenderCmp = getCmpField(cmp.type)

  const renderCmpPropsMap = processRenderCmpProps(props)

  return <div
    ref={dragRef}
    className={ selectedCmp.key === cmp.key ? `${DEFAULT_CLS} active` : `${DEFAULT_CLS}`}
    style={style}
    onClick={handleClick}
  >
    <RenderCmp {...renderCmpPropsMap} children={cmp.label} />
  </div>
}

export default CmpItem
