import { VFC } from 'react';
import { IconButton } from '@material-ui/core';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';

type Props = {
  muted: boolean;
  setMuted: (...args: any) => any;
};

export const VolumeBottun: VFC<Props> = ({ muted, setMuted }) => {
  const Icon = muted ? VolumeOffIcon : VolumeUpIcon;
  return (
    <>
      <IconButton
        aria-label='switch mute'
        onClick={() => {
          setMuted((previousState: boolean) => !previousState);
        }}
      >
        <Icon />
      </IconButton>
    </>
  );
};
