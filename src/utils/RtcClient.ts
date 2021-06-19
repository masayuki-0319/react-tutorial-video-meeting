export class RtcClient {
  rtcPeerConnection: RTCPeerConnection;
  localPeerName: string;
  remortPeearName: string;

  constructor() {
    const config = { iceServers: [{ urls: 'stun:stun.stunprotocol.org' }] };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.localPeerName = '';
    this.remortPeearName = '';
  }
}
