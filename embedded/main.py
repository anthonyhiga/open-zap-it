#!/usr/bin/python
#

import picozero 
import run
import sys

#
# As a way to bypass issues w/ a malfunctioning main()
# We'll use GPIO22 (since it isn't connected to any alternate pin uses 
#

bypass = picozero.Button(22)

if bypass.is_pressed:
  print("Bypassing main() and exiting")
  sys.exit()

run.main()

