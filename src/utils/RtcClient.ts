type ConstructorProps = {
  setRtcClient: (rtcClient: RtcClient) => void;
};

export class RtcClient {
  rtcPeerConnection: RTCPeerConnection;
  localPeerName: string;
  remortPeearName: string;
  private _setRtcClient: (rtcClient: RtcClient) => void;

  constructor({ setRtcClient }: ConstructorProps) {
    const config = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = '';
    this.remortPeearName = '';
    this._setRtcClient = setRtcClient;
  }

  setRtcClient() {
    this._setRtcClient(this);
  }
}
