import React, { FC, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from 'antd';
import EditProps from './edit-props'
import EditEvents from './edit-events'
import { IAppState, actions } from './../../store'
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

  return <div className="editor-cmp">
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
    </Tabs>
  </div>
}

export default EditorCmp
