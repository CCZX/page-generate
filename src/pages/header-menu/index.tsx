import { FC, useCallback, useState } from 'react'
import { Tooltip, Modal } from 'antd'
import PreviewLayout from './../preview'
import logo from './../../assets/logo.png'
import './index.scss'

const HeaderMenu: FC<any> = (props) => {

  const [previewModalVisible, setPreviewModalVisible] = useState(false)

  const handleShowPreviewLayout = useCallback(() => {
    setPreviewModalVisible(true)
  }, [])

  const handleHiddenPreviewLayout = useCallback(() => {
    setPreviewModalVisible(false)
  }, [])

  return <div className="header-menu">
    <div className="header-menu__logo">
      <img src={logo} height="100%" alt=""/>
      <span className="title">Page Generate</span>
    </div>
    <Tooltip placement="bottom" title="点击预览布局">
      <div className="preview" onClick={handleShowPreviewLayout}></div>
    </Tooltip>

    <Modal
      centered={true}
      destroyOnClose={true}
      visible={previewModalVisible}
      title={'预览布局'}
      width={'95%'}
      footer={null}
      onCancel={handleHiddenPreviewLayout}
    >
      <PreviewLayout />
    </Modal>
  </div>
}

export default HeaderMenu
