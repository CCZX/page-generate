## description

可拖拽渲染的组件，每个组件都有一个 `JSON` 配置文件：

```ts
const mock: ICmpSchema = {
  "key": "14464feb-0a54-8a8c-931f-7b5aa7d9952d", // key 是在拖拽到视图区域后生成的
  "type": "Button", // 每个组件的 type 必须唯一
  "label": "按钮",
  "props": [
    {
      "key": "margin",
      "label": "外边距（上右下左）",
      "type": "Input",
      "defaultValue": "0,0,0,0"
    },
    {
      "key": "size",
      "label": "尺寸",
      "type": "Select",
      "defaultValue": "large",
      "dataSource": [{
        key: 'large',
        label: '大',
        value: 'large'
      },{
        key: 'medium',
        label: '中',
        value: 'medium'
      },{
        key: 'small',
        label: '小',
        value: 'small'
      }]
    }
  ],
  "events": [
    {
      "key": "onClick1",
      "label": "点击事件",
      "type": "onClick"
    }
  ],
}
```
