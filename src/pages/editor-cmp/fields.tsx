import React, { useCallback, useMemo, useState } from 'react'
import { Input, Select, Switch, message } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import Modal from 'antd/lib/modal/Modal'
import CodeEditor from './../components/code-editor'
import { correctCode } from './../../const'

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
  updateProp: (key: ICmpSchemaPropKeys, value: string | boolean) => void
}

export function InputField(props: IFieldProps) {
  return <Input
    value={props.value as string}
    onChange={(e) => props.updateProp('value', e.target?.value)}
  />
}

export function SelectField(props: IFieldProps) {
  return <Select
    value={props.value as string}
    options={props.dataSource || []}
    onChange={(value) => props.updateProp('value', value)}
  />
}

export function SwitchField(props: IFieldProps) {
  const checked = Boolean(props.value)
  return <Switch
    checked={checked}
    checkedChildren="开启"
    unCheckedChildren="关闭"
    onChange={(value) => { props.updateProp('value', value) }}
  />
}

export function TextAreaField(props: IFieldProps) {
  const { keepValue } = props

  const [value, setValue] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const stringValue = useMemo(() => {
    const v = props.value
    if (Array.isArray(v)) {
      return JSON.stringify(v)
    }
    return String(v)
  }, [props.value])

  const closeModal = useCallback(() => {
    setModalVisible(false)
  }, [])
  // CloseCircleOutlined
  const saveValue = useCallback(() => {
    try {
      // 使用eval把"[{},...]"转为真正的数组
      const parseValue = eval(String(value))
      props.updateProp('value', parseValue)
      props.updateProp('keepValue', value)
    } catch (error) {
      message.error({
        className: 'code-format-error',
        content: <div className="code-format-error">
          <p className="title">输入格式错误，正确格式如下：</p>
          <pre>
            <code>
              {correctCode}
            </code>
          </pre>
        </div>,
      })
    }
  }, [value])

  return <React.Fragment>
    <TextArea
      value={stringValue}
      onClick={() => setModalVisible(true)}
    />
    <Modal
      visible={modalVisible}
      title={props.label}
      onCancel={closeModal}
      onOk={saveValue}
    >
      <CodeEditor
        value={keepValue}
        onChange={(value) => {
          console.log(value)
          setValue(value)
        }}
      />
    </Modal>
  </React.Fragment>
}

export default class Field {
  static Input: (props: IFieldProps) => JSX.Element
  static Select: (props: IFieldProps) => JSX.Element
  static Switch: (props: IFieldProps) => JSX.Element
  static TextArea: (props: IFieldProps) => JSX.Element
}

Field.Input = InputField
Field.Select = SelectField
Field.Switch = SwitchField
Field.TextArea = TextAreaField
