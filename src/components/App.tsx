import { VFC, useState, useReducer } from 'react';
import { RtcClient } from '../utils/RtcClient';
import { InputFormLocal } from './InputFormLocal';
import { InputFormRemort } from './InputFormRemort';
import { VideoAria } from './VideoAria';

const App: VFC = () => {
  const [rtcClient, _setRtcClient] = useState(new RtcClient());
  const [, forceRender] = useReducer((boolean: boolean) => !boolean, false);

  const setRtcClient = (rtcClient: RtcClient) => {
    _setRtcClient(rtcClient);
    forceRender();
  };

  return (
    <>
      <InputFormLocal rtcClient={rtcClient} setRtcClient={setRtcClient} />
      <InputFormRemort rtcClient={rtcClient} setRtcClient={setRtcClient} />
      <VideoAria rtcClient={rtcClient} />
    </>
  );
};

export default App;
