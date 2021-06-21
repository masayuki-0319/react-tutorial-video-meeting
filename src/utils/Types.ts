export type SignallingData = {
  type: 'offer' | 'answer' | 'candidate';
  sender: string;
  sessionDescription: any;
  candidate?: RTCIceCandidateInit;
};
