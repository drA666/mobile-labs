import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

export const connect = async () => {
  enablePromise(true);
  // @ts-ignore
  const connection = await openDatabase({name: 'AppDatabase.db'});
  return connection;
};
