import { getRangeFromDays } from './util';

describe('Utils', () => {
  const testDate = new Date(1625947200000);
  it('should return the correct range for minusone', () => {
    const range = getRangeFromDays(testDate, 'minusone');
    expect(range.from).toEqual('10/07/2021');
    expect(range.to).toEqual('11/07/2021');
  });
  it('should return the correct range for plusone', () => {
    const range = getRangeFromDays(testDate, 'plusone');
    expect(range.from).toEqual('11/07/2021');
    expect(range.to).toEqual('12/07/2021');
  });
  it('should return the correct range for plusminusone', () => {
    const range = getRangeFromDays(testDate, 'plusminusone');
    expect(range.from).toEqual('10/07/2021');
    expect(range.to).toEqual('12/07/2021');
  });
  it('should return the correct range for plusminustwo', () => {
    const range = getRangeFromDays(testDate, 'plusminustwo');
    expect(range.from).toEqual('09/07/2021');
    expect(range.to).toEqual('13/07/2021');
  });
  it('should return the correct range for plusminusthree', () => {
    const range = getRangeFromDays(testDate, 'plusminusthree');
    expect(range.from).toEqual('08/07/2021');
    expect(range.to).toEqual('14/07/2021');
  });
});
