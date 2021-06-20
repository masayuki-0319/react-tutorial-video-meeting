import { VFC } from 'react';
import { useRtcClent } from './hooks/useRtcClient';
import { InputForms } from './InputForms';
import { VideoAria } from './VideoAria';

const App: VFC = () => {
  const { rtcClient } = useRtcClent();

  if (rtcClient === null) return <></>;
  return (
    <>
      <InputForms rtcClient={rtcClient} />
      <VideoAria rtcClient={rtcClient} />
    </>
  );
};

export default App;
