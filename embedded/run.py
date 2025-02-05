#!/usr/bin/python
#
#  This main.py file is specific to pico-w only hardware.  Please note that
#  this is deliberate because OpenZapIt requires WiFi to function.
#

import led
import time
import socket

def main():
  led.start()
  led.set_mode(led.Mode.ON)

  # Define server details
  #HOST = '127.0.0.1'  # The server's hostname or IP address
  #PORT = 4001 # The port used by the server

  #with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
  #  s.connect((HOST, PORT))

  #  while True:
  #    data = s.recv(1024)
  #    print('Received', repr(data))


  for i in range(15):
    time.sleep(2)
    led.set_mode(led.Mode.OFF)
    time.sleep(2)
    led.set_mode(led.Mode.ON)

  led.stop()
