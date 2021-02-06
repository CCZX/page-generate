import React, { FC } from 'react'

const Text: FC<any> = (props) => {
  const { content } = props
  return <div>
    {content}在左侧编辑文字
  </div>
}

export default Text
