import { PlayArrow, SkipNext, SkipPrevious } from '@mui/icons-material'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Slider,
  Typography,
} from '@mui/material'
import React, { FC, useContext } from 'react'
import { ISongContext, SongContext } from '../context'
import { ActionSong } from '../reduser'
import QueuedSongList from './QueuedSongList'
import { GET_QUEUED_SONGS } from '../graphql/queries'
import { ISong } from '../types'
import { Pause } from '@mui/icons-material'
import { useQuery } from '@apollo/client'

const SongPlayer: FC = () => {
  const { song, isPlaying, dispatch } = useContext(SongContext) as ISongContext
  const { data } = useQuery<{ queue: ISong[] }>(GET_QUEUED_SONGS)
  console.log('data', data)

  const handleTogglePlay = () => {
    dispatch({ type: isPlaying ? ActionSong.PauseSong : ActionSong.PlaySong })
  }

  return (
    <div>
      <Card
        sx={{ display: 'flex', justifyContent: 'space-between', mb: '20px' }}
        variant='outlined'
      >
        <Box
          sx={{ display: 'flex', flexDirection: 'column', padding: '0px 15px' }}
        >
          <CardContent sx={{ flex: '1 0 auto' }}>
            <Typography component='h3' variant='h5'>
              {song.title}
            </Typography>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='p'
            >
              {song.artist}
            </Typography>
          </CardContent>
          <Box
            sx={{ display: 'flex', alignItems: 'center', pl: 1, pr: 1, pb: 1 }}
          >
            <IconButton aria-label='previous'>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay} aria-label='play/pause'>
              {isPlaying ? (
                <Pause sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton aria-label='next'>
              <SkipNext />
            </IconButton>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='p'
            >
              00:01:27
            </Typography>
          </Box>
          <Slider
            sx={{ m: '10px' }}
            size='small'
            min={0}
            max={1}
            step={0.01}
            aria-label='slider'
          />
        </Box>
        <CardMedia
          component='img'
          sx={{ objectFit: 'cover', width: '180px' }}
          image={song.thumbnail}
          alt='Live from space album cover'
        />
      </Card>
      <QueuedSongList queue={data?.queue} />
    </div>
  )
}

export default SongPlayer
