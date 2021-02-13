import React, { FC, useCallback, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tabs, Empty } from 'antd';
import EditProps from './edit-props'
import EditEvents from './edit-events'
import EditStyle from './edit-style'
import { IAppState } from './../../store'
import { isEmpty } from './../../utils'
import './index.scss'

const { TabPane } = Tabs;

/**
 * 自定义编辑组件的props以及events
 * @param props 
 */
const EditorCmp: FC<any> = (props) => {
  
  const selectedCmp = useSelector((state: IAppState) => {
    return state.selectedCmp
  })

  const renderedCmps = useSelector((state: IAppState) => {
    return state.renderedCmps
  })

  console.log(selectedCmp, renderedCmps)

  const [activeTabPane, setActiveTabPane] = useState<'props' | 'events'>('props')

  const handleTabChange = useCallback((e) => {
    setActiveTabPane(e)
  }, [])

  if (isEmpty(selectedCmp)) {
    return <div className="empty-wrapper">
      <Empty description="请选择组件" />
    </div>
  }

  return <div className="editor-cmp">
    {selectedCmp.key}
    <Tabs
      defaultActiveKey={activeTabPane}
      centered={true}
      onChange={handleTabChange}
    >
      <TabPane tab="属性" key="props">
        <EditProps cmp={selectedCmp} />
      </TabPane>
      <TabPane tab="事件" key="events">
        <EditEvents cmp={selectedCmp} />
      </TabPane>
      <TabPane tab="样式" key="style">
        <EditStyle cmp={selectedCmp} />
      </TabPane>
    </Tabs>
  </div>
}

export default EditorCmp
