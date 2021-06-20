import { FirebaseSignallingClient } from './FirebaseSignallingClient';

type ConstructorProps = {
  setRtcClient: (rtcClient: RtcClient) => void;
  remortVideoRef: React.RefObject<HTMLVideoElement>;
};

export class RtcClient {
  rtcPeerConnection: RTCPeerConnection;
  firebaseSignallingClient: FirebaseSignallingClient;
  localPeerName: string;
  remortPeearName: string;
  private _setRtcClient: (rtcClient: RtcClient) => void;
  mediaStream: MediaStream | null;
  remortVideoRef: React.RefObject<HTMLVideoElement>;

  constructor({ setRtcClient, remortVideoRef }: ConstructorProps) {
    const config = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignallingClient = new FirebaseSignallingClient();
    this.localPeerName = '';
    this.remortPeearName = '';
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
    this.remortVideoRef = remortVideoRef;
  }

  setRtcClient() {
    this._setRtcClient(this);
  }

  async getUserMedia() {
    try {
      const constraints = { audio: true, video: true };
      this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (error) {
      console.error(error);
    }
  }

  async setMediaStream() {
    await this.getUserMedia();
    this.addTracks();

    this.setRtcClient();
  }

  private addTracks() {
    this.addAudioTrack();
    this.addVideoTrack();
  }

  private addAudioTrack() {
    const audioTack = this.mediaStream?.getAudioTracks()[0];
    this.rtcPeerConnection.addTrack(
      audioTack as MediaStreamTrack,
      this.mediaStream as MediaStream
    );
  }
  private addVideoTrack() {
    const videoTack = this.mediaStream?.getVideoTracks()[0];
    this.rtcPeerConnection.addTrack(
      videoTack as MediaStreamTrack,
      this.mediaStream as MediaStream
    );
  }

  startListening(localPeerName: string) {
    this.localPeerName = localPeerName;
    this.setRtcClient();

    this.firebaseSignallingClient.database
      .ref(localPeerName)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data);
      });
  }
}
