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
import React, { FC, useContext, useEffect, useRef, useState } from 'react'
import { ISongContext, SongContext } from '../context'
import { ActionSong } from '../reduser'
import QueuedSongList from './QueuedSongList'
import { GET_QUEUED_SONGS } from '../graphql/queries'
import { ISong } from '../types'
import { Pause } from '@mui/icons-material'
import { useQuery } from '@apollo/client'
import ReactPlayer from 'react-player'
import { formatDuration } from '../helpers/formatDurations'

const SongPlayer: FC = () => {
  const { song, isPlaying, dispatch } = useContext(SongContext) as ISongContext
  const { id } = song
  const reactPlayerRef = useRef<ReactPlayer | null>(null)
  const { data } = useQuery<{ queue: ISong[] }>(GET_QUEUED_SONGS)
  const [played, setPlayed] = useState<number>(0)
  const [playedSeconds, setPlayedSeconds] = useState<number>(0)
  const [seeking, setSeeking] = useState<boolean>(false)
  const [positionInQueue, setPositionInQueue] = useState<number>(0)

  useEffect(() => {
    const songIndex = data?.queue.findIndex((song) => song.id === id)
    if (songIndex) {
      setPositionInQueue(songIndex)
    }
  }, [id, data])

  useEffect(() => {
    const nextSong = data?.queue[positionInQueue + 1]
    // if (played >= 0.98 && nextSong) {
    if (played === 1 && nextSong) {
      setPlayed(0)
      dispatch({ type: ActionSong.SetSong, payload: nextSong })
    }
  }, [data, positionInQueue, played, dispatch])

  const handleTogglePlay = () => {
    dispatch({ type: isPlaying ? ActionSong.PauseSong : ActionSong.PlaySong })
  }

  const handleProgressChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) {
      setPlayed(value[0])
    } else {
      setPlayed(value)
    }
  }

  const handleSeekMouseDown = () => {
    setSeeking(true)
  }

  const handleSeekMouseUp = () => {
    setSeeking(false)
    reactPlayerRef?.current?.seekTo(played)
  }

  const handlePlayPrevSong = () => {
    const prevSong = data?.queue[positionInQueue - 1]
    if (prevSong) {
      dispatch({ type: ActionSong.SetSong, payload: prevSong })
    }
  }

  const handlePlayNextSong = () => {
    const nextSong = data?.queue[positionInQueue + 1]
    if (nextSong) {
      dispatch({ type: ActionSong.SetSong, payload: nextSong })
    }
  }

  return (
    <>
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
            <IconButton onClick={handlePlayPrevSong} aria-label='previous'>
              <SkipPrevious />
            </IconButton>
            <IconButton onClick={handleTogglePlay} aria-label='play/pause'>
              {isPlaying ? (
                <Pause sx={{ height: 38, width: 38 }} />
              ) : (
                <PlayArrow sx={{ height: 38, width: 38 }} />
              )}
            </IconButton>
            <IconButton onClick={handlePlayNextSong} aria-label='next'>
              <SkipNext />
            </IconButton>
            <Typography
              variant='subtitle1'
              color='text.secondary'
              component='p'
            >
              {formatDuration(playedSeconds)}
            </Typography>
          </Box>
          <Slider
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onChange={handleProgressChange}
            value={played}
            sx={{ m: '10px' }}
            size='small'
            min={0}
            max={1}
            step={0.01}
            aria-label='slider'
          />
        </Box>
        <ReactPlayer
          ref={reactPlayerRef}
          onProgress={({ played, playedSeconds }) => {
            if (!seeking) {
              setPlayed(played)
              setPlayedSeconds(playedSeconds)
            }
          }}
          url={song.url}
          playing={isPlaying}
          hidden
        />
        <CardMedia
          component='img'
          // sx={{ objectFit: 'cover', width: '180px' }}
          sx={{ width: '150px' }}
          image={song.thumbnail}
          alt='Live from space album cover'
        />
      </Card>
      <QueuedSongList queue={data?.queue} />
    </>
  )
}

export default SongPlayer
