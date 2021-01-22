import React, { FC, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from 'antd';
import EditProps from './edit-props'
import { IAppState, actions } from './../../store'

const { TabPane } = Tabs;

const SettingProps: FC<any> = (props) => {
  
  const selectedCmp = useSelector((state: IAppState) => {
    return state.selectedCmp
  })

  const [activeTabPane, setActiveTabPane] = useState<'props' | 'events'>('props')

  const handleTabChange = useCallback((e) => {
    setActiveTabPane(e)
  }, [])

  return <div>
    <Tabs
      defaultActiveKey={activeTabPane}
      centered={true}
      onChange={handleTabChange}
    >
      <TabPane tab="属性" key="props">
        <EditProps cmp={selectedCmp} />
      </TabPane>
      <TabPane tab="事件" key="events">
        Content of Tab Pane 2
      </TabPane>
    </Tabs>
  </div>
}

export default SettingProps
