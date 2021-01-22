import { Input, Select } from 'antd'

type IFieldsType = 'Input' | 'Select'

const fieldsMap: {
  [key: string]: Function
} = {
  Input: Input,
  Select: Select
}

export function getField(type: string) {
  return fieldsMap[type]
}
