import { VFC } from 'react';
import { InputFormLocal } from './InputFormLocal';
import { InputFormRemort } from './InputFormRemort';
import { RtcClient } from '../utils/RtcClient';

type Props = {
  rtcClient: RtcClient;
};

export const InputForms: VFC<Props> = ({ rtcClient }) => {
  return (
    <>
      <InputFormLocal rtcClient={rtcClient} />
      <InputFormRemort rtcClient={rtcClient} />
    </>
  );
};
