import React from 'react';
import { Grid, Hidden, Theme } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from './components/Header';
import AddSong from './components/AddSong';
import SongList from './components/SongList';
import SongPlayer from './components/SongPlayer';

function App() {
  // const greaterThanSm = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
  const greaterThanMd = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Hidden only='xs'>
          <Header />
        </Hidden>
        {/* {greaterThanSm && <Header />} */}
      </Grid>
      <Grid item xs={12} md={7}>
        <AddSong />
        <SongList />
      </Grid>
      <Grid
        item
        xs={12}
        md={5}
        sx={
          greaterThanMd
            ? { position: 'fixed', width: '100%', top: '64px', right: '0', pr: '20px' }
            : { position: 'fixed', width: '100%', bottom: '0', left: '0', pr: '20px' }
        }>
        <SongPlayer />
      </Grid>
    </Grid>
  );
}

export default App;
