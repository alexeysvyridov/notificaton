import styled from '@emotion/styled'
import { Box, Button, IconButton, Typography } from '@mui/material';

export const BoxStyled = styled(Box)<{backgroundColor?: string}>`
  color: #fff;
  background-color: ${props => props?.backgroundColor || 'transparent'};
  height: fit-content;
  display: flex;
  align-items: center;
 
`
export const Description = styled(Typography)<{color?:string,backgroundColor?: string}>`
  color: ${props => props?.color || '#fff'} ;
  background-color: ${props => props?.backgroundColor || 'transparent'};
`
type ButtonStyledProps = {
  onClick?: () => void;
  color?:string;
}
export const ButtonStyled = styled(IconButton)<ButtonStyledProps>`
  color: ${(props) => props.color || '#fff'};
`;

export const NotificationBox = styled.div<{show: boolean, zIndex?:number}>`
  display: ${(props) => props.show ? 'block' : 'none'};
  z-index: ${(props) => props.zIndex || 0};
  position: relative;
`;