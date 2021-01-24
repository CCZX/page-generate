import { useEffect, useRef, useState } from 'react'

export function useDebounce() {
  
}

export function useDragPosition<T>(): [any, {x: number, y: number}] {
  const dragRef = useRef<HTMLDivElement>(null)
  const [diff, setDiff] = useState({x: 0, y: 0})


  let startX = 0, startY = 0

  function handleMousemove(e: MouseEvent) {
    e.preventDefault()
    const { clientX, clientY } = e
    let diffX = clientX - startX
    let diffY = clientY - startY
    setDiff({ x: diffX, y: diffY })
  }

  function handleMouseleave(e: MouseEvent) {
    document.removeEventListener('mousemove', handleMousemove)
    document.removeEventListener('mouseleave', handleMouseleave)
  }

  useEffect(() => {
    dragRef.current?.addEventListener('mousedown', (e) => {
      console.log('down')
      startX = e.clientX
      startY = e.clientY
      document.addEventListener('mousemove', handleMousemove)
      document.addEventListener('mouseleave', handleMouseleave)
      document.addEventListener('mouseup', handleMouseleave)
    })
  }, [dragRef.current])

  return [dragRef, diff]
}
