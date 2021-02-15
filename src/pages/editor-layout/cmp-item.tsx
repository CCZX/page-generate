import { CSSProperties, FC, useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Cover from './../components/cover'
import { getCmpField } from './../../cmps/field'
import { actions, IAppState } from './../../store'
import { useMove, findParentNode } from './../../utils'
import { processRenderCmpProps } from './utils'
import publisher from './../event-bus'

interface ICmpItemProps {
  cmp: ICmpSchema,
  isPreview: boolean,
  editorRect: DOMRect,
}

const DEFAULT_CLS = "cmp-item-wrapper"
const EDITOR_LAYOUT_CLS = 'editor-layout'
const cmpWrapPoints = ['tl', 'tc', 'tr', 'rc', 'br', 'bc', 'bl', 'lc']

const CmpItem: FC<ICmpItemProps> = (props) => {
  const { cmp, editorRect, isPreview } = props
  const dispatch = useDispatch()
  const [dragRef, isMoveing, diffPosition] = useMove<HTMLDivElement>({
    minTop: 0,
    maxTop: editorRect.bottom - editorRect.top,
    minLeft: 0,
    maxLeft: editorRect.right - editorRect.left
  }, () => {
    const moveingNode = dragRef.current
    publisher.emit('moveing', moveingNode)
  }, () => {
    const moveingNode = dragRef.current
    publisher.emit('moveEnd', moveingNode)
  })

  const selectedCmp =  useSelector((state: IAppState) => {
    return state.selectedCmp
  })

  const handleClick = useCallback(() => {
    if (!isPreview) {
      dragRef.current?.classList.add('active')
      dispatch(actions.setSelectedCmp(cmp.key || ''))
    }
  }, [isPreview])

  useEffect(() => {
    const editorLayoutDOM = document.querySelector(`.${EDITOR_LAYOUT_CLS}`)
    function handleClick(e: Event) {
      const parent = findParentNode(e.target as HTMLElement, DEFAULT_CLS)
      if (!parent) {
        dragRef.current?.classList.remove('active')
        dispatch(actions.setSelectedCmp(''))
      }
    }
    editorLayoutDOM?.addEventListener('click', handleClick)
    return () => {
      editorLayoutDOM?.removeEventListener('click', handleClick)
    }
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
      const { left, top } = diffPosition
      if (isMoveing && dragRef.current) {
        dragRef.current.style.top = top + 'px'
        dragRef.current.style.left = left + 'px'
      }
      if (!isMoveing && dragRef.current && left && top) {
        dispatch(actions.updateCmpPosition({
          cmpKey: cmp.key || '',
          position: {
            left: left,
            top: top,
          }
        }))
      }
    }, 0)
  }, [diffPosition, isMoveing])

  const style: CSSProperties = {
    width: (cmp.props || []).find(p => p.key === 'width')?.defaultValue + 'px',
    ...cmpPosition,
  }
  const RenderCmp = getCmpField(cmp.type)

  const renderCmpPropsMap = processRenderCmpProps(cmp.props)

  const renderCmpEvents = cmp.events.reduce((eventsMap, event) => {
    return { 
      ...eventsMap,
      [event.type]: function (e: any) {
        eval(`${event.value}`)
      }
    }
  }, {})

  const cls = useMemo(() => {
    if (isPreview) {
      return DEFAULT_CLS
    }
    return selectedCmp.key === cmp.key ? `${DEFAULT_CLS} active` : `${DEFAULT_CLS}`
  }, [selectedCmp, cmp, isPreview])

  return <div
    ref={isPreview ? null : dragRef}
    className={cls}
    style={style}
    onClick={handleClick}
  >
    {
      !isPreview && <Cover />
    }
    {
      !isPreview && cmpWrapPoints.map(p => {
        return <div className={`point point-${p}`} />
      })
    }
    <RenderCmp
      {...renderCmpPropsMap}
      {...renderCmpEvents}
    />
  </div>
}

export default CmpItem
