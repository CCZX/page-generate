import React, { FC, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Fields from './fields'
import { actions } from './../../store'

interface IEditPropsProps {
  cmp: ICmpSchema
}

const EditProps: FC<IEditPropsProps> = ({ cmp }) => {

  const { props: currCmpProps } = cmp
  const dispatch = useDispatch()

  const handleCmpPropsChange = useCallback((cmpKey: string, propKey: string, propValue: string | boolean) => {
    dispatch(actions.updateCmp({ cmpKey, propKey, propValue }))
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
              updateProp={(value) => {
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
