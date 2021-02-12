import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import clonedeep from 'lodash.clonedeep'
import allCmpsListSchema from './../cmps'
import { uuid } from './../utils'

const mock: ICmpSchema = {
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
      "defaultValue": "auto"
    },
    {
      "key": "height",
      "label": "高",
      "type": "Input",
      "defaultValue": "auto"
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
  "key": "14464feb-0a54-8a8c-931f-7b5aa7d9952d"
}

const initState: {
  renderedCmps: ICmpSchema[]
  selectedCmp: ICmpSchema
} = {
  // renderedCmps: [mock],
  // selectedCmp: mock,
  renderedCmps: [],
  selectedCmp: {} as ICmpSchema,
}

export const pgSlice = createSlice({
  name: 'pageGenerate',
  initialState: initState,
  reducers: {
    // 新增组件
    createCmp(state, action: PayloadAction<{
      cmpType: string, cmpPosition: { top: number, left: number }
    }>) {
      const { payload: { cmpType, cmpPosition } } = action
      const cmp = allCmpsListSchema.find(cmp => cmp.type === cmpType)
      // 使用 clonedeep 防止修改同一个对象
      const cloneCmp = clonedeep(cmp)
      if (cloneCmp) {
        cloneCmp.key = uuid()
        cloneCmp.position = cmpPosition
        state.renderedCmps.push(cloneCmp)
        state.selectedCmp = cloneCmp
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
    updateCmp({ renderedCmps, selectedCmp }, action: PayloadAction<{
      cmpKey: string, propKey: string, propValue: string | boolean
    }>) {
      const { payload: { cmpKey, propKey, propValue } } = action
      const cmp = renderedCmps.find(cmp => cmp.key === cmpKey)
      if (cmp) {
        const propIndex = cmp.props.findIndex(prop => prop.key === propKey)
        cmp.props[propIndex].defaultValue = propValue
        selectedCmp.props[propIndex].defaultValue = propValue
      }
    },
    // 当前选中的组件
    setSelectedCmp(state, action: PayloadAction<string>) {
      const { payload: key } = action
      const cmp = state.renderedCmps.find(cmp => cmp.key === key) || {}
      state.selectedCmp = cmp as ICmpSchema
    },
  }
})

export default pgSlice.reducer
