import { useMutation, useSubscription } from '@apollo/client'
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
import React, { FC, useContext, useEffect, useState } from 'react'
import { ISong, ISongData } from '../types'
import { GET_SONGS } from '../graphql/subscriptions'
import { ISongContext, SongContext } from '../context'
import { Pause } from '@mui/icons-material'
import { ActionSong } from '../reduser'
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations'

export interface ISongProps {
  song: ISong
}

const Song: FC<ISongProps> = ({ song: songProp }) => {
  const { song, isPlaying, dispatch } = useContext(SongContext) as ISongContext
  const [currentSongPlaying, setCurrentSongPlaying] = useState<boolean>(false)
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    },
  })
  const { title, artist, thumbnail, id } = songProp

  useEffect(() => {
    const isSongPlaying = isPlaying && id === song.id
    setCurrentSongPlaying(isSongPlaying)
  }, [id, song.id, isPlaying])

  const handleTogglePlay = () => {
    if (!currentSongPlaying) {
      dispatch({ type: ActionSong.PlaySong })
      dispatch({ type: ActionSong.SetSong, payload: songProp })
    }
    if (currentSongPlaying) {
      dispatch({ type: isPlaying ? ActionSong.PauseSong : ActionSong.PlaySong })
    }
    // dispatch({ type: ActionSong.SetSong, payload: songProp })
    // dispatch({ type: isPlaying ? ActionSong.PauseSong : ActionSong.PlaySong })
  }

  const handleAddOrRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: { ...songProp, __typename: 'Song' },
      },
    })
  }

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
            <IconButton onClick={handleTogglePlay} size='small' color='primary'>
              {currentSongPlaying ? (
                <Pause aria-label='play/pause' />
              ) : (
                <PlayArrow aria-label='play/pause' />
              )}
            </IconButton>
            <IconButton
              onClick={handleAddOrRemoveFromQueue}
              size='small'
              color='secondary'
            >
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
      {data && data.songs.map((song) => <Song key={song.id} song={song} />)}
    </Box>
  )
}

export default SongList
