import Button from './button'
import Text from './text'
import Image from './image'

const cmpField: {[key: string]: Function} = {
  Button: Button,
  Text: Text,
  Image: Image,
}

export function getCmpField(type: string) {
  return cmpField[type]
}
