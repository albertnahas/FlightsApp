import React from 'react';
import { Box } from '@material-ui/core';
import styles from './FlightDetails.module.css';
import { formatDateForDisplay, formatTime, getReadableDuration } from '../../util/util';
import { Flight } from '../../models/Flight';

type Props = {
  item: Flight
}
const FlightDetails = ({ item }: Props) => {
  const departureTime = new Date(item.dTime * 1000);
  const arrivalTime = new Date(item.aTime * 1000);
  const formattedDepartureDate = formatDateForDisplay(departureTime);
  const formattedArrivalDate = formatDateForDisplay(arrivalTime);

  const displayAirlines = () => {
    const airlines: string[] | undefined = item.airline ? [item.airline] : item.airlines;
    return airlines?.map((airline: string) => <img key={airline} alt={airline} title={airline} className={styles.airline} width="24" src={`//images.kiwi.com/airlines/32/${airline}.png?default=airline.png`} />);
  };

  return (
    <Box>
      <Box style={{ color: 'text.primary', marginBottom: '8px' }}>
        {formattedDepartureDate}
      </Box>
      <div className={styles['flight-detail']}>
        {formatTime(departureTime)}
        {' '}
        {item.cityFrom}
        {' '}
        <span>{item.cityCodeFrom}</span>
      </div>
      <div>
        <span style={{ color: '#666', marginLeft: '1em' }}>
          {item.fly_duration || getReadableDuration(item.aTimeUTC, item.dTimeUTC)}
        </span>
        {displayAirlines()}
      </div>
      <div className={styles['flight-detail']}>
        {formatTime(arrivalTime)}
        {' '}
        {item.cityTo}
        {' '}
        <span>{item.cityCodeTo}</span>
      </div>
      <Box style={{ marginTop: '8px' }}>
        {formattedArrivalDate !== formattedDepartureDate && formattedArrivalDate}
      </Box>
    </Box>
  );
};

export default FlightDetails;
