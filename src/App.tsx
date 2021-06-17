import { VFC } from 'react';

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
  return <div>Hello, React!</div>;
};

export default App;
