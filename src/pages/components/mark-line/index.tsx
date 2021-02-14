import React, { FC, useCallback, useRef, useState } from 'react'
import publisher from './../../event-bus'
import { editorLayoutPosition } from './../../../const'
import './index.scss'

interface IMarkLineProps {
  // moveingNode: HTMLElement
}

const nearDistance = 5
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

const MarkLine: FC<IMarkLineProps> = (props) => {
  const linesRef = useRef<HTMLDivElement>(null)
  const [linesVisible, setLinesVisible] = useState<{[key in TypeLines]: boolean}>(genLinesMap(false))
  

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
    const allRenderedCmps = document.querySelectorAll('.cmp-item-wrapper')
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
    allRenderedCmps.forEach(cmpNode => {
      if (cmpNode !== moveingNode) {
        const { width, height, top, bottom, right, left } = cmpNode.getBoundingClientRect()
        const xtDis = top - editorLayoutPosition.top
        const xcDis = top - editorLayoutPosition.top + height/2
        const xbDis = bottom - editorLayoutPosition.top
        const yrDis = right - editorLayoutPosition.left
        const ycDis = right - editorLayoutPosition.left - width/2
        const ylDis = left - editorLayoutPosition.left
        // console.log(xtDis, xcDis, xbDis, yrDis, ycDis, ylDis)
        const nextLinesVisible = linesVisible
        console.log(nextLinesVisible)
        const nearXt = isNear(xtDis, moveingNodeXtDis) || isNear(xbDis, moveingNodeXtDis)
        const nearXc = isNear(xcDis, moveingNodeXcDis)
        const nearXb = isNear(xbDis, moveingNodeXbDis)
        const nearYr = isNear(yrDis, moveingNodeYrDis)
        const nearYc = isNear(ycDis, moveingNodeYcDis)
        const nearYl = isNear(ylDis, moveingNodeYlDis)
        console.log(nearXt, nearXc, nearXb, nearYr, nearYc, nearYl)
        lines[0].style.visibility = nearXt ? 'visible' : 'hidden'
        lines[1].style.visibility = nearXc ? 'visible' : 'hidden'
        lines[2].style.visibility = nearXb ? 'visible' : 'hidden'
        lines[3].style.visibility = nearYr ? 'visible' : 'hidden'
        lines[4].style.visibility = nearYc ? 'visible' : 'hidden'
        lines[5].style.visibility = nearYl ? 'visible' : 'hidden'
        setLinesVisible(nextLinesVisible)
      }
    })
  }, [linesRef.current, linesVisible])

  publisher.on('moveing', (node: HTMLElement) => {
    console.log('moveing')
    showLines(node)
  }, 'watcherMoveing')

  publisher.on('moveEnd', (node: HTMLElement) => {
    hiddenLines()
  }, 'watcherMoveEnd')

  return <div ref={linesRef} className="mark-lines">
    {
      lines.map(lineItem => {
        return <div
          key={lineItem}
          className={`${lineItem} ${lineItem.includes('x') ? 'x-line' : 'y-line'} line`}
          // style={{visibility: linesVisible[lineItem] ? 'visible' : 'hidden'}}
        />
      })
    }
  </div>
}

export default MarkLine
