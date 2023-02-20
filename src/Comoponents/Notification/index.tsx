
import { Palette, useTheme } from '@mui/material/styles';
import { palette } from '@mui/system';
import React, { useEffect, useId as getId, useState } from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorIcon from '@mui/icons-material/Error';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import InfoIcon from '@mui/icons-material/Info';
import './style.scss';
import { BoxStyled, Description, ButtonStyled, NotificationBox } from '../Styled';

type PositionTop = 'topCenter' |  'topRight' | 'topLeft';
type PositionBottom = 'bottomCenter' |  'bottomRight' | 'bottomLeft';
type PositionCenter = 'leftCenter' | 'center' | 'rightCenter';
type Severity = 'info' | 'success' | 'error' | 'warning';
type Variant = 'outlined' | 'filled';

type NotificationResult = {
  id?: string;
  message?: string;
  icon?: JSX.Element;
  backgroundColor?: string;
  title?: string;
  style?: {
    color: string;
    backgroundColor: string;
    borderColor?: string;
  }
}

const getSeveritiesCss = (variant:Severity, pelletOptions: Palette): string => {
  const Severities = {
    info: pelletOptions.info,
    success: pelletOptions.success,  
    error: pelletOptions.error,
    warning: pelletOptions.warning,
    // custom: null
  }
  return Severities[variant].main
};

type NotificationProps = {
  variant?: Variant;
  severity?: Severity
  autoClose?: boolean;
  title?: string;
  message: string;
  icon?: JSX.Element;
  className?: string;
  position?: PositionTop | PositionBottom | PositionCenter;
  wrapperClasses?: string;
  iconClassName?: string;
  isShowNotification:boolean;
  autoCloseDefaultMs?: number;
  onCloseNotification: () => void;
  isShow?:boolean;
  color?:string;
}

export const Notification = ({
  position,
  className,
  message,
  icon,
  wrapperClasses,
  severity = 'info',
  variant,
  iconClassName,
  title,
  isShowNotification,
  autoClose,
  autoCloseDefaultMs,
  onCloseNotification,
  color,
}: NotificationProps) => {
  const theme = useTheme();
 
  const setPosition  = {
    topLeft: { top: 0, left: 0, },
    topCenter: { top: 0, left: '50%', transform: 'translateX(-50%)' },
    topRight: { top: 0, right: 0 }, 
    bottomLeft: { bottom: 0, left: 0 },
    bottomCenter: { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
    bottomRight: { top: 0, right: 0 },
    leftCenter: { top: '50%', left: 0, transform: 'translateY(-50%)' },
    center: { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' },
    rightCenter: { right: 0, top: '50%', transform: 'translateY(-50%)' }
  }
  const positioning = setPosition[position || 'topLeft'];
  const getColorBySeverity = color || getSeveritiesCss(severity, theme.palette);

  const getVariant = variant === 'filled' ? 
  ({ color: '#fff',  backgroundColor: getColorBySeverity  }) : 
  ({color: getColorBySeverity, backgroundColor: 'transparent', borderColor: 'warning.main'});

  console.log('getVariant', getVariant);
  const getTypeByVariant = (): NotificationResult => {
    let notificationProps = {};
    switch(severity) {
      case 'success': {
        notificationProps = {
          id: getId(),
          title: title || 'success',
          icon: icon || <CheckCircleOutlineIcon fill="#fff" />,
          backgroundColor: getColorBySeverity,
          style: { ...getVariant },
        }
        break;
      }
      case 'error': {
        notificationProps = {
          id: getId(),
          title: title || 'error',
          message: message || 'Error notification',
          icon: icon || <ErrorIcon />,
          backgroundColor: getColorBySeverity,
          style: { ...getVariant },
        }
        break;
      }
      case 'warning': {
        notificationProps = {
          id: getId(),
          title: title || 'warning',
          message: message || 'Warning notification',
          icon: icon || <WarningAmberIcon />,
          backgroundColor: getColorBySeverity,
          style: { ...getVariant },
        }
        break;
      }
      case 'info': {
        notificationProps = {
          id: getId(),
          title: title || 'Info',
          message: message || 'Info notification',
          icon: icon || <InfoIcon />,
          backgroundColor: getColorBySeverity,
          style: { ...getVariant },
        }
        break;
      }
      default: 
        return {}
    }
    return notificationProps;
  }

  const notificationProps = getTypeByVariant();

  useEffect(() => {
    if(autoClose && isShowNotification) {
      const timeout = setTimeout(() => {
        onCloseNotification();
      }, autoCloseDefaultMs)
      return () => clearTimeout(timeout);
    }
  }, [autoClose, isShowNotification, autoCloseDefaultMs, onCloseNotification])

  return (
    <NotificationBox show={true}  zIndex={100}>
      <BoxStyled className={`${wrapperClasses || ''}`} key={notificationProps.id}>
        <BoxStyled 
          sx={{...notificationProps?.style, ...positioning, position: 'fixed', border: 1, borderColor: 'warning.main'}}
          className={`box-notification ${className}`}
         >
          {notificationProps?.icon && (
            <BoxStyled sx={{backgroundColor: notificationProps?.style?.backgroundColor}} className={iconClassName}>
              {notificationProps?.icon})
            </BoxStyled>
          )
        }
          <Description color={getVariant.color}>{notificationProps.message}</Description>
          <ButtonStyled onClick={onCloseNotification}>x</ButtonStyled>
        </BoxStyled>
      </BoxStyled>
    </NotificationBox>  
    // title
    // icon
    // auto close ?
  )
}


Notification.defaultProps = {
  variant: 'filled',
  severity: 'info',
  icon: null,
  title: '',
  color: '',
  position: 'topCenter',
  message: '',
  autoClose: true,
  className: '',
  autoCloseDefaultMs: 3000,
}
