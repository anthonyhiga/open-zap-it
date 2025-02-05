/*
   Test command line to use with a server to verify connectivity
*/

import net from "net";
import {Builder} from "flatbuffers";
import {Event} from "./__generated__/event_generated";

var client = new net.Socket();
client.connect(4001, '127.0.0.1', () => {
  console.log('Connected');

  // Flatbuffer Example
  const builder = new Builder(1);
  Event.startEvent(builder);
  Event.addId(builder, 10);
  const event = Event.endEvent(builder);
  builder.finish(event);

  console.log('Sending message');
  console.log();
  const data = builder.asUint8Array();
  client.write(data);
});

client.on('data', function(data) {
  console.log('Received: ' + data);
  //client.destroy(); // kill client after server's response
});

client.on('close', function() {
  console.log('Connection closed');
});

