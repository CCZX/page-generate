import { FC, useCallback, useEffect, useRef } from 'react'
import publisher from './../../event-bus'
import { editorLayoutPosition } from './../../../const'
import './index.scss'

const nearDistance = 2
// 展示的🧵，X轴上中下、Y轴上中下
const lines = ['xt', 'xc', 'xb', 'yr', 'yc', 'yl'] as const
type TypeLines = typeof lines[number]

function genLinesMap(flag: boolean) {
  return lines.reduce<{[key in TypeLines]: boolean}>((res, currLine) => {
    return { ...res, [currLine]: flag }
  }, {} as {[key in TypeLines]: boolean})
}

function isNear(pA: number, pB: number) {
  return Math.abs(pA - pB) < nearDistance
}

const MarkLine: FC = () => {
  const linesRef = useRef<HTMLDivElement>(null)
  // const [linesVisible, setLinesVisible] = useState<{[key in TypeLines]: boolean}>(genLinesMap(false))
  
  const hiddenLines = useCallback(() => {
    const linesWrap = document.querySelector('.mark-lines')
    const lines = Array.from(linesWrap?.children || []) as HTMLElement[]
    lines.forEach(item => {
      item.style.visibility = 'hidden'
    })
  }, [])

  const showLines = useCallback((moveingNode: HTMLElement) => {
    const linesWrap = document.querySelector('.mark-lines')
    hiddenLines()
    const allRenderedCmps = Array.from(document.querySelectorAll('.cmp-item-wrapper'))
    const {
      width: moveingNodeWidth,
      height: moveingNodeHeight,
      top: moveingNodeTop,
      bottom: moveingNodeBottom,
      right: moveingNodeRight,
      left: moveingNodeLeft
    } = moveingNode.getBoundingClientRect()
    const moveingNodeXtDis = moveingNodeTop - editorLayoutPosition.top
    const moveingNodeXcDis = moveingNodeTop - editorLayoutPosition.top + moveingNodeHeight/2
    const moveingNodeXbDis = moveingNodeBottom - editorLayoutPosition.top
    const moveingNodeYrDis = moveingNodeRight - editorLayoutPosition.left
    const moveingNodeYcDis = moveingNodeRight - editorLayoutPosition.left - moveingNodeWidth/2
    const moveingNodeYlDis = moveingNodeLeft - editorLayoutPosition.left
    const lines = Array.from(linesWrap?.children || []) as HTMLElement[]
    lines[0].style.top = moveingNodeXtDis + 'px'
    lines[1].style.top = moveingNodeXcDis + 'px'
    lines[2].style.top = moveingNodeXbDis + 'px'
    lines[3].style.left = moveingNodeYrDis + 'px'
    lines[4].style.left = moveingNodeYcDis + 'px'
    lines[5].style.left = moveingNodeYlDis + 'px'
    function showXLine(xDistance: number) {
      return allRenderedCmps.some(node => {
        const { height, top, bottom } = node.getBoundingClientRect()
        const xtDis = top - editorLayoutPosition.top
        const xcDis = top - editorLayoutPosition.top + height/2
        const xbDis = bottom - editorLayoutPosition.top
        return node !== moveingNode && (
          isNear(xtDis, xDistance) || isNear(xcDis, xDistance) || isNear(xbDis, xDistance)
        )
      })
    }
    function showYLine(yDistance: number) {
      return allRenderedCmps.some(node => {
        const { width, right, left } = node.getBoundingClientRect()
        const yrDis = right - editorLayoutPosition.left
        const ycDis = right - editorLayoutPosition.left - width/2
        const ylDis = left - editorLayoutPosition.left
        return node !== moveingNode && (
          isNear(yrDis, yDistance) || isNear(ycDis, yDistance) || isNear(ylDis, yDistance)
        )
      })
    }
    lines[0].style.visibility = showXLine(moveingNodeXtDis) ? 'visible' : 'hidden'
    lines[1].style.visibility = showXLine(moveingNodeXcDis) ? 'visible' : 'hidden'
    lines[2].style.visibility = showXLine(moveingNodeXbDis) ? 'visible' : 'hidden'
    lines[3].style.visibility = showYLine(moveingNodeYrDis) ? 'visible' : 'hidden'
    lines[4].style.visibility = showYLine(moveingNodeYcDis) ? 'visible' : 'hidden'
    lines[5].style.visibility = showYLine(moveingNodeYlDis) ? 'visible' : 'hidden'
  }, [linesRef.current])

  useEffect(() => {
    publisher.on('moveing', (node: HTMLElement) => {
      showLines(node)
    }, 'watcherMoveing')

    publisher.on('moveEnd', () => {
      hiddenLines()
    }, 'watcherMoveEnd')

    hiddenLines()
  }, [])

  return <div ref={linesRef} className="mark-lines">
    {
      lines.map(lineItem => {
        return <div
          key={lineItem}
          className={`${lineItem} ${lineItem.includes('x') ? 'x-line' : 'y-line'} line`}
        />
      })
    }
  </div>
}

export default MarkLine
