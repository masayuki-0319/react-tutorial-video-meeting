import firebase from 'firebase';
import 'firebase/database';

export class FirebaseSignallingClient {
  database: firebase.database.Database;
  localPeerName: string;
  remortPeearName: string;

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCyVgvfgHuxetkEoIr8VIhcniKDshhqcsk',
      authDomain: 'react-tutorial-video-meeting.firebaseapp.com',
      databaseURL:
        'https://react-tutorial-video-meeting-default-rtdb.firebaseio.com',
      projectId: 'react-tutorial-video-meeting',
      storageBucket: 'react-tutorial-video-meeting.appspot.com',
      messagingSenderId: '507256330844',
      appId: '1:507256330844:web:87060bbffa9977c0a5e499',
    };

    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
    this.database = firebase.database();
    this.localPeerName = '';
    this.remortPeearName = '';
  }

  setPeerNames(localPeerName: string, remortPeearName: string) {
    this.localPeerName = localPeerName;
    this.remortPeearName = remortPeearName;
  }

  get targetRef() {
    return this.database.ref(this.remortPeearName);
  }

  async sendOffer(sessionDescription: any) {
    await this.targetRef.set({
      type: 'offer',
      sender: this.localPeerName,
      sessionDescription,
    });
  }

  async sendAnswer(sessionDescription: any) {
    this.targetRef.set({
      type: 'answer',
      sender: this.localPeerName,
      sessionDescription,
    });
  }
}
