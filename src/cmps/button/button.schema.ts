import { cmpSchemaCommonProps } from '../const'

const ButtonConfig: ICmpSchema[] = [
  {
    type: 'Button',
    label: '按钮',
    props: [
      ...cmpSchemaCommonProps,
      {
        key: 'danger',
        label: '设置危险按钮',
        type: 'Switch',
        defaultValue: false,
        dataSource: []
      },
      {
        key: 'size',
        label: '设置按钮大小',
        type: 'Select',
        defaultValue: 'middle',
        dataSource: [
          {key: 'large', value: 'large', label: 'large'},
          {key: 'middle', value: 'middle', label: 'middle'},
          {key: 'small', value: 'small', label: 'small'},
        ]
      },
      {
        key: 'type',
        label: '设置按钮类型',
        type: 'Select',
        defaultValue: 'default',
        dataSource: [
          {key: 'primary', value: 'primary', label: 'primary'},
          {key: 'ghost', value: 'ghost', label: 'ghost'},
          {key: 'dashed', value: 'dashed', label: 'dashed'},
          {key: 'link', value: 'link', label: 'link'},
          {key: 'text', value: 'text', label: 'text'},
          {key: 'default', value: 'default', label: 'default'},
        ]
      },
    ],
    events: [
      {
        key: 'onClick1',
        label: '点击事件',
        type: 'onClick',
      }
    ]
  }
]

export default ButtonConfig
