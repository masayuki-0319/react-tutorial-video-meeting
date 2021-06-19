import { VFC } from 'react';

type Props = {
  isLocal: boolean;
  name: string;
  videoRef: React.RefObject<HTMLVideoElement> | null;
};

export const Video: VFC<Props> = ({ isLocal, name, videoRef }) => {
  return (
    <div>
      <video autoPlay muted={isLocal} ref={videoRef}></video>
      <div>{name}</div>
    </div>
  );
};
