import { useMutation } from '@apollo/client'
import { Delete } from '@mui/icons-material'
import {
  Avatar,
  Box,
  IconButton,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material'
import React, { FC } from 'react'
import { ADD_OR_REMOVE_FROM_QUEUE } from '../graphql/mutations'
import { ISong } from '../types'
// import { ISongProps } from './SongList'

// const songDummyData = {
//   artist: 'Rook1e',
//   duration: 103,
//   id: '4c0c0901-9317-44b6-ab81-9ae159e83df1',
//   thumbnail: 'https://i1.sndcdn.com/artworks-000420225600-nnpr1a-t500x500.jpg',
//   title: 'grape soda',
//   url: 'https://soundcloud.com/byrook1e/grapesoda',
// }

export interface IQueudSongProps {
  song: ISong
}

export interface IQueuedSongListProps {
  queue: ISong[] | undefined
}

const QueudSong: FC<IQueudSongProps> = ({ song }) => {
  const [addOrRemoveFromQueue] = useMutation(ADD_OR_REMOVE_FROM_QUEUE, {
    onCompleted: (data) => {
      localStorage.setItem('queue', JSON.stringify(data.addOrRemoveFromQueue))
    },
  })

  const { title, artist, thumbnail } = song

  const handleRemoveFromQueue = () => {
    addOrRemoveFromQueue({
      variables: {
        input: { ...song, __typename: 'Song' },
      },
    })
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridAutoFlow: 'column',
        gridTemplateColumns: '50px auto 50px',
        gap: '12px',
        alignItems: 'center',
        mt: '10px',
      }}
    >
      <Avatar
        sx={{ width: '44px', height: '44px' }}
        src={thumbnail}
        alt='Song thumbnail'
      />
      <Box sx={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <Typography
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          variant='subtitle2'
        >
          {title}
        </Typography>
        <Typography
          sx={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          variant='body2'
          color='textSecondary'
        >
          {artist}
        </Typography>
      </Box>
      <IconButton onClick={handleRemoveFromQueue}>
        <Delete color='error' />
      </IconButton>
    </Box>
  )
}

const QueuedSongList: FC<IQueuedSongListProps> = ({ queue = [] }) => {
  const greaterThanMd = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.up('md')
  )

  return greaterThanMd ? (
    <Box sx={{ m: '10px 0' }}>
      <Typography color='textSecondary' variant='button'>
        QUEUE ({queue.length})
      </Typography>
      {queue.map((s, i) => (
        <QueudSong key={i} song={s} />
      ))}
    </Box>
  ) : null
}

export default QueuedSongList
