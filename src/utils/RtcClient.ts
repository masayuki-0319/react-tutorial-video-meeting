import { FirebaseSignallingClient } from './FirebaseSignallingClient';
import { SignallingData } from './Types';

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

  addTracks() {
    this.addAudioTrack();
    this.addVideoTrack();
  }

  addAudioTrack() {
    const audioTack = this.mediaStream?.getAudioTracks()[0];
    this.rtcPeerConnection.addTrack(
      audioTack as MediaStreamTrack,
      this.mediaStream as MediaStream
    );
  }

  addVideoTrack() {
    const videoTack = this.mediaStream?.getVideoTracks()[0];
    this.rtcPeerConnection.addTrack(
      videoTack as MediaStreamTrack,
      this.mediaStream as MediaStream
    );
  }

  async offer() {
    const sessionDescription = await this.createOffer();
    await this.setLocalDescription(
      sessionDescription as RTCSessionDescriptionInit
    );

    await this.sendOffer();
  }

  async createOffer() {
    try {
      return await this.rtcPeerConnection.createOffer();
    } catch (error) {
      console.error(error);
    }
  }

  async sendOffer() {
    this.firebaseSignallingClient.setPeerNames(
      this.localPeerName,
      this.remortPeearName
    );
    await this.firebaseSignallingClient.sendOffer(this.localDescription);
  }

  async setLocalDescription(sessionDescription: RTCSessionDescriptionInit) {
    try {
      await this.rtcPeerConnection.setLocalDescription(sessionDescription);
    } catch (error) {
      console.error(error);
    }
  }

  setOnTrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (this.remortVideoRef.current === null) return;
      if (rtcTrackEvent.track.kind !== 'video') return;

      const remortMediaStream = rtcTrackEvent.streams[0];
      this.remortVideoRef.current.srcObject = remortMediaStream;
      this.setRtcClient();
    };

    this.setRtcClient();
  }

  async answer(sender: string, sessionDescription: any) {
    this.remortPeearName = sender;
    this.setOnicecandidateCallback();
    this.setOnTrack();
    await this.setRemoteDescription(sessionDescription);
    const answer = await this.rtcPeerConnection.createAnswer();
    this.rtcPeerConnection.setLocalDescription(answer);
    await this.sendAnswer();
  }

  async connect(remortPeerName: string) {
    this.remortPeearName = remortPeerName;
    this.setOnicecandidateCallback();
    this.setOnTrack();
    await this.offer();
    this.setRtcClient();
  }

  async setRemoteDescription(sessionDescription: any) {
    this.rtcPeerConnection.setRemoteDescription(sessionDescription);
  }

  async sendAnswer() {
    this.firebaseSignallingClient.setPeerNames(
      this.localDescription,
      this.remortPeearName
    );
    await this.firebaseSignallingClient.sendAnswer(this.localDescription);
  }

  get localDescription() {
    return this.rtcPeerConnection.localDescription?.toJSON();
  }

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        console.log(candidate);
      }
    };
  }

  startListening(localPeerName: string) {
    this.localPeerName = localPeerName;
    this.setRtcClient();

    this.firebaseSignallingClient.database
      .ref(localPeerName)
      .on('value', async (snapshot) => {
        const data = snapshot.val() as SignallingData | null;
        if (data === null) return;
        console.log('data: ', data);
        const { sender, type, sessionDescription } = data;

        switch (type) {
          case 'offer':
            await this.answer(sender, sessionDescription);
            break;
          default:
            break;
        }
      });
  }
}
