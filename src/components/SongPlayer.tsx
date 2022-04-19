import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Slider, Typography } from '@mui/material';
import React, { FC } from 'react';
import QueuedSongList from './QueuedSongList';

const songDummyData = {
  title: 'grape soda',
  artist: 'Rook1e',
  thumbnail: 'https://i1.sndcdn.com/artworks-000420225600-nnpr1a-t500x500.jpg',
};

const SongPlayer: FC = () => {
  return (
    <div>
      <Card sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }} variant='outlined'>
        <Box sx={{ display: 'flex', flexDirection: 'column', padding: '0px 15px' }}>
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='h3' variant='h5'>
              {songDummyData.title}
            </Typography>
            <Typography variant='subtitle1' color='text.secondary' component='p'>
              {songDummyData.artist}
            </Typography>
          </CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1, pb: 1 }}>
            <IconButton aria-label='previous'>
              <SkipPrevious />
            </IconButton>
            <IconButton aria-label='play/pause'>
              <PlayArrow sx={{ height: 38, width: 38 }} />
            </IconButton>
            <IconButton aria-label='next'>
              <SkipNext />
            </IconButton>
            <Typography variant='subtitle1' color='text.secondary' component='p'>
              00:01:27
            </Typography>
          </Box>
          <Slider sx={{ m: '10px' }} size='small' min={0} max={1} step={0.01} aria-label='slider' />
        </Box>
        <CardMedia
          component='img'
          sx={{ objectFit: 'cover', width: '180px' }}
          image={songDummyData.thumbnail}
          alt='Live from space album cover'
        />
      </Card>
      <QueuedSongList />
    </div>
  );
};

export default SongPlayer;
