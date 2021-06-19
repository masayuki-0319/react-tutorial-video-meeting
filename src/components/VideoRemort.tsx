import { VFC } from 'react';
import { Video } from './Video';

type Props = {
  name: string;
};

export const VideoRemort: VFC<Props> = ({ name }) => {
  const videoRef = null;
  return <Video isLocal={false} name={name} videoRef={videoRef} />;
};
