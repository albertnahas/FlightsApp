import Moment from 'moment';

export interface DateRange {
  from: string,
  to: string
}
/**
 * [Formats date to DD/MM/YYYY]
 * @param  {[Date]} arg1 [Date]
 * @return {[String]}      [Formatted date in DD/MM/YYYY format]
 */
export function formatDateForAPI(date: any): string {
  return Moment(date).format('DD/MM/YYYY');
}
/**
 * [Convert ranges into dates]
 * @param  {[Date]} arg1 [Date]
 * @param  {[Number]} arg1 [Date]
 * @return {[String]}      [Number of days]
 */
export function getRangeFromDays(date: any, days: string): DateRange {
  let fromDate = date;
  let toDate = date;

  if (days === 'minusone') {
    fromDate = Moment(date).add(-1, 'd');
  } else if (days === 'plusone') {
    toDate = Moment(date).add(1, 'd');
  } else if (days === 'plusminusone') {
    fromDate = Moment(date).add(-1, 'd');
    toDate = Moment(date).add(1, 'd');
  } else if (days === 'plusminustwo') {
    fromDate = Moment(date).add(-2, 'd');
    toDate = Moment(date).add(2, 'd');
  } else if (days === 'plusminusthree') {
    fromDate = Moment(date).add(-3, 'd');
    toDate = Moment(date).add(3, 'd');
  }

  return {
    from: formatDateForAPI(fromDate),
    to: formatDateForAPI(toDate),
  };
}

/**
 * [Get the proper label for days range]
 * @param  {[String]} arg1 [Days range]
 * @return {[String]}      [Label]
 */
export function getDaysLabel(days: string): string {
  let label = '';

  if (days === 'minusone') {
    label = '+ day before';
  } else if (days === 'plusone') {
    label = '+ day after';
  } else if (days === 'plusminusone') {
    label = '± 1 day';
  } else if (days === 'plusminustwo') {
    label = '± 2 day';
  } else if (days === 'plusminusthree') {
    label = '± 3 day';
  }

  return label;
}

/**
 * [Get the duration between two dates in hours and minutes]
 * @param  {[Date]} arg1 [First date]
 * @param  {[Date]} arg2 [Second Date]
 * @return {[String]}      [Duration in hours and minutes (ex: 1h 1m)]
 */
export function getReadableDuration(date1: any, date2: any): string {
  const moment1 = Moment(new Date(date1 * 1000));
  const moment2 = Moment(new Date(date2 * 1000));
  const hours = Math.abs(moment2.diff(moment1, 'h'));
  const minutes = Math.abs(moment2.diff(moment1, 'minutes')) - (hours * 60);
  return `${hours}h ${minutes}m`;
}

/**
 * [Formats date to ddd D MMM]
 * @param  {[Date]} arg1 [Date]
 * @return {[String]}      [Formatted date in ddd D MMM format]
 */
export function formatDateForDisplay(date: any): string {
  return Moment(date).format('ddd D MMM');
}

/**
 * [Formats time to HH:mm]
 * @param  {[Date]} arg1 [Date]
 * @return {[String]}      [Formatted time in HH:mm format]
 */
export function formatTime(date: any): string {
  return Moment(date).utc(false).format('HH:mm');
}
