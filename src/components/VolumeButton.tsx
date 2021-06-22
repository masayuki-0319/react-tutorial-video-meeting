import { VFC } from 'react';
import { IconButton, makeStyles } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { RtcClient } from '../utils/RtcClient';

type Props = {
  muted: boolean;
  setMuted: (...args: any) => any;
  rtcClient: RtcClient;
  isLocal: boolean;
  refVolumeButton: React.RefObject<any>;
};

const useStyles = makeStyles({
  icon: {
    width: 38,
    height: 38,
  },
});

export const VolumeButton: VFC<Props> = ({
  muted,
  setMuted,
  rtcClient,
  isLocal,
  refVolumeButton,
}) => {
  const classes = useStyles();

  const Icon = muted ? VolumeOffIcon : VolumeUpIcon;

  return (
    <>
      <IconButton
        aria-label='switch mute'
        ref={refVolumeButton}
        onClick={() => {
          setMuted((previousState: boolean) => !previousState);

          if (isLocal === true) rtcClient.toggleAudio();
        }}
      >
        <Icon className={classes.icon} />
      </IconButton>
    </>
  );
};
