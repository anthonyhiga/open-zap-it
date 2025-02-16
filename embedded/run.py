#!/usr/bin/python
#
#  This main.py file is specific to pico-w only hardware.  Please note that
#  this is deliberate because OpenZapIt requires WiFi to function.
#

import led
import time
import socket
import nw

def main():
  led.start()
  led.set_mode(led.Mode.ON)

  network = nw.Network()
  network.start()

  for i in range(15):
    time.sleep(2)
    led.set_mode(led.Mode.OFF)
    time.sleep(2)
    led.set_mode(led.Mode.ON)

  led.stop()
