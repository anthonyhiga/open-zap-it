import _thread
import machine
from time import sleep

class Mode:
  OFF = 0
  ON = 1
  BLINK_CONTINUOUS = 2
  EXIT = 500

led = machine.Pin("LED", machine.Pin.OUT)
led.off()

current_mode = Mode.OFF

def led_thread():
  global current_mode

  while True:
    if current_mode == Mode.EXIT:
      _thread.exit()
      break
    elif current_mode == Mode.OFF:
      led.off()
      while True:
        sleep(0.25)
        if current_mode != Mode.OFF:
          break
    elif current_mode == Mode.ON:
      led.on()
      while True:
        sleep(0.25)
        if current_mode != Mode.ON:
          break
    elif current_mode == Mode.BLINK_CONTINUOUS:
      while True:
        led.on()
        sleep(1)
        led.off()
        if current_mode != Mode.BLINK_CONTINUOUS:
          break
        sleep(1)
        if current_mode != Mode.BLINK_CONTINUOUS:
          break
    else:
      sleep(1)

def start():
  print("LED: start")
  _thread.start_new_thread(led_thread, ())

def set_mode(mode):
  global current_mode
  current_mode = mode

def stop():
  global current_mode
  current_mode = Mode.EXIT
  print("LED: stop")
