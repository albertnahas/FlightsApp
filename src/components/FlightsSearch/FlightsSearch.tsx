import React from 'react';
import {
  Alert, Box, Button, Container, Grid, LinearProgress, List, Snackbar, Typography,
} from '@material-ui/core';
import Moment from 'moment';
import styles from './FlightsSearch.module.css';
import LocationInput from '../LocationInput/LocationInput';
import DateInput from '../DateInput/DateInput';
import { getRangeFromDays } from '../../util/util';

import FlightItem from '../FlightItem/FlightItem';
import { Flight } from '../../models/Flight';
import { API_URL } from '../../constants';

const FlightsSearch = () => {
  const [dateRange, setDateRange] = React.useState([
    new Date(),
    Moment(new Date()).add(1, 'M'),
  ]);

  const [departureDays, setDepartureDays] = React.useState('exact');
  const [returnDays, setReturnDays] = React.useState('exact');
  const [fromAirport, setFromAirport] = React.useState('');
  const [toAirport, setToAirport] = React.useState('');
  const [results, setResults] = React.useState<Flight[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [searchMode, setSearchMode] = React.useState(false);
  const [errorMsg, setErrMsg] = React.useState('');
  const [itemsToShow, setItemsToShow] = React.useState(10);
  const [selectedFlight, setSelectedFlight] = React.useState(false);
  const [flightType, setFlightType] = React.useState('round-trip');

  const searchFlights = () => {
    setSearchMode(true);
    setLoading(true);
    setErrMsg('');

    const date = dateRange[0];
    const returnDate = dateRange[1] ? dateRange[1] : date;
    const departureRange = getRangeFromDays(date, departureDays);
    const returnRange = getRangeFromDays(returnDate, returnDays);
    const dateFrom = encodeURIComponent(departureRange.from);
    const dateTo = encodeURIComponent(departureRange.to);
    const returnFrom = encodeURIComponent(returnRange.from);
    const returnTo = encodeURIComponent(returnRange.to);
    const type = flightType === 'round-trip' ? 'return' : 'oneway';
    const searchQuery = `${API_URL}flights?v=3&partner=skypicker&locale=en&flyFrom=${fromAirport}&to=${toAirport}&dateFrom=${dateFrom}&dateTo=${dateTo}&typeFlight=${type}&returnFrom=${returnFrom}&returnTo=${returnTo}`;

    fetch(searchQuery)
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setResults([]);
          setErrMsg(data.error);
        } else {
          if (data.data.length === 0) {
            setErrMsg('No results, please try again with different input');
          }
          setItemsToShow(10);
          setResults(data.data);
        }
        setLoading(false);
      }).catch((err) => {
        setErrMsg(err.error);
        setLoading(false);
      });
  };

  // eslint-disable-next-line max-len
  const displayResults = () => results.slice(0, itemsToShow).map((item) => <FlightItem setSelectedFlight={setSelectedFlight} key={item.id} item={item} />);

  const loadMore = () => {
    setItemsToShow(itemsToShow + 10);
  };

  const handleSnackbarClose = () => {
    setSelectedFlight(false);
  };

  return (
    <>
      <Container className={!searchMode ? styles['search-container'] : styles['search-container-active']} style={{ paddingTop: '3em' }} fixed>
        {!searchMode
          && (
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Plan tomorrow’s adventure today
            </Typography>
          )}

        <Box className={!searchMode ? styles['search-panel'] : styles['search-panel-active']}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <LocationInput setAirport={setFromAirport} type="From" />
            </Grid>
            <Grid item xs={12} md={3}>
              <LocationInput setAirport={setToAirport} type="To" />
            </Grid>
            <Grid item xs={12} md={2}>
              <DateInput
                value={dateRange}
                setValue={setDateRange}
                departureDays={departureDays}
                setDepartureDays={setDepartureDays}
                returnDays={returnDays}
                setReturnDays={setReturnDays}
                flightType={flightType}
                setFlightType={setFlightType}
                type="Departure"
              />
            </Grid>
            <Grid item xs={12} md={2}>
              <DateInput
                value={dateRange}
                setValue={setDateRange}
                departureDays={departureDays}
                setDepartureDays={setDepartureDays}
                returnDays={returnDays}
                setReturnDays={setReturnDays}
                flightType={flightType}
                setFlightType={setFlightType}
                type="Return"
              />
            </Grid>
            <Grid item xs={12} md={1}>
              <Button
                id="searchBtn"
                onClick={searchFlights}
                disabled={loading}
                variant="contained"
                fullWidth
                component="span"
              >
                Search
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {loading && <LinearProgress variant="indeterminate" />}
      {searchMode && (results || errorMsg)
        && (
          <Box className={styles['results-panel']}>
            <Container component="main" fixed>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {errorMsg
                    && <Alert severity="error">{errorMsg}</Alert>}
                  {results && results.length > 0
                    && (
                      <>
                        <List>
                          {displayResults()}
                        </List>
                        {itemsToShow < results.length
                          && (
                            <Button
                              onClick={loadMore}
                              disabled={loading}
                              variant="contained"
                              fullWidth
                            >
                              Load More
                              {' '}
                            </Button>
                          )}
                      </>
                    )}
                </Grid>
              </Grid>
            </Container>
          </Box>
        )}

      <Snackbar open={selectedFlight} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success">
          Your flight has been selected!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FlightsSearch;
