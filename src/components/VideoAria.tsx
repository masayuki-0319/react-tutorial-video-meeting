import { Grid, makeStyles } from '@material-ui/core';
import { VFC } from 'react';
import { VideoLocal } from './VideoLocal';
// import { VideoRemort } from './VideoRemort';

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
  localPeerName: string;
  remortPeearName: string;
};

export const VideoAria: VFC<Props> = ({ localPeerName, remortPeearName }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <VideoLocal localPeerName={localPeerName} />
        </Grid>
        {/* <Grid item xs={12} sm={6}>
          <VideoRemort remortPeerName={remortPeearName} />
        </Grid> */}
      </Grid>
    </div>
  );
};
