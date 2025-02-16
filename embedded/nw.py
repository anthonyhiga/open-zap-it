#
#  Client library
#

import socket
import _thread
import embedded_settings as es
import network
from time import sleep
from picozero import pico_temp_sensor, pico_led
import machine
import rp2
import sys

class Network:
  def connect(self):
    #Connect to WLAN
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(es.SSID, es.PASSWORD)
    while wlan.isconnected() == False:
        if rp2.bootsel_button() == 1:
            print('Exiting.')
            sys.exit()

        print('Waiting for connection...')
        sleep(0.5)

    ip = wlan.ifconfig()[0]
    print(f'Connected on {ip}')
    return ip

  def start(self):
    self.connect()
    self.client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    self.client.connect((es.HOST, es.PORT))

  def send(self, data):
    self.client.send(data)


  def on(self, method):
    data = s.recv(1024)
    # print('Received', repr(data))

