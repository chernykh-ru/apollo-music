import React, { FC, useState } from 'react';
import { AddBoxOutlined, Link } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
} from '@mui/material';

const AddSong: FC = () => {
  const [dialog, setDialog] = useState<boolean>(false);

  function handleCloseDialog() {
    setDialog(false);
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px', px: '20px' }}>
      <Dialog sx={{ textAlign: 'center' }} open={dialog} onClose={handleCloseDialog}>
        <DialogTitle>Edit Song</DialogTitle>
        <DialogContent>
          <Box
            component='img'
            sx={{ width: '90%' }}
            src='https://i1.sndcdn.com/artworks-000363100305-ahk35r-t500x500.jpg'
            alt='song thumbnail'
          />
          <TextField margin='dense' variant='standard' name='title' label='Title' fullWidth />
          <TextField margin='dense' variant='standard' name='artist' label='Artist' fullWidth />
          <TextField margin='dense' variant='standard' name='thumbnail' label='Thumbnail' fullWidth />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color='secondary'>
            Cancel
          </Button>
          <Button onClick={() => {}} color='primary' variant='outlined'>
            Add Song
          </Button>
        </DialogActions>
      </Dialog>
      <TextField
        sx={(theme) => ({
          margin: theme.spacing(1),
        })}
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
        variant='contained'
        color='primary'
        endIcon={<AddBoxOutlined />}>
        ADD
      </Button>
    </Box>
  );
};

export default AddSong;
