import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import clonedeep from 'lodash.clonedeep'
import { type } from 'os'
import allCmpsListSchema from '../atom-cmps'
import { uuid } from './../utils'

const mock: ICmpSchema = {
  "type": "Button",
  "label": "按钮",
  "props": [
    {
      "key": "margin",
      "label": "外边距（上右下左）",
      "type": "Input",
      "value": "0,0,0,0"
    },
    {
      "key": "padding",
      "label": "内边距（上右下左）",
      "type": "Input",
      "value": "0,0,0,0"
    },
    {
      "key": "border",
      "label": "边框（上右下左）",
      "type": "Input",
      "value": "0,0,0,0"
    },
    {
      "key": "width",
      "label": "宽",
      "type": "Input",
      "value": "auto"
    },
    {
      "key": "height",
      "label": "高",
      "type": "Input",
      "value": "auto"
    },
    {
      "key": "size",
      "label": "尺寸",
      "type": "Select",
      "value": "large",
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
      "type": "onClick",
      value: '',
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
    // 当前选中的组件
    setSelectedCmp(state, action: PayloadAction<string>) {
      const { payload: key } = action
      const cmp = state.renderedCmps.find(cmp => cmp.key === key) || {}
      state.selectedCmp = cmp as ICmpSchema
    },
    // 更新组件props
    updateCmpProps({ renderedCmps, selectedCmp }, action: PayloadAction<{
      cmpKey: string,
      propKey: string,
      propFieldKey: ICmpSchemaPropKeys,
      propFieldValue: string | boolean
    }>) {
      const { payload: { cmpKey, propKey, propFieldKey, propFieldValue } } = action
      const cmp = renderedCmps.find(cmp => cmp.key === cmpKey)
      if (cmp) {
        const propIndex = cmp.props.findIndex(prop => prop.key === propKey)
        cmp.props[propIndex][propFieldKey] = propFieldValue
        selectedCmp.props[propIndex][propFieldKey] = propFieldValue
      }
    },
    updateCmpEvents({ renderedCmps, selectedCmp }, action: PayloadAction<{
      cmpKey: string, eventKey: string, value: string
    }>) {
      const { payload: { cmpKey, eventKey, value } } = action
      const cmp = renderedCmps.find(cmp => cmp.key === cmpKey)
      if (cmp) {
        const eventIndex = cmp.events.findIndex(event => event.key === eventKey)
        cmp.events[eventIndex].value = value
        selectedCmp.events[eventIndex].value = value
      }
    },
    updateCmpPosition({ renderedCmps, selectedCmp }, action: PayloadAction<{
      cmpKey: string, position: {left: number, top: number}
    }>) {
      const { payload: { cmpKey, position } } = action
      console.log(position)
      const cmp = renderedCmps.find(cmp => cmp.key === cmpKey)
      if (cmp) {
        cmp.position = position
      }
    }
  }
})

export default pgSlice.reducer
