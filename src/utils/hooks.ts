import { useCallback, useEffect, useRef, useState } from 'react'
import { findParentNode } from './common'

export function useDebounce(callback: noop, wait: number = 500, deps: any[] = []) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  return useCallback((...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    timerRef.current = setTimeout(() => {
      callback.apply(null, args)
    }, wait)
  }, [...deps])
}

export function useMove<T extends HTMLElement>(
  range?: { minTop: number, maxTop: number, minLeft: number, maxLeft: number },
  onMoveing?: noop,
  onMoveEnd?: noop,
): [React.RefObject<T>, boolean, {left: number, top: number}] {

  const { minTop, maxTop, minLeft, maxLeft } = range || {}

  const dragRef = useRef<T>(null)
  const [isMoveing, setMoveing] = useState(false)
  const [positon, setPosition] = useState({left: 0, top: 0})

  let startX = 0, startY = 0, originTop = 0, originLeft = 0
  const targetWidth = useRef(0)
  const targetHeight = useRef(0)

  function handleMousemove(e: MouseEvent) {
    e.preventDefault()
    onMoveing && onMoveing()
    const { clientX, clientY } = e
    let diffX = clientX - startX
    let diffY = clientY - startY
    let nextTop = originTop + diffY
    let nextLeft = originLeft + diffX
    if (minTop !== undefined) {
      nextTop = nextTop < minTop ? minTop : nextTop
    }
    if (maxTop !== undefined) {
      nextTop = nextTop > maxTop - targetHeight.current ? maxTop - targetHeight.current : nextTop
    }
    if (minLeft !== undefined) {
      nextLeft = nextLeft < minLeft ? minLeft : nextLeft
    }
    if (maxLeft !== undefined) {
      nextLeft = nextLeft > maxLeft - targetWidth.current ? maxLeft - targetWidth.current : nextLeft
    }
    setPosition({ left: nextLeft, top: nextTop })
    setMoveing(true)
  }

  function handleMouseleave() {
    setMoveing(false)
    setTimeout(() => {
      typeof onMoveEnd === 'function' && onMoveEnd()
    }, 0);
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
      // if (!targetWidth.current || !targetHeight.current) {
        const { width, height } = dragRef.current?.getBoundingClientRect()!
        targetWidth.current = width
        targetHeight.current = height
      // }
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
