import { convertUTC } from '@/lib/utils/convertUTC';

describe('convertUTC', () => {
  it('should correctly format a UTC string to "MM/DD/YYYY, HH:MM AM/PM"', () => {
    const utcString = '2023-08-22T14:30:00Z';
    const result = convertUTC(utcString);
    expect(result).toBe('08/22/2023, 11:30 PM');
  });

  it('should correctly format an array of date components to "MM/DD/YYYY, HH:MM AM/PM"', () => {
    const utcArray = [2023, 8, 22, 14, 30];
    const result = convertUTC(utcArray);
    expect(result).toBe('08/22/2023, 2:30 PM');
  });

  it('should handle midnight hour correctly for string input', () => {
    const utcString = '2023-08-22T00:30:00Z';
    const result = convertUTC(utcString);
    expect(result).toBe('08/22/2023, 9:30 AM');
  });

  it('should handle midnight hour correctly for array input', () => {
    const utcArray = [2023, 8, 22, 0, 30];
    const result = convertUTC(utcArray);
    expect(result).toBe('08/22/2023, 12:30 AM');
  });

  it('should correctly format a UTC string with AM time', () => {
    const utcString = '2023-08-22T08:30:00Z';
    const result = convertUTC(utcString);
    expect(result).toBe('08/22/2023, 5:30 PM');
  });

  it('should correctly format an array with AM time', () => {
    const utcArray = [2023, 8, 22, 8, 30];
    const result = convertUTC(utcArray);
    expect(result).toBe('08/22/2023, 8:30 AM');
  });

  it('should handle single digit minutes correctly', () => {
    const utcArray = [2023, 8, 22, 14, 5];
    const result = convertUTC(utcArray);
    expect(result).toBe('08/22/2023, 2:05 PM');
  });
});
