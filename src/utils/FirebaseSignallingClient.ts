import firebase from 'firebase';
import 'firebase/database';

export class FirebaseSignallingClient {
  database: firebase.database.Database;
  localPeerName: string;
  remortPeearName: string;

  constructor() {
    const {
      REACT_APP_FIREBASE_API_KEY,
      REACT_APP_FIREBASE_AUTH_DOMAIN,
      REACT_APP_FIREBASE_DATABASE_URL,
      REACT_APP_FIREBASE_PROJECT_ID,
      REACT_APP_FIREBASE_STORAGE_BUCKET,
      REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      REACT_APP_FIREBASE_APP_ID,
    } = process.env;

    const firebaseConfig = {
      apiKey: REACT_APP_FIREBASE_API_KEY,
      authDomain: REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: REACT_APP_FIREBASE_DATABASE_URL,
      projectId: REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: REACT_APP_FIREBASE_APP_ID,
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

  async sendCandidate(candidate: any) {
    await this.targetRef.set({
      type: 'candidate',
      sender: this.localPeerName,
      candidate,
    });
  }

  async remove(path: string) {
    await this.database.ref(path).remove();
  }
}
