import { Delete } from '@mui/icons-material';
import { Avatar, Box, IconButton, Theme, Typography, useMediaQuery } from '@mui/material';
import React, { FC } from 'react';
import { ISongCardProps } from './SongList';

const songDummyData = {
  title: 'grape soda',
  artist: 'Rook1e',
  thumbnail: 'https://i1.sndcdn.com/artworks-000420225600-nnpr1a-t500x500.jpg',
};

const QueudSong: FC<ISongCardProps> = ({ song }) => {
  const { title, artist, thumbnail } = song;

  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gap: '12px',
        alignItems: 'center',
        mt: '10px',
      }}>
      <Avatar sx={{ width: '44px', height: '44px' }} src={thumbnail} alt='Song thumbnail' />
      <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} variant='subtitle2'>
          {title}
        </Typography>
        <Typography sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }} variant='body2' color='textSecondary'>
          {artist}
        </Typography>
      </Box>
      <IconButton>
        <Delete color='error'></Delete>
      </IconButton>
    </Box>
  );
};

const QueuedSongList: FC = () => {
  const greaterThanMd = useMediaQuery<Theme>((theme) => theme.breakpoints.up('md'));

  return greaterThanMd ? (
    <Box sx={{ m: '10px 0' }}>
      <Typography color='textSecondary' variant='button'>
        QUEUE (5)
      </Typography>
      {Array.from({ length: 5 }, () => songDummyData).map((s, i) => (
        <QueudSong key={i} song={s} />
      ))}
    </Box>
  ) : null;
};

export default QueuedSongList;
