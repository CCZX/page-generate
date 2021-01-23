import React, { FC, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Empty } from 'antd'
import { getField } from './fields'
import { IAppState, actions } from './../../store'
import { isEmpty } from './../../utils'

interface IEditPropsProps {
  cmp: ICmpSchema
}

const EditProps: FC<IEditPropsProps> = ({ cmp }) => {

  const { props: currCmpProps } = cmp
  const dispatch = useDispatch()

  const handleCmpPropsChange = useCallback((cmpKey: string, propKey: string, propValue: string) => {
    dispatch(actions.updateCmp({ cmpKey, propKey, propValue }))
  }, [])

  if (isEmpty(currCmpProps)) {
    return <Empty description="请选择组件" />
  }

  return <div className="editor-cmp__props">
    {
      currCmpProps.map(cmpProp => {
        const Field = getField(cmpProp.type)
        return <div key={cmpProp.key} className="editor-cmp__props-item">
          <div className="prop-label">
            {cmpProp.label}
          </div>
          <div className="prop-value">
            <Field
              value={cmpProp.defaultValue}
              options={cmpProp.dataSource || []}
              onChange={(e: any) => {
                // 兼容antd的返回值
                const value = cmpProp.type === 'Select' ? e : e.target?.value
                handleCmpPropsChange(cmp.key || '', cmpProp.key, value)
              }}
            />
          </div>
        </div>
      })
    }
  </div>
}

export default EditProps
