import { useSubscription } from '@apollo/client'
import { PlayArrow, Save } from '@mui/icons-material'
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material'
import { Box } from '@mui/system'
import React, { FC } from 'react'
import { ISong, ISongData } from '../types'
import { GET_SONGS } from '../graphql/subscriptions'

export interface ISongCardProps {
  song: ISong
}

const SongCard: FC<ISongCardProps> = ({ song }) => {
  const { title, artist, thumbnail } = song

  return (
    <Card
      sx={(theme) => ({
        margin: theme.spacing(3),
      })}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <CardMedia
          sx={{ objectFit: 'cover', width: '140px', height: '140px' }}
          image={thumbnail}
          component='img'
          alt='Live from space album cover'
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
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
  )
}

const SongList: FC = () => {
  const { loading, error, data } = useSubscription<ISongData>(GET_SONGS)

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
        }}
      >
        <CircularProgress />
      </Box>
    )
  }

  if (error) {
    return <div>{`Error fetching songs: >>> ${error.message}`}</div>
  }

  return (
    <Box>
      {data && data.songs.map((song) => <SongCard key={song.id} song={song} />)}
    </Box>
  )
}

export default SongList
