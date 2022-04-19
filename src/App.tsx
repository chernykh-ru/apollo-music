import React from 'react';
import { Grid } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { customTheme } from './theme';
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5}>
          <SongPlayer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
