import { Input, Select, Switch } from 'antd'

const fieldsMap: { [key: string]: Function } = {
  Input: Input,
  Select: Select,
  Switch: Switch,
}

export function getField(type: string) {
  const field = fieldsMap[type] || Input
  return field
}


interface IFieldProps extends ICmpSchemaProp {
  updateProp: (value: string | boolean) => void
}

export function InputField(props: IFieldProps) {
  return <Input
    value={props.defaultValue as string}
    onChange={(e) => props.updateProp(e.target?.value)}
  />
}

export function SelectField(props: IFieldProps) {
  return <Select
    value={props.defaultValue as string}
    options={props.dataSource || []}
    onChange={props.updateProp}
  />
}

export function SwitchField(props: IFieldProps) {
  const checked = Boolean(props.defaultValue)
  return <Switch
    defaultChecked={checked}
    checkedChildren="开启"
    unCheckedChildren="关闭"
    onChange={props.updateProp}
  />
}

export default class Field {
  static Input: (props: IFieldProps) => JSX.Element
  static Select: (props: IFieldProps) => JSX.Element
  static Switch: (props: IFieldProps) => JSX.Element
}

Field.Input = InputField
Field.Select = SelectField
Field.Switch = SwitchField
