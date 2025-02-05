#
#
#
#
###############################################


import sys
sys.path.append('__generated__')

import threading
import socket
import flatbuffers
import time

import OpenZapIt.Event as Event



builder = flatbuffers.Builder(1024)
Event.Start(builder)
Event.AddId(builder, 20)
Event.AddSender(builder, 202)
event = Event.End(builder)
builder.Finish(event)

print(builder.Output())

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as client:
  client.connect(('127.0.0.1', 4001))
  def write_stuff():
    while True:
      client.sendall(builder.Output())
      time.sleep(10)

  def read_stuff():
    while True:
      data = client.recv(1024)
      print(data)


  rt = threading.Thread(target=read_stuff)
  wt = threading.Thread(target=write_stuff)

  rt.start()
  wt.start()

  rt.join()
  wt.join()

  print("DONE")


