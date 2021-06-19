import { useState, VFC } from 'react';
import { InputFormLocal } from './InputFormLocal';
import { InputFormRemort } from './InputFormRemort';
import { VideoAria } from './VideoAria';

const App: VFC = () => {
  const [localPeerName, setLocalPeerName] = useState('');
  const [remortPeerName, setRemortPeerName] = useState('');

  return (
    <>
      <InputFormLocal
        localPeerName={localPeerName}
        setLocalPeerName={setLocalPeerName}
      />
      <InputFormRemort
        localPeerName={localPeerName}
        remortPeerName={remortPeerName}
        setRemortPeerName={setRemortPeerName}
      />
      <VideoAria
        localPeerName={localPeerName}
        remortPeearName={remortPeerName}
      />
    </>
  );
};

export default App;
