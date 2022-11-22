import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

/**Конфигурация firebase */
const firebaseConfig = {
  apiKey: 'AIzaSyBqjPqBPjWqtvh6souBRuNrWW1pTGsOYvc',
  authDomain: 'womanup-to-do-list.firebaseapp.com',
  projectId: 'womanup-to-do-list',
  storageBucket: 'womanup-to-do-list.appspot.com',
  messagingSenderId: '740944977308',
  appId: '1:740944977308:web:374d35fe1999179c183c59',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
