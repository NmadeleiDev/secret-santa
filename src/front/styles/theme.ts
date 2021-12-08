const light = {
  colors: {
    white: '#FFFFFF',
    black: '#000000',
    primary: {
      light: '#FCD9DD',
      main: '#EF233C',
      dark: '#980B1C',
    },
    secondary: {
      light: '#CBE1D1',
      main: '#5DA271',
      dark: '#345B3F',
    },
    text: {
      dark: '#2B2D42',
      gray: '#8D99AE',
    },
    base: {
      BG: '#FFFFFF',
      darkerBG: '#EDF2F4',
      line: '#8D99AE',
      shadow: '#B3C9D1',
      warmBG: '#f2e8cf',
    },
    accent: {
      green: '#50D1AA',
      red: '#FF7CA3',
      orange: '#F6AE2D',
      blue: '#65B0F6',
      purple: '#9290FE',
    },
  },
  shape: {
    borderRadius: 30,
    spacing: 4,
    scalc: (value: number, spacing: number = 4) => value * spacing,
  },
};

export type Theme = typeof light;
export type AccentType = keyof typeof light.colors.accent;
const theme: Theme = light;
export default theme;
