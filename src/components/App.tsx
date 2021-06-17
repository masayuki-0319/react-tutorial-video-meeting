import { useState, VFC } from 'react';
import { InputFormLocal } from './InputFormLocal';
import { InputFormRemort } from './InputFormRemort';

const getMedia = async () => {
  const constraints: MediaStreamConstraints = { audio: true, video: true };

  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (err) {
    console.error(err);
  }
};

getMedia();

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
    </>
  );
};

export default App;
