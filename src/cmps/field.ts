import { Input } from 'antd'
import Button from './button'
import Text from './text'

const cmpField: {[key: string]: Function} = {
  Button: Button,
  Text: Text,
}

export function getCmpField(type: string) {
  return cmpField[type]
}
