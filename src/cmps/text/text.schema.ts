import { cmpSchemaCommonProps } from '../const'

const TextConfig: ICmpSchema[] = [
  {
    type: 'Text',
    label: '文本',
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

export default TextConfig
