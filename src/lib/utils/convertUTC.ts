export const convertUTC = (utc: string | number[]) => {
  let date;

  if (typeof utc === 'string') {
    date = new Date(utc);
  } else {
    const [year, month, day, hours, minutes] = utc;
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // 12시간 형식으로 변환
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedDate = `${String(month).padStart(2, '0')}/${String(day).padStart(2, '0')}/${year}, ${formattedHours}:${formattedMinutes} ${ampm}`;
    return formattedDate;
  }

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  };

  return date.toLocaleString('en-US', options);
};
