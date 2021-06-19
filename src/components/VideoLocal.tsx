import { useRef, VFC, useEffect } from 'react';
import { Video } from './Video';

type Props = {
  name: string;
};

export const VideoLocal: VFC<Props> = ({ name }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = videoRef.current;

  useEffect(() => {
    if (currentVideoRef === null) return;

    const getMedia = async () => {
      const constraints = { audio: true, video: true };

      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia(
          constraints
        );
        currentVideoRef.srcObject = mediaStream;
      } catch (err) {
        console.error(err);
      }
    };

    getMedia();
  }, [currentVideoRef]);

  return <Video isLocal name={name} videoRef={videoRef} />;
};
