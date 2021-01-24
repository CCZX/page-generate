import { useEffect, useRef, useState } from 'react'

export function useDebounce() {
  
}

export function useDragPosition<T extends HTMLElement>(): [React.RefObject<T>, boolean, {left: number, top: number}] {
  const dragRef = useRef<T>(null)
  const [isMoveing, setMoveing] = useState(false)
  const [positon, setPosition] = useState({left: 0, top: 0})

  let startX = 0, startY = 0, originTop = 0, originLeft = 0

  function handleMousemove(e: MouseEvent) {
    e.preventDefault()
    console.log(',ousemove')
    setMoveing(true)
    const { clientX, clientY } = e
    let diffX = clientX - startX
    let diffY = clientY - startY
    const nextTop = originTop + diffY
    const nextLeft = originLeft + diffX
    setPosition({ left: nextLeft, top: nextTop })
  }

  function handleMouseleave() {
    setMoveing(false)
    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mouseleave', handleMouseleave)
  }

  useEffect(() => {
    dragRef.current?.addEventListener('mousedown', (e: any) => {
      const { top = '0', left = '0' } = e.target?.style || {}
      originTop = parseInt(top)
      originLeft = parseInt(left)
      startX = e.clientX
      startY = e.clientY
      document.addEventListener('mousemove', handleMousemove)
      document.addEventListener('mouseleave', handleMouseleave)
      document.addEventListener('mouseup', handleMouseleave)
    })
  }, [dragRef.current])

  return [dragRef, isMoveing, positon]
}
