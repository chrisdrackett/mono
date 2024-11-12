import { Client, Server } from 'node-osc'

// Create an OSC client
const client = new Client('127.0.0.1', 9000);

// Create an OSC server
const server = new Server(45450, '127.0.0.1');

// Handle incoming OSC messages
server.on('message', (msg) => {
  console.log(`Received OSC message: ${msg}`);
});

// Function to send an OSC message
const sendOscMessage = (address: string, ...args: any[]) => {
  client.send(new nodeOsc.Message(address, ...args), (err) => {
    if (err) console.error('Error sending OSC message:', err);
  });
};

export { client, server, sendOscMessage };
