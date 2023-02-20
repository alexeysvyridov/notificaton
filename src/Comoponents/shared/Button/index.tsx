import React from 'react'
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
type ButtonStyledProps = {
  onClick?: () => void;
  title?:string;
}
export const ButtonStyled = ({
  onClick,
  title,
}:ButtonStyledProps) => {
  return (
    <IconButton onClick={onClick}>x</IconButton>
  )
}

ButtonStyled.defaultProps = {
  title: '',
  disabled: false,
  variant: 'contained'
}