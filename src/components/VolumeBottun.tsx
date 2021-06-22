import { VFC } from 'react';
import { IconButton } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import { RtcClient } from '../utils/RtcClient';

type Props = {
  muted: boolean;
  setMuted: (...args: any) => any;
  rtcClient: RtcClient;
  isLocal: boolean;
};

export const VolumeBottun: VFC<Props> = ({
  muted,
  setMuted,
  rtcClient,
  isLocal,
}) => {
  const Icon = muted ? VolumeOffIcon : VolumeUpIcon;
  return (
    <>
      <IconButton
        aria-label='switch mute'
        onClick={() => {
          setMuted((previousState: boolean) => !previousState);

          if (isLocal === true) rtcClient.toggleAudio();
        }}
      >
        <Icon />
      </IconButton>
    </>
  );
};
