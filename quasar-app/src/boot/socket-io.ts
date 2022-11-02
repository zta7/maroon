// import { boot } from 'quasar/wrappers';
import { Manager } from 'socket.io-client';
import { useAppStore } from 'src/stores/app';

const $app = useAppStore();
const manager = new Manager('http://127.0.0.1:4446', {
  reconnectionDelayMax: 10000,
});
export const socket = manager.socket('/db');

// manager events
manager.on('error', () => {
  console.log('manager error');
});
manager.on('ping', () => {
  console.log('manager ping');
});
manager.on('reconnect', () => {
  console.log('manager reconnected');
});
manager.on('reconnect_attempt', (attempt: number) => {
  console.log(`manager attempt ${attempt} time(s)`);
});
manager.on('reconnect_error', () => {
  console.log('manager reconnect_error');
});
manager.on('reconnect_failed', () => {
  console.log('manager reconnect_failed');
});

// socket events
socket.on('connect', () => {
  console.log('socket connected');
});
socket.on('disconnect', () => {
  console.log('socket disconnect');
});
socket.on('connect_error', (err) => {
  console.log(`socket connect_error ${err}`);
});
