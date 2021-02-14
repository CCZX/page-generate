import ButtonSchema from './button/button.schema'
import TextSchema from './text/text.schema'
import ImageSchema from './image/image.schema'

// 组件的JSON配置
const allCmpsListSchema: ICmpSchema[] = [
  ...ButtonSchema,
  ...TextSchema,
  ...ImageSchema,
]

export default allCmpsListSchema
