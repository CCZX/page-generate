import { useCallback, useEffect, useRef, useState } from 'react'
import { findParentNode } from './common'

export function useDebounce() {
  
}

export function useMove<T extends HTMLElement>(): [React.RefObject<T>, boolean, {left: number, top: number}] {
  const dragRef = useRef<T>(null)
  const [isMoveing, setMoveing] = useState(false)
  const [positon, setPosition] = useState({left: 0, top: 0})

  let startX = 0, startY = 0, originTop = 0, originLeft = 0

  function handleMousemove(e: MouseEvent) {
    e.preventDefault()
    const { clientX, clientY } = e
    let diffX = clientX - startX
    let diffY = clientY - startY
    const nextTop = originTop + diffY
    const nextLeft = originLeft + diffX
    setPosition({ left: nextLeft, top: nextTop })
    setMoveing(true)
  }

  function handleMouseleave() {
    setMoveing(false)
    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mouseleave', handleMouseleave)
  }

  useEffect(() => {
    dragRef.current?.addEventListener('mousedown', (e: any) => {
      const cmpWrapper = findParentNode(e.target, 'cmp-item-wrapper')
      if (!cmpWrapper) {
        console.warn(`[warning]`)
        return
      }
      const { top = '0', left = '0' } = cmpWrapper.style || {}
      originTop = parseInt(top || '0')
      originLeft = parseInt(left || '0')
      startX = e.clientX
      startY = e.clientY
      document.addEventListener('mousemove', handleMousemove)
      document.addEventListener('mouseleave', handleMouseleave)
      document.addEventListener('mouseup', handleMouseleave)
    })
  }, [dragRef.current])

  return [dragRef, isMoveing, positon]
}

export function useClickOutside(dom: HTMLElement, callback: noop) {

  const handleClickOutside = (e: MouseEvent) => {
    console.log(e.target, dom)
    if (e.target && !dom?.contains(e.target as Node)) {
      callback(e)
    }
  }

  // const handleClickOutside = useCallback((e: MouseEvent) => {
  //   console.log(e.target, dom)
  //   if (e.target && !dom?.contains(e.target as Node)) {
  //     callback(e)
  //   }
  // }, [callback, dom])

  useEffect(() => {
    window.addEventListener('click', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
    }
  })
}
