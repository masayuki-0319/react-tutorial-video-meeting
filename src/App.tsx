import { VFC } from 'react';
import { Button } from '@material-ui/core';

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
    <Button color='primary' variant='contained'>
      Hello, World!
    </Button>
  );
};

export default App;
