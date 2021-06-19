import { useRef, VFC, useEffect } from 'react';

type Props = {
  localPeerName: string;
};

export const VideoLocal: VFC<Props> = ({ localPeerName }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentVideoRef = videoRef.current;

  useEffect(() => {
    if (currentVideoRef === null) return;

    const getMedia = async () => {
      const constraints: MediaStreamConstraints = { audio: true, video: true };

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

  return <></>;
};
