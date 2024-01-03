import { Popover } from '@mui/material'
import PopupState, { bindPopover, bindTrigger } from 'material-ui-popup-state'
import React from 'react'

interface Props {
  children: React.ReactNode
  renderPopover: (onClose: () => void) => React.ReactNode
}

const PopoverCustom = ({ children, renderPopover }: Props) => {
  return (
    <PopupState variant='popover' popupId='filter_event'>
      {(popupState) => (
        <div>
          <div {...bindTrigger(popupState)}>{children}</div>
          <Popover
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center'
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            style={{
              top: '8px'
            }}
            {...bindPopover(popupState)}
          >
            {renderPopover(() => popupState.close())}
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default PopoverCustom
