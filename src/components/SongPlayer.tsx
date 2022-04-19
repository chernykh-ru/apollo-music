import React, { FC } from 'react';
import QueuedSongList from './QueuedSongList';

const SongPlayer: FC = () => {
  return (
    <div>
      SongPlayer
      <QueuedSongList />
    </div>
  );
};

export default SongPlayer;
