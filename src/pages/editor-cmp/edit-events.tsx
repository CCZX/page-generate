import React, { FC, useCallback, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Tabs } from 'antd';
import { getField } from './fields'
import { IAppState, actions } from './../../store'
import { ICmpSchema } from './../../cmps/type'

interface IEditEventProps {
  cmp: ICmpSchema
}

const EditEvents: FC<IEditEventProps> = ({ cmp }) => {

  const { props: cmpProps } = cmp

  return <div className="editor-cmp__events">
    {
      cmpProps.map(prop => {
        const Field = getField(prop.type)
        return <div>
          <Field />
        </div>
      })
    }
  </div>
}

export default EditEvents
