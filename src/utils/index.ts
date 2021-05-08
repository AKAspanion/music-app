export const setTheme = (light: boolean = false) => {
  const darkTheme: any = {
    '--padding': '24px',

    '--bg-color': '#191b2d',
    '--bg-color-accent': '#35395f',
    '--bg-color-accent-2': '#20233a',
    '--bg-color-secondary': '#4a5085',

    '--color-primary': 'rgba(255, 255, 255, 1)',
    '--color-secondary': 'rgba(255, 255, 255, 0.78)',
    '--color-disabled': 'rgba(255, 255, 255, 0.46)',
    '--color-dim': 'rgba(255, 255, 255, 0.06)',
  };
  const lightTheme: any = {
    '--padding': '24px',

    '--bg-color': '#edeef5',
    '--bg-color-accent': '#bbbed9',
    '--bg-color-accent-2': '#d4d6e7',
    '--bg-color-secondary': '#c7cae0',

    '--color-primary': 'rgba(0, 0, 0, 1)',
    '--color-secondary': 'rgba(0, 0, 0, 0.86)',
    '--color-disabled': 'rgba(0, 0, 0, 0.56)',
    '--color-dim': 'rgba(53, 57, 95, 0.06)',
  };

  const themeObject = light ? lightTheme : darkTheme;

  const root = document.querySelector(':root');
  const themeVariables = Object.keys(themeObject);

  if (root && themeObject) {
    themeVariables.forEach(themeVar => {
      const varValue = themeObject[themeVar];
      if (varValue && themeVar.startsWith('--')) {
        (root as any).style.setProperty(themeVar, String(varValue));
      }
    });
  }
};

export const songTitle = (song: any) => {
  let title = 'No title';
  if (song && song.name) {
    title = song.name;
  }

  return title.split('.')[0];
};

export const getTime = (time: number) => {
  return time ? new Date(time * 1000).toISOString().substr(14, 5) : '';
};
