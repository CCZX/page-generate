import React, { FC } from 'react'
import { List as AList } from 'antd'
import { ListProps } from 'antd/lib/list'

interface IListProps extends ListProps<any> {

}

const List: FC<IListProps> = (props) => {
  const { dataSource } = props
  // const parseDataSource = eval(String(dataSource))
  return <AList {...props} renderItem={(item, index) => {
    return <div>{index}---ok</div>
  }} />
}

export default List

