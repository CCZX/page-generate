import React, { FC } from 'react'

const Resize: FC = ({ children }) => {
  return <div className="resize-wrap">
    {children}
  </div>
}

export default Resize
