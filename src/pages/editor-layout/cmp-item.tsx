import { CSSProperties, FC, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cover from './../components/cover'
import { getCmpField } from './../../cmps/field'
import { actions, IAppState } from './../../store'
import { useDragPosition } from './../../utils'
import { processRenderCmpProps } from './utils'

interface ICmpItemProps {
  cmp: ICmpSchema,
  isPreview: boolean
}

const DEFAULT_CLS = "cmp-item-wrapper"

const CmpItem: FC<ICmpItemProps> = (props) => {
  const { cmp } = props
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
    width: (cmp.props || []).find(p => p.key === 'width')?.defaultValue + 'px',
    ...cmpPosition,
  }
  const RenderCmp = getCmpField(cmp.type)

  const renderCmpPropsMap = processRenderCmpProps(cmp.props)

  return <div
    ref={dragRef}
    className={ selectedCmp.key === cmp.key ? `${DEFAULT_CLS} active` : `${DEFAULT_CLS}`}
    style={style}
    onClick={handleClick}
  >
    <Cover />
    <RenderCmp {...renderCmpPropsMap} children={cmp.label} />
  </div>
}

export default CmpItem
