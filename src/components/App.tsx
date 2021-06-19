import { VFC } from 'react';
import { RtcClient } from '../utils/RtcClient';
import { InputFormLocal } from './InputFormLocal';
import { InputFormRemort } from './InputFormRemort';
import { VideoAria } from './VideoAria';

const App: VFC = () => {
  const rtcClient = new RtcClient();

  return (
    <>
      <InputFormLocal rtcClient={rtcClient} />
      <InputFormRemort rtcClient={rtcClient} />
      <VideoAria rtcClient={rtcClient} />
    </>
  );
};

export default App;
