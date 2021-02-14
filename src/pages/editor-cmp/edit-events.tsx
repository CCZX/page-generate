import { FC, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Collapse, Modal, message } from 'antd'
import CodeEditor from './../components/code-editor'
import { actions } from './../../store'

const { Panel } = Collapse

interface IEditEventProps {
  cmp: ICmpSchema
}

const EditEvents: FC<IEditEventProps> = ({ cmp }) => {
  const { events } = cmp

  const dispatch = useDispatch()
  const [currentEditEvent, setCurrentEditEvent] = useState<ICmpSchemaEvent>({} as ICmpSchemaEvent)
  const [isModalVisible, setModalVisible] = useState(false)

  const handleShowCodeModal = useCallback((event: ICmpSchemaEvent) => {
    setCurrentEditEvent(event)
    setModalVisible(true)
  }, [])

  const handleHiddenCodeModal = useCallback(() => {
    setCurrentEditEvent({} as ICmpSchemaEvent)
    setModalVisible(false)
  }, [])

  const handleEventCodeChange = useCallback((value: string) => {
    setCurrentEditEvent({
      ...currentEditEvent,
      value: value
    })
  }, [currentEditEvent])

  const handleSaveEvent = useCallback(() => {
    console.log('ok')
    dispatch(actions.updateCmpEvents({
      cmpKey: cmp.key || '',
      eventKey: currentEditEvent.key,
      value: currentEditEvent.value,
    }))
    setModalVisible(false)
    setCurrentEditEvent({} as ICmpSchemaEvent)
    message.success('保存成功~');
  }, [currentEditEvent])

  return <div className="editor-cmp__events">
    <Collapse defaultActiveKey={['1']}>
      {
        events.map(eventItem => {
          return <Panel header={eventItem.label} key={eventItem.key}>
            <button onClick={() => handleShowCodeModal(eventItem)}>添加</button>
          </Panel>
        })
      }
    </Collapse>
    <Modal
      visible={isModalVisible}
      centered={true}
      width={1000}
      cancelText={'取消'}
      okText={'保存'}
      title={'添加' + currentEditEvent.label}
      onCancel={handleHiddenCodeModal}
      onOk={handleSaveEvent}
    >
      <CodeEditor
        value={currentEditEvent.value}
        onChange={handleEventCodeChange}
      />
    </Modal>
  </div>
}

export default EditEvents
