import { useRef, VFC, useEffect } from 'react';
import { Video } from './Video';
import { RtcClient } from '../utils/RtcClient';

type Props = {
  rtcClient: RtcClient;
};

export const VideoLocal: VFC<Props> = ({ rtcClient }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = videoRef.current;
  const mediaStream = rtcClient.mediaStream;

  useEffect(() => {
    if (currentVideoRef === null) return;

    const getMedia = () => {
      try {
        currentVideoRef.srcObject = mediaStream;
      } catch (err) {
        console.error(err);
      }
    };

    getMedia();
  }, [currentVideoRef, mediaStream]);

  return (
    <Video
      isLocal
      name={rtcClient.localPeerName}
      videoRef={videoRef}
      rtcClient={rtcClient}
    />
  );
};
