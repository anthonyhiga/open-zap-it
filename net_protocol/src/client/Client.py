#
#  Python Client
#
###########################################################
import socket

class Client:
  def __init__(self, host, port):
    self.host = host
    self.port = port
    self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    self.is_connected = False

  def _connect(self):
    if (not self.is_connected):
      self.client.connect(('127.0.0.1', 4001))
      self.is_connected = True

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
