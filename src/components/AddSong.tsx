import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { AddBoxOutlined, Link } from '@mui/icons-material'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material'
import ReactPlayer from 'react-player'
import { ApolloError, useMutation } from '@apollo/client'
import { ADD_SONG } from '../graphql/mutations'

interface IDefault_Song {
  duration: number
  title: string
  artist: string
  thumbnail: string
  url?: string
}

interface ISoundcloudSongData {
  duration: number
  title: string
  user: {
    username: string
  }
  artwork_url: string
}

interface IYoutubeVideoData {
  title: string
  video_id: string
  author: string
}
interface ISoundcloudPlayer {
  getCurrentSound: (data: any) => ISoundcloudSongData
}
interface IYoutubePlayer {
  getDuration: () => number
  getVideoData: () => IYoutubeVideoData
}

const DEFAULT_SONG = {
  duration: 0,
  title: '',
  artist: '',
  thumbnail: '',
}

const AddSong: FC = () => {
  const [addSong, { error }] = useMutation(ADD_SONG)
  const [dialog, setDialog] = useState<boolean>(false)
  const [playable, setPlayable] = useState<boolean>(false)
  const [url, setUrl] = useState<string>('')
  const [song, setSong] = useState<IDefault_Song>(DEFAULT_SONG)

  useEffect(() => {
    const isPlayable = ReactPlayer.canPlay(url)
    setPlayable(isPlayable)
  }, [url])

  const { title, artist, thumbnail } = song

  const handleChangeSong = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSong((prevSong) => ({
      ...prevSong,
      [name]: value,
    }))
  }

  const handleCloseDialog = () => {
    setDialog(false)
  }

  const handleEditSong = async ({ player }: { player: ReactPlayer }) => {
    //@ts-ignore //this rabbit hole is too deep (player.player.player)
    const nestedPlayer = player.player.player
    let songData = {} as IDefault_Song
    if (nestedPlayer.getVideoData) {
      songData = getYoutubeInfo(nestedPlayer)
    } else if (nestedPlayer.getCurrentSound) {
      songData = await getSoundcloudInfo(nestedPlayer)
    }
    setSong({ ...songData, url })
  }

  const getYoutubeInfo = (player: IYoutubePlayer) => {
    const duration = player.getDuration()
    const { title, video_id, author } = player.getVideoData()
    const thumbnail = `http://img.youtube.com/vi/${video_id}/0.jpg`
    return {
      duration,
      title,
      artist: author,
      thumbnail,
    }
  }

  const getSoundcloudInfo = (
    player: ISoundcloudPlayer
  ): Promise<IDefault_Song> => {
    return new Promise((resolve) => {
      player.getCurrentSound((songData: ISoundcloudSongData) => {
        if (songData) {
          resolve({
            duration: Number(songData.duration / 1000),
            title: songData.title,
            artist: songData.user.username,
            thumbnail: songData.artwork_url.replace('-large', '-t500x500'),
          })
        }
      })
    })
  }

  const handleAddSong = async () => {
    try {
      const { url, thumbnail, duration, title, artist } = song
      await addSong({
        variables: {
          url: url && url.length > 0 ? url : null,
          thumbnail: thumbnail && thumbnail.length > 0 ? thumbnail : null,
          duration: duration && duration > 0 ? duration : null,
          title: title && title.length > 0 ? title : null,
          artist: artist && artist.length > 0 ? artist : null,
        },
      })
      handleCloseDialog()
      setSong(DEFAULT_SONG)
      setUrl('')
    } catch (error) {
      if (error instanceof Error) {
        console.log('Error adding song: >>>', error.message)
      }
    }
  }

  const handleError = (field: string) => {
    if (error && error instanceof ApolloError) {
      const extensions = error.graphQLErrors[0].extensions as {
        path: string
        code: string
      }
      return extensions && extensions.path.includes(field)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
        px: '20px',
      }}
    >
      <Dialog
        sx={{ textAlign: 'center' }}
        open={dialog}
        onClose={handleCloseDialog}
      >
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <Box
            component='img'
            sx={{ width: '90%' }}
            src={thumbnail}
            alt='song thumbnail'
          />
          <TextField
            value={title}
            onChange={handleChangeSong}
            margin='dense'
            variant='standard'
            name='title'
            label='Title'
            fullWidth
            error={handleError('title')}
            helperText={handleError('title') && 'Fill out field'}
          />
          <TextField
            value={artist}
            onChange={handleChangeSong}
            margin='dense'
            variant='standard'
            name='artist'
            label='Artist'
            fullWidth
            error={handleError('artist')}
            helperText={handleError('artist') && 'Fill out field'}
          />
          <TextField
            value={thumbnail}
            onChange={handleChangeSong}
            margin='dense'
            variant='standard'
            name='thumbnail'
            label='Thumbnail'
            fullWidth
            error={handleError('thumbnail')}
            helperText={handleError('thumbnail') && 'Fill out field'}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={handleAddSong} color='primary' variant='outlined'>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        sx={(theme) => ({
          margin: theme.spacing(1),
        })}
        onChange={(event) => setUrl(event.target.value)}
        value={url}
        placeholder='Add Youtube or Soundcloud Url'
        fullWidth
        margin='normal'
        type='url'
        variant='standard'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <Link />
            </InputAdornment>
          ),
        }}
      />
      <Button
        sx={(theme) => ({
          margin: theme.spacing(1),
        })}
        onClick={() => setDialog(true)}
        disabled={!playable}
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}
      >
        ADD
      </Button>
      {/*
 // @ts-ignore */}
      <ReactPlayer url={url} hidden onReady={handleEditSong} />
    </Box>
  )
}

export default AddSong
