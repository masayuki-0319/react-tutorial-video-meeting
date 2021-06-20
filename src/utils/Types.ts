export type SignallingData = {
  type: 'offer' | 'answer';
  sender: string;
  sessionDescription: any;
};
