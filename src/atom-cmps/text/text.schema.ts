import { cmpSchemaCommonProps } from '../const'

const TextConfig: ICmpSchema[] = [
  {
    type: 'Text',
    label: '文本',
    props: [
      ...cmpSchemaCommonProps,
      {
        key: 'content',
        label: '文本内容',
        type: 'Input',
        value: '',
      }
    ],
    events: [
      {
        key: 'onClick1',
        label: '点击事件',
        type: 'onClick',
        value: '',
      }
    ]
  }
]

export default TextConfig
