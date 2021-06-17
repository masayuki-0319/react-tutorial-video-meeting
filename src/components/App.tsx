import { VFC } from 'react';
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
  return (
    <>
      <InputFormLocal />
      <InputFormRemort />
    </>
  );
};

export default App;
