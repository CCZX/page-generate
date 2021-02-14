import React, { FC } from 'react'
import { Button as AButton } from 'antd'
import { ButtonProps } from 'antd/lib/button'

interface IButtonProps extends ButtonProps {
  content: React.ReactNode
}

const Button: FC<IButtonProps> = ({ content, ...rest }) => {
  return <AButton {...rest}>{content}</AButton>
}

export default Button
