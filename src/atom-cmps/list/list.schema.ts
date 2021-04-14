import { cmpSchemaCommonProps } from '../const'

const ListConfig: ICmpSchema[] = [
  {
    type: 'List',
    label: '列表',
    props: [
      ...cmpSchemaCommonProps,
      {
        key: 'dataSource',
        label: '列表数据源',
        type: 'TextArea',
        value: '',
        keepValue: '',
      },
      {
        key: 'renderItem',
        label: '自定义渲染列表项',
        type: 'TextArea',
        value: '',
        keepValue: '',
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

export default ListConfig
