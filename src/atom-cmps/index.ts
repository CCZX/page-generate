import ButtonSchema from './button/button.schema'
import TextSchema from './text/text.schema'
import ImageSchema from './image/image.schema'
import ListSchema from './list/list.schema'

// 组件的JSON配置
const allCmpsListSchema: ICmpSchema[] = [
  ...ButtonSchema,
  ...TextSchema,
  ...ImageSchema,
  ...ListSchema,
]

export default allCmpsListSchema
