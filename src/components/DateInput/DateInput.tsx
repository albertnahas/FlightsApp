import React from 'react';
import { Box, TextField } from '@material-ui/core';
import { CalendarTodayOutlined } from '@material-ui/icons';
import DatePopover from '../DatePopover/DatePopover';
import { formatDateForDisplay, getDaysLabel } from '../../util/util';

type Props = {
  type: string
  , value: any
  , setValue: (args: any) => void
  , departureDays: string
  , setDepartureDays: (args: string) => void
  , returnDays: string
  , setReturnDays: (args: string) => void
  , flightType: string
  , setFlightType: (args: string) => void
}
const DateInput = ({
  type,
  value,
  setValue,
  departureDays,
  setDepartureDays,
  returnDays,
  setReturnDays,
  flightType,
  setFlightType,
}: Props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getFormattedDate = () => {
    let displayValue = null;
    if (type === 'Departure' && value[0] != null) {
      displayValue = `${formatDateForDisplay(new Date(value[0] as string))} ${getDaysLabel(departureDays)}`;
    }
    if (type === 'Return') {
      if (value[1] != null) {
        displayValue = `${formatDateForDisplay(new Date(value[1] as string))} ${getDaysLabel(returnDays)}`;
      } else { displayValue = 'No Return'; }
    }
    return displayValue;
  };

  const open = Boolean(anchorEl);
  const id = open ? 'date-popover' : '';

  return (
    <div>
      <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
        <CalendarTodayOutlined sx={{ color: 'primary.main', mr: 1, my: 1 }} />
        <TextField
          aria-describedby={id}
          size="small"
          variant="outlined"
          label={type}
          value={getFormattedDate()}
          InputProps={{
            readOnly: true,
          }}
          autoFocus
          onClick={handleClick}
          fullWidth
        />
      </Box>
      <DatePopover
        id={id}
        open={open}
        anchorEl={anchorEl}
        handleClose={handleClose}
        value={value}
        setValue={setValue}
        departureDays={departureDays}
        setDepartureDays={setDepartureDays}
        returnDays={returnDays}
        setReturnDays={setReturnDays}
        flightType={flightType}
        setFlightType={setFlightType}
      />
    </div>
  );
};

export default DateInput;
