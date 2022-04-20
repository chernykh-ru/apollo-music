import { PlayArrow, Save } from '@mui/icons-material';
import { Card, CardActions, CardContent, CardMedia, CircularProgress, IconButton, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { FC, useState } from 'react';

export interface ISong {
  title: string;
  artist: string;
  thumbnail: string;
}

export interface ISongCardProps {
  song: ISong;
}

const songDummyData = {
  title: 'grape soda',
  artist: 'Rook1e',
  thumbnail: 'https://i1.sndcdn.com/artworks-000420225600-nnpr1a-t500x500.jpg',
};

const SongCard: FC<ISongCardProps> = ({ song }) => {
  const { title, artist, thumbnail } = song;

  return (
    <Card
      sx={(theme) => ({
        margin: theme.spacing(3),
      })}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          sx={{ objectFit: 'cover', width: '140px' }}
          image={thumbnail}
          component='img'
          alt='Live from space album cover'
        />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {title}
            </Typography>
            <Typography variant='body1' component='p' color='textSecondary'>
              {artist}
            </Typography>
          </CardContent>
          <CardActions>
            <IconButton size='small' color='primary'>
              <PlayArrow aria-label='play/pause' />
            </IconButton>
            <IconButton size='small' color='secondary'>
              <Save aria-label='save' />
            </IconButton>
          </CardActions>
        </Box>
      </Box>
    </Card>
  );
};

const SongList: FC = () => {
  const [songCards, setSongCards] = useState<ISong[]>(new Array(7).fill(songDummyData));
  const [loading, setLoading] = useState<boolean>(false);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {songCards.map((song, i) => (
        <SongCard key={i} song={song} />
      ))}
    </Box>
  );
};

export default SongList;
