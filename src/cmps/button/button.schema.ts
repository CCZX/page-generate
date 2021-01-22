import { cmpSchemaCommonProps } from '../const'
import { ICmpSchema } from './../type'

const ButtonConfig: ICmpSchema[] = [
  {
    type: 'Button',
    label: '按钮',
    props: [
      ...cmpSchemaCommonProps,
      {
        key: 'size',
        label: '尺寸',
        type: 'Select',
        defaultValue: '',
        dataSource: []
      }
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
