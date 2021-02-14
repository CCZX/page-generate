import { FC } from 'react'
import PageLayout from './../editor-layout'
import './index.scss'

const Preview: FC<any> = (props) => {
  return <div className="preview-layout">
    <PageLayout isPreview={true} />
  </div>
}

export default Preview
