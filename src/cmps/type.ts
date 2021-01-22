export interface ICmpSchema {
  key?: string
  type: string // 组件的类型，比如button，table...，渲染组件时会通过type获取对应的组件
  label: string // 组件的文字描述比如按钮、表单...
  props: ICmpSchemaProp[] // 组件的props
  events: ICmpSchemaEvent[] // 组件的事件
}

export interface ICmpSchemaProp {
  key: string
  label: string
  type: string // 配置该property时渲染的组件类型，比如Input、Select...
  defaultValue?: string // 'v,v,v,v'
  dataSource?: IDataSource[]
}

export interface IDataSource {
  key: string
  label: string
  value: any
}

export interface ICmpSchemaEvent {
  key: string
  label: string
  type: string // 事件类型，比如onClick、onChange...
  handler?: (...args: any[]) => any // 事件处理函数
}
