type ConstructorProps = {
  setRtcClient: (rtcClient: RtcClient) => void;
};

export class RtcClient {
  rtcPeerConnection: RTCPeerConnection;
  localPeerName: string;
  remortPeearName: string;
  private _setRtcClient: (rtcClient: RtcClient) => void;
  mediaStream: MediaStream | null;

  constructor({ setRtcClient }: ConstructorProps) {
    const config = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = '';
    this.remortPeearName = '';
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
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
}
