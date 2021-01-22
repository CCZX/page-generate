import { CSSProperties, FC, useEffect, useRef } from 'react'

function draw(ctx: CanvasRenderingContext2D) {
  console.log(ctx)
  ctx.save()
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.lineWidth = 0.5
  ctx.strokeStyle = '#ccc'
  for (let i = 20; i < ctx.canvas.width; i += 20) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, ctx.canvas.height);
    ctx.closePath();
    ctx.stroke();
  }
  for (let j = 20; j < ctx.canvas.height; j += 20) {
    ctx.beginPath();
    ctx.moveTo(0, j);
    ctx.lineTo(ctx.canvas.width, j);
    ctx.closePath();
    ctx.stroke();
  }
  ctx.restore()
}

interface IGridProps {
  width: number
  height: number
  cellWidth?: number
  cellHeight?: number
  bgColor?: string
  cellBorderColor?: string
}

const Grid: FC<IGridProps> = (props) => {
  const { width, height } = props

  const gridRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!gridRef.current) return
    const ctx = gridRef.current.getContext('2d')
    if (!ctx) return
    draw(ctx)
  }, [width, height])

  const style: CSSProperties = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: -1,
  }

  return <canvas style={style} ref={gridRef} width={width} height={height} />
}

export default Grid
