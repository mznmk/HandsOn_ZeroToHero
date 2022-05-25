const EventEmitter = require('events');
const celebrity = new EventEmitter();

process.on('exit', (code) => {
  console.log('Process exit event with code: ', code);
});

// // Subscribe to celebrity for Observer 1
// celebrity.on('race win', () => {
//   console.log('Congratulations! You are the best!');
// });

// // Subscribe to celebrity for Observer 2
// celebrity.on('race win', () => {
//   console.log('Boo! I could have better than that!');
// });

// // emit event
// celebrity.emit('race win');
// celebrity.emit('race lose');
// celebrity.emit('race win');

// Subscribe to celebrity for Observer 1
celebrity.on('race', (result) => {
  if (result === 'win') {
    console.log('Congratulations! You are the best!');
  }
});

// Subscribe to celebrity for Observer 2
celebrity.on('race', (result) => {
  if (result === 'win') {
    console.log('Boo! I could have better than that!');
  }
});

// emit event
celebrity.emit('race', 'win');
celebrity.emit('race', 'lose');
