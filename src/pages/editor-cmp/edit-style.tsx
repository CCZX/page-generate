import { FC } from 'react'

interface IEditstyleProps {
  cmp: ICmpSchema
}

const Editstyle: FC<IEditstyleProps> = () => {

  return <div className="editor-cmp__style">
    自定义样式
  </div>
}

export default Editstyle
