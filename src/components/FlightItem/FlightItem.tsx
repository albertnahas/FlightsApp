/* eslint-disable max-len */
import React from 'react';
import {
  Button, Container, Divider, Grid, ListItem,
} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import styles from './FlightItem.module.css';
import FlightDetails from '../FlightDetails/FlightDetails';
import { Flight } from '../../models/Flight';

type Props = {
  item: Flight,
  setSelectedFlight: (args: boolean) => void,
}
const FlightItem = ({ item, setSelectedFlight }: Props) => {
  const [showDetails, setShowDetails] = React.useState(false);
  const desktop = useMediaQuery('(min-width:960px)');
  const hasDetails = item.route && item.route.length > 1;
  return (
    <ListItem className={styles['flight-item']}>
      <Container component="main" fixed>
        <Grid container spacing={10}>
          <Grid item xs={12} md={7}>
            <FlightDetails item={item} />
            {showDetails && hasDetails && <Divider style={{ marginTop: 20, marginBottom: 20 }} />}
            {showDetails && hasDetails && item.route?.map((route: Flight) => <FlightDetails key={route.id} item={route} />)}
            {hasDetails && (
            <Button
              onClick={() => { setShowDetails(!showDetails); }}
              variant="text"
              fullWidth
              color="primary"
              component="span"
            >
              {!showDetails ? 'Show' : 'Hide'}
              {' '}
              Details
              {' '}
            </Button>
            )}

          </Grid>
          <Grid className={!desktop ? styles['divider-h'] : ''} item xs={12} md={1}>
            <Divider orientation={desktop ? 'vertical' : 'horizontal'} />
          </Grid>
          <Grid className={styles['details-container']} item xs={12} md={2}>
            <div className={styles.price}>
              {item.price}
              €
            </div>
          </Grid>
          <Grid className={styles['details-container']} item xs={12} md={2}>
            <Button onClick={() => { setSelectedFlight(true); }} variant="outlined" fullWidth component="span">
              Select
              {' '}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </ListItem>
  );
};

export default FlightItem;
