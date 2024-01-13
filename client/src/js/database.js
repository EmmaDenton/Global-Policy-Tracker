import { openDB } from 'idb';

const initdb = async () => 
  openDB('policytracker', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('policytracker database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('policytracker database created');
    },
  });

export const putDb = async (content) => {
  console.log('PUT to the database');
  const jateDb = await openDB('policytracker', 1);
  const tx = jateDb.transaction('policytracker', 'readwrite');
  const store = tx.objectStore('policytracker');
  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

export const getDb = async () => {
  console.log('GET from the database');
  const jateDb = await openDB('policytracker', 1);
  const tx = jateDb.transaction('policytracker', 'readonly');
  const store = tx.objectStore('policytracker');
  const request = store.getAll();
  const result = await request;
  console.log('🚀 - data fetched from the database', result);
  return result;
};

initdb();
