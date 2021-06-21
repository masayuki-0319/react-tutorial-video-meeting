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

type Props = {
  isLocal: boolean;
  name: string;
  videoRef: React.RefObject<HTMLVideoElement> | null;
};

export const Video: VFC<Props> = ({ isLocal, name, videoRef }) => {
  const [muted, setMuted] = useState(true);
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
        <VolumeBottun muted={muted} setMuted={setMuted} />
      </CardActions>
    </Card>
  );
};
