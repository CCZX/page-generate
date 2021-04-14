import { FC } from 'react'

const Text: FC<any> = (props) => {
  const { content } = props
  return <div>
    {content || "在右侧输入文字"}
  </div>
}

export default Text
