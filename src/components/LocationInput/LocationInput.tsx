/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/core/Autocomplete';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import throttle from 'lodash/throttle';
import { FlightLandOutlined, FlightTakeoffOutlined, LocalAirport } from '@material-ui/icons';
import { Location } from '../../models/Location';
import { API_URL } from '../../constants';

type Props = {
  type: string
  , setAirport: (args: any) => void
}

type LocationsResult = {
  locations: Location[]
}

export default function LocationInput({ type, setAirport }: Props) {
  const [value, setValue] = React.useState<null | Location>(null);
  const [inputValue, setInputValue] = React.useState<string>('');
  const [options, setOptions] = React.useState<Location[]>([]);

  const fetchResults = React.useMemo(
    () => throttle((input: string, callback: (args: LocationsResult) => void) => {
      const matchRegExp = new RegExp(/\(([^)]+)\)/);
      const match = input.match(matchRegExp);
      const term = match ? match[1] : input;
      fetch(`${API_URL}locations?term=${term}&location_types=airport`)
        .then((response) => response.json())
        .then((data) => callback(data));
    }, 200),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      const defaultVal = value ? [value] : [];
      setOptions(defaultVal);
      return undefined;
    }

    fetchResults(inputValue, (results: LocationsResult) => {
      if (active) {
        let newOptions: Location[] = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results.locations];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetchResults]);

  return (
    <Autocomplete
      noOptionsText="Searching ..."
      size="small"
      getOptionLabel={(option) => (typeof option === 'string' ? option : `${option.city.name} (${option.code})`)}
      filterOptions={(x) => x}
      options={options}
      autoComplete
      includeInputInList
      filterSelectedOptions
      value={value}
      onChange={(event, newValue) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
        setAirport(newValue ? newValue.code : '');
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
          {type === 'From'
            ? <FlightTakeoffOutlined sx={{ color: 'action.active', mr: 1, my: 1 }} />
            : <FlightLandOutlined sx={{ color: 'action.active', mr: 1, my: 1 }} />}
          <TextField
            {...params}
            variant="outlined"
            label={type}
            fullWidth
          />
        </Box>
      )}
      renderOption={(props, option) => (
        <li {...props}>
          <Grid container alignItems="center">
            <Grid item>
              <Box
                component={LocalAirport}
                sx={{ color: 'text.secondary', mr: 2, fontSize: 16 }}
              />
            </Grid>
            <Grid item xs>
              <span style={{ fontSize: 14 }}>
                {option.code}
              </span>
              <Typography variant="body2" color="text.secondary">
                {option.name}
              </Typography>
            </Grid>
          </Grid>
        </li>
      )}
    />
  );
}
