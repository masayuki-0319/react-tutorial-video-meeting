import { Grid, makeStyles } from '@material-ui/core';
import { VFC } from 'react';
import { VideoLocal } from './VideoLocal';
import { VideoRemort } from './VideoRemort';
import { RtcClient } from '../utils/RtcClient';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

type Props = {
  rtcClient: RtcClient;
};

export const VideoAria: VFC<Props> = ({ rtcClient }) => {
  const classes = useStyles();

  if (rtcClient === null) return <></>;
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <VideoLocal rtcClient={rtcClient} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <VideoRemort rtcClient={rtcClient} />
        </Grid>
      </Grid>
    </div>
  );
};
