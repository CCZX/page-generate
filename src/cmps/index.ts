import ButtonSchema from './button/button.schema'
import TextSchema from './text/text.schema'
import { ICmpSchema } from './type'

// 组件的JSON配置
const allCmpsListSchema: ICmpSchema[] = [
  ...ButtonSchema,
  ...TextSchema,
]

export default allCmpsListSchema
