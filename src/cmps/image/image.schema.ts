import { cmpSchemaCommonProps } from '../const'

const imgDefaultSrc = 'https://pic4.zhimg.com/80/v2-08a492521e064cd904204487e8b1d899_qhd.jpg'

const TextConfig: ICmpSchema[] = [
  {
    type: 'Image',
    label: '图片',
    props: [
      ...cmpSchemaCommonProps,
      {
        key: 'preview',
        label: '开启预览图片',
        type: 'Switch',
        defaultValue: true,
      },
      {
        key: 'src',
        label: '图片地址',
        type: 'Input',
        defaultValue: imgDefaultSrc,
      },
      {
        key: 'width',
        label: '图片宽度',
        type: 'Input',
        defaultValue: '400',
      },
    ],
    events: [
      // {
      //   key: 'onClick1',
      //   label: '点击事件',
      //   type: 'onClick',
      //   value: '',
      // }
    ]
  }
]

export default TextConfig
