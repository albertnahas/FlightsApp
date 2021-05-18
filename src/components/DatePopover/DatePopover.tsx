/* eslint-disable no-unused-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Box, FormControl, FormControlLabel, Grid, InputLabel, MenuItem,
  Popover, Radio, RadioGroup, Select, TextField,
} from '@material-ui/core';
import StaticDateRangePicker from '@material-ui/lab/StaticDateRangePicker';
import AdapterDateFns from '@material-ui/lab/AdapterDateFns';
import LocalizationProvider from '@material-ui/lab/LocalizationProvider';
import { StaticDatePicker } from '@material-ui/lab';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { RangeInput } from '@material-ui/lab/DateRangePicker/RangeTypes';
import styles from './DatePopover.module.css';

type Props = {
  id: string
  , open: boolean
  , handleClose: () => void
  , anchorEl: any
  , value: RangeInput<[]>
  , setValue: (args: any) => void
  , departureDays: string
  , setDepartureDays: (args: string) => void
  , returnDays: string
  , setReturnDays: (args: string) => void
  , flightType: string
  , setFlightType: (args: string) => void
}

const DatePopover = ({
  id,
  open,
  handleClose,
  anchorEl,
  value,
  setValue,
  departureDays,
  setDepartureDays,
  returnDays,
  setReturnDays,
  flightType,
  setFlightType,
}: Props) => {
  const fromDateValue = value && value.length ? value[0] : new Date();
  const [fromDate, setFromDate] = React.useState<any>(fromDateValue);

  const desktop = useMediaQuery('(min-width:960px)');
  const wrapperWidth = desktop ? '600px' : 'auto';

  const handleTypeChange = (event: any) => {
    setFlightType(event.target.value);
  };

  const handleReturnChange = (event: any) => {
    setReturnDays(event.target.value);
  };

  const handleDepartureChange = (event: any) => {
    setDepartureDays(event.target.value);
  };

  return (
    <div>
      <Popover
        id={id}
        open={open || false}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Grid style={{ margin: '5px', minWidth: wrapperWidth }} container spacing={2}>
          <Grid item xs={12} md={5}>
            <FormControl component="fieldset">
              <RadioGroup value={flightType} onChange={handleTypeChange} row aria-label="type" name="row-radio-buttons-group">
                <FormControlLabel value="round-trip" control={<Radio color="primary" size="small" />} label="Round Trip" />
                <FormControlLabel value="one-way" control={<Radio color="primary" size="small" />} label="One Way" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={5} md={flightType === 'round-trip' ? 3 : 6}>
            <FormControl fullWidth>
              <InputLabel>Departure</InputLabel>
              <Select
                size="small"
                label="Departure"
                onChange={handleDepartureChange}
                value={departureDays}
              >
                <MenuItem value="exact">Exact</MenuItem>
                <MenuItem value="minusone">+ day before</MenuItem>
                <MenuItem value="plusone">+ day after</MenuItem>
                <MenuItem value="plusminusone">± 1 day</MenuItem>
                <MenuItem value="plusminustwo">± 2 days</MenuItem>
                <MenuItem value="plusminusthree">± 3 days</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {flightType === 'round-trip'
            && (
              <Grid item xs={5} md={3}>
                <FormControl fullWidth>
                  <InputLabel>Return</InputLabel>
                  <Select
                    size="small"
                    label="Return"
                    onChange={handleReturnChange}
                    value={returnDays}
                  >
                    <MenuItem value="exact">Exact</MenuItem>
                    <MenuItem value="minusone">+ day before</MenuItem>
                    <MenuItem value="plusone">+ day after</MenuItem>
                    <MenuItem value="plusminusone">± 1 day</MenuItem>
                    <MenuItem value="plusminustwo">± 2 days</MenuItem>
                    <MenuItem value="plusminusthree">± 3 days</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
        </Grid>
        {flightType === 'round-trip'
          && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDateRangePicker
                displayStaticWrapperAs={!desktop ? 'mobile' : 'desktop'}
                value={value}
                minDate={[new Date()]}
                onChange={(newValue) => {
                  setValue(newValue);
                  newValue[0] && setFromDate(newValue[0][0]);
                }}
                renderInput={(startProps, endProps) => (
                  <>
                    <TextField {...startProps} variant="standard" />
                    <Box sx={{ mx: 2 }}> to </Box>
                    <TextField {...endProps} variant="standard" />
                  </>
                )}
              />
            </LocalizationProvider>
          )}
        {flightType === 'one-way'
          && (
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs={!desktop ? 'mobile' : 'desktop'}
                value={fromDate}
                allowSameDateSelection
                minDate={new Date()}
                onChange={(newValue) => {
                  setFromDate(newValue);
                  setValue([newValue, null]);
                }}
                renderInput={(params) => <TextField {...params} variant="standard" />}
              />
            </LocalizationProvider>
          )}
      </Popover>
    </div>
  );
};

export default DatePopover;
