import React, { FC, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getField } from './fields'
import { IAppState, actions } from './../../store'
import { ICmpSchema } from './../../cmps/type'

interface IEditPropsProps {
  cmp: ICmpSchema
}

const EditProps: FC<IEditPropsProps> = ({ cmp }) => {

  const { props: cmpProps } = cmp

  return <div className="editor-cmp__props">
    {
      cmpProps.map(prop => {
        const Field = getField(prop.type)
        return <div className="">
          <Field />
        </div>
      })
    }
  </div>
}

export default EditProps
