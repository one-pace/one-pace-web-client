import React from 'react';

import s from './VideoPlayer.css';

interface Props {
  file?: string;
}

const VideoPlayer = (props: Props) => {
  return (
    <div className={s.root}>
      <div className={s.container}>
        <div>
          <video src={props.file} />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
