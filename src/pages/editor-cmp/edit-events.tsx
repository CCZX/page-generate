import { FC } from 'react'

interface IEditEventProps {
  cmp: ICmpSchema
}

const EditEvents: FC<IEditEventProps> = () => {

  return <div className="editor-cmp__events">
    事件自定义
  </div>
}

export default EditEvents
