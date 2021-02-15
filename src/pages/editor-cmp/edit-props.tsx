import React, { FC, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import Fields from './fields'
import { actions } from './../../store'

interface IEditPropsProps {
  cmp: ICmpSchema
}

const EditProps: FC<IEditPropsProps> = ({ cmp }) => {

  const { props: currCmpProps } = cmp
  const dispatch = useDispatch()

  const handleCmpPropsChange = useCallback((
    cmpKey: string,
    propKey: string,
    propFieldKey: ICmpSchemaPropKeys,
    propFieldValue: string | boolean,
  ) => {
    dispatch(actions.updateCmpProps({ cmpKey, propKey, propFieldKey, propFieldValue }))
  }, [])

  return <div className="editor-cmp__props">
    {
      currCmpProps.map(cmpProp => {
        const Field = Fields[cmpProp.type]
        return <div key={cmpProp.key} className="editor-cmp__props-item">
          <div className="prop-label">
            {cmpProp.label}
          </div>
          <div className="prop-value">
            <Field
              {...cmpProp}
              updateProp={(key, value) => {
                handleCmpPropsChange(cmp.key || '', cmpProp.key, key, value)
              }}
            />
          </div>
        </div>
      })
    }
  </div>
}

export default EditProps
