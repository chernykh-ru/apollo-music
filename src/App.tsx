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
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Header />
        </Grid>
        <Grid item xs={12} md={7}>
          <AddSong />
          <SongList />
        </Grid>
        <Grid item xs={12} md={5} sx={{ position: 'fixed', width: '100%', top: '64px', right: '0', pr: '20px' }}>
          <SongPlayer />
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default App;
