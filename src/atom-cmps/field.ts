import Button from './button'
import Text from './text'
import Image from './image'
import List from './list'

const cmpField: {[key: string]: Function} = {
  Button: Button,
  Text: Text,
  Image: Image,
  List: List,
}

export function getCmpField(type: string) {
  return cmpField[type]
}
