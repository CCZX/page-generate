import { CSSProperties, FC } from 'react'

const Cover: FC = () => {
  const style: CSSProperties = {
    position: 'absolute',
    inset: 0,
    zIndex: 999,
  }

  return <div className="cover" style={style}>

  </div>
}

export default Cover
