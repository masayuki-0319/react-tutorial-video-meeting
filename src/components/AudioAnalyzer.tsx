import { Component } from 'react';

import { AudioVisualiser } from './AudioVisualiser';

type Props = {
  audio: HTMLMediaElement['srcObject'];
  width: number;
};

type State = {
  audioData: Uint8Array;
};

export class AudioAnalyser extends Component<Props, State> {
  audioContext: AudioContext;
  analyser: AnalyserNode;
  dataArray: Uint8Array;
  source: MediaStreamAudioSourceNode;
  rafId: any;

  constructor(props: Props) {
    super(props);
    this.state = { audioData: new Uint8Array(0) };
    this.tick = this.tick.bind(this);
    this.audioContext = new window.AudioContext();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(
      this.props.audio as MediaStream
    );
    this.source.connect(this.analyser);
  }

  componentDidMount() {
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ audioData: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.rafId);
    this.analyser.disconnect();
    this.source.disconnect();
  }

  render() {
    return (
      <AudioVisualiser
        width={this.props.width}
        audioData={this.state.audioData}
      />
    );
  }
}
