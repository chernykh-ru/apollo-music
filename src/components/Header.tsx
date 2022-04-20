import React, { FC } from 'react';
import { Typography, Toolbar, AppBar } from '@mui/material';
import HeadsetTwoToneIcon from '@mui/icons-material/HeadsetTwoTone';

const Header: FC = () => {
  return (
    <AppBar color='primary' position='static' enableColorOnDark>
      <Toolbar>
        <HeadsetTwoToneIcon />
        <Typography
          sx={(theme) => ({
            marginLeft: theme.spacing(2),
          })}
          variant='h6'
          component='h1'>
          Apollo Music
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
