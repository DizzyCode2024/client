export const palette = {
  neutral100_gray: '#FFFFFF',
  neutral200_gray: '#F2F2F2',
  neutral300_gray: '#EDEEF0',
  neutral400_gray: '#D9DADE',
  neutral500_gray: '#CCCCCF',
  neutral600_gray: '#949496',
  neutral700_gray: '#191919',

  neutral100_dark: '#FFFFFF',
  neutral200_dark: '#898989',
  neutral300_dark: '#898989',
  neutral400_dark: '#4E4E4E',
  neutral500_dark: '#000000',
  neutral600_dark: '#292929',
  neutral700_dark: '#212121',

  red: '#D0191C',
  alert_red: 'rgba(208, 25, 28, 0.60);',
  blue: '#0038FF',
  google: '#4285F4',
} as const;

export const theme = {
  name: 'main',
  palette,
};
