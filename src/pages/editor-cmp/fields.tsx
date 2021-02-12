import { Input, Select } from 'antd'

const fieldsMap: { [key: string]: Function } = {
  Input: Input,
  Select: Select
}

export function getField(type: string) {
  const field = fieldsMap[type] || Input
  return field
}

interface IInputFieldProps {
  onBlur: (e: any) => void
}

export function InputField(props: IInputFieldProps) {
  return <Input
    onBlur={props.onBlur}
  />
}

export function SelectField() {
  
}
