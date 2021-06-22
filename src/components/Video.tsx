import { VFC, useRef, useState } from 'react';
import { useDimensions } from './hooks/useDimentions';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';
import { VolumeBottun } from './VolumeBottun';
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
        <VolumeBottun muted={muted} setMuted={setMuted} rtcClient={rtcClient} isLocal={isLocal} />
      </CardActions>
    </Card>
  );
};
