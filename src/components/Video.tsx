import { VFC, useRef, useState } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

import { VolumeButton } from './VolumeButton';
import { useDimensions } from './hooks/useDimentions';
import { AudioAnalyser } from './AudioAnalyzer';
import { RtcClient } from '../utils/RtcClient';

type Props = {
  isLocal: boolean;
  name: string;
  rtcClient: RtcClient;
  videoRef: React.RefObject<HTMLVideoElement> | null;
};

export const Video: VFC<Props> = ({ isLocal, name, rtcClient, videoRef }) => {
  const [muted, setMuted] = useState(rtcClient.initialAudifMuted);
  const refCard = useRef(null);
  const { dimensions } = useDimensions(refCard);
  const refVolumeButton = useRef(null);
  const dimentionVolumeButton = useDimensions(refVolumeButton);

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay
          muted={isLocal || muted}
          ref={videoRef}
          width={dimensions.width}
        ></video>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <VolumeButton
          isLocal={isLocal}
          muted={muted}
          rtcClient={rtcClient}
          setMuted={setMuted}
          refVolumeButton={refVolumeButton}
        />
        {!muted && videoRef?.current && videoRef?.current.srcObject && (
          <AudioAnalyser
            audio={videoRef.current.srcObject}
            width={
              dimensions.width - dimentionVolumeButton.dimensions.width - 40
            }
          />
        )}
      </CardActions>
    </Card>
  );
};
