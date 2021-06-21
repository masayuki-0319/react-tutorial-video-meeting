import { VFC, useRef } from 'react';
import { useDimensions } from './hooks/useDimentions';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@material-ui/core';

type Props = {
  isLocal: boolean;
  name: string;
  videoRef: React.RefObject<HTMLVideoElement> | null;
};

export const Video: VFC<Props> = ({ isLocal, name, videoRef }) => {
  const refCard = useRef(null);
  const { dimensions } = useDimensions(refCard);

  return (
    <Card ref={refCard}>
      <CardActionArea>
        <video
          autoPlay
          muted={isLocal}
          ref={videoRef}
          width={dimensions.width}
        ></video>
        <CardContent>
          <Typography gutterBottom variant='h5' component='h2'>
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions></CardActions>
    </Card>
  );
};
