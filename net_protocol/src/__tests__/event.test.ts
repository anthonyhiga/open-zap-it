/*
   Test command line to use with a server to verify connectivity
*/

import {describe, expect, test} from '@jest/globals';
import {Builder, ByteBuffer} from "flatbuffers";
import {Event} from "../__generated__/event_generated";


describe('Flatbuffer Event Tests', () => {
  test('Simple Event Creation', () => {
    // Flatbuffer Example
    const builder = new Builder(1);
    Event.startEvent(builder);
    Event.addId(builder, 10);
    const event = Event.endEvent(builder);
    builder.finish(event);

    expect(event).toBe(8);
  });

  test('Encode/Decode Event', () => {
    // Flatbuffer Example
    const builder = new Builder(1);
    Event.startEvent(builder);
    Event.addId(builder, 10);
    Event.addSender(builder, 100);
    const event = Event.endEvent(builder);
    builder.finish(event);

    let buf = builder.asUint8Array(); 
    let obj = Event.getRootAsEvent(new ByteBuffer(buf));

    expect(obj.id()).toBe(10);
    expect(obj.sender()).toBe(100);
  });
});

