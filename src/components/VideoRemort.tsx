import { VFC } from 'react';

import { Video } from './Video';
import { RtcClient } from '../utils/RtcClient';

type Props = {
  rtcClient: RtcClient;
};

export const VideoRemort: VFC<Props> = ({ rtcClient }) => {
  const videoRef = rtcClient.remortVideoRef;

  if (rtcClient.remortPeearName === '') return <></>;
  return (
    <Video
      isLocal={false}
      name={rtcClient.remortPeearName}
      rtcClient={rtcClient}
      videoRef={videoRef}
    />
  );
};
