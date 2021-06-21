import { VFC } from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

export const Video: VFC<Props> = ({ isLocal, name, videoRef }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <video autoPlay muted={isLocal} ref={videoRef}></video>
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
