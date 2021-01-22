import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import allCmpsListSchema from './../cmps'
import { uuid } from './../utils'
import { ICmpSchema } from './../cmps/type'

const mock = {
  "type": "Button",
  "label": "按钮",
  "props": [
    {
      "key": "margin",
      "label": "外边距（上右下左）",
      "type": "Input",
      "defaultValue": "0,0,0,0"
    },
    {
      "key": "padding",
      "label": "内边距（上右下左）",
      "type": "Input",
      "defaultValue": "0,0,0,0"
    },
    {
      "key": "border",
      "label": "边框（上右下左）",
      "type": "Input",
      "defaultValue": "0,0,0,0"
    },
    {
      "key": "width",
      "label": "宽",
      "type": "Input",
      "defaultValue": "0,0,0,0"
    },
    {
      "key": "height",
      "label": "高",
      "type": "Input",
      "defaultValue": "0,0,0,0"
    },
    {
      "key": "size",
      "label": "尺寸",
      "type": "Select",
      "defaultValue": "",
      "dataSource": []
    }
  ],
  "events": [
    {
      "key": "onClick1",
      "label": "点击事件",
      "type": "onClick"
    }
  ],
  "key": "14464feb-0a54-8a8c-931f-7b5aa7d9952d"
}

const initState: {
  renderedCmps: ICmpSchema[]
  selectedCmp: ICmpSchema
} = {
  renderedCmps: [],
  selectedCmp: mock
}

export const pgSlice = createSlice({
  name: 'pageGenerate',
  initialState: initState,
  reducers: {
    // 新增组件
    createCmp({ renderedCmps }, action: PayloadAction<string>) {
      const { payload: type } = action
      const cmp = allCmpsListSchema.find(cmp => cmp.type === type)
      if (cmp) {
        cmp.key = uuid()
        renderedCmps.push(cmp)
      }
    },
    // 删除组件
    deleteCmp({ renderedCmps, selectedCmp }, action: PayloadAction<string>) {
      const { payload: key } = action
      renderedCmps = renderedCmps.filter(cmp => cmp.key !== key)
      if (selectedCmp.key === key) {
        selectedCmp = {} as ICmpSchema
      }
    },
    // 更新组件
    updateCmp(state, action: PayloadAction<string>) {

    },
    // 当前选中的组件
    setSelectedCmp({ renderedCmps, selectedCmp }, action: PayloadAction<string>) {
      const { payload: key } = action
      const cmp = renderedCmps.find(cmp => cmp.key === key)
      if (cmp) {
        selectedCmp = cmp
      }
    },
  }
})

export default pgSlice.reducer
