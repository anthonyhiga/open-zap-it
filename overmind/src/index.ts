/********************************************************
 *
 * Overmind - Core Intelligence of the Tag-It System
 *
 ********************************************************/
const { mergeSchemas } = require("graphql-tools");
const { ApolloServer } = require("apollo-server-express");
import users from "./users";
import http from "http";
import express from "express";
const { ruruHTML } = require('ruru/server');
const { ready } = require("./models");
const net = require('net');
import {Socket} from "net";
import {ByteBuffer} from "flatbuffers";
import {Event} from "./net_protocol/OpenZapIt/event_generated";

/*
Flatbuffer Example
const builder = new Builder(1);
Event.startEvent(builder);
Event.addId(builder, 10);
const event = Event.endEvent(builder);
builder.finish(event);

console.log(event);
console.log(builder.asUint8Array());
*/

const WEB_PORT = 4000;
const TCP_PORT = 4001;

// let last_raw_connection_id  = 0;

// Before we allow the server to start, we first allow our databases to initialize
ready.then(() => {
  /*
   * Setup RAW TCP Messaging
   */
  const tcpserver = net.createServer((socket: Socket) => {
    socket.on('data', (data) => {
      console.log('GOT DATA!!!');
      console.log(data);
      const buffer = new ByteBuffer(data);
      console.log(buffer);

      const obj = Event.getRootAsEvent(buffer);
      console.log(obj.id());
      console.log(obj.sender());

      socket.write("Hello world!!");
    });
    socket.on('error', (err: Error) => {
      console.warn(err);
    });
  }).on('error', (err: Error) => {
    console.warn(err);
  });

  tcpserver.listen(TCP_PORT);

  /*
   * Setup WebSockets
   */
  const app = express();

  const server = new ApolloServer({
    subscriptions: {
      onConnect: () => {
      }
    },
    schema: mergeSchemas({
      schemas: [users.buildSchema()]
    })
  });

  server.applyMiddleware({ app });

  // Serve the GraphiQL IDE.
  app.get('/', (_req, res) => {
    res.type('html');
    res.end(ruruHTML({ endpoint: '/graphql' }));
  });

  const httpServer = http.createServer(app);
  server.installSubscriptionHandlers(httpServer);

  httpServer.listen(WEB_PORT, () => {
    console.log(`  Server ready at ${WEB_PORT}`);
  });
});

