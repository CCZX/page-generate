declare interface ICmpSchema {
  key?: string
  type: string // 组件的类型，比如 button，table...，渲染组件时会通过type获取对应的组件
  label: string // 组件的文字描述比如按钮、表单...
  position?: { // 相对于 editorlayout 的位置，拖入布局后生成
    top: number,
    left: number
  }
  props: ICmpSchemaProp[] // 组件的 props
  events: ICmpSchemaEvent[] // 组件的事件
}

declare interface ICmpSchemaProp {
  key: string
  label: string
  type: 'Input' | 'Select' | 'Switch' // 配置该 property 时渲染的组件类型，只支持特定类型
  defaultValue?: string | boolean // 'v,v,v,v'
  dataSource?: IDataSource[]
}

declare interface IDataSource {
  key: string
  label: string
  value: any
}

declare interface ICmpSchemaEvent {
  key: string
  label: string
  type: string // 事件类型，比如onClick、onChange...
  value: string // 事件处理函数
}

declare module 'url' {
  export interface IUrl {
    host?: string
  }
}
