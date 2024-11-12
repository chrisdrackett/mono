import { Client, Message, Server } from 'node-osc'

// Create an OSC client
const client = new Client('127.0.0.1', 12002);

// Create an OSC server
console.log('Creating OSC server')
const server = new Server(45450, '127.0.0.1');


console.log('getting connected devices...')
client.send(new Message('/serialosc/list', '127.0.0.1', 45450))

// notify on next add or remove
client.send(new Message('/serialosc/notify', '127.0.0.1', 45450))

// Handle incoming OSC messages
server.on('message', (msg) => {
  console.log(`Received OSC message: ${msg}`);

  if (msg[0] === '/serialosc/add' || msg[0] === '/serialosc/remove') {
    console.log('asking for next change...')
    client.send(new Message('/serialosc/notify', '127.0.0.1', 45450))
  }
})

// Function to send an OSC message
const sendOscMessage = (address: string, ...args: any[]) => {
  client.send(new nodeOsc.Message(address, ...args), (err) => {
    if (err) console.error('Error sending OSC message:', err);
  });
}

export { client, server, sendOscMessage };


// import monodeInit from 'monode';
// import loudness from 'loudness';

// const monode = monodeInit();

// let currentPosition = [0, 0]

// monode.on('device', (device) => {
//   console.log('device', device);

//   device.on('enc', (n, delta) => {
//     currentPosition[n] += delta

//     if (currentPosition[n] > 64) {
//       currentPosition[n] = 0
//     } else if (currentPosition[n] < 0) {
//       currentPosition[n] = 64
//     }

//     console.log(currentPosition)
//     device.osc.send(device.prefix + '/ring/all', n, 2);
//     device.level(n, currentPosition[n], 15);
//   });
// });



// 1024 steps on encoder
// 64 leds
// 16 levels per led

