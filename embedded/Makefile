# NOTE: the ampy command actually uses a hardcoded serial port, you may need to tweak this
# depending on your PC hardware.  In the future someone should work out how to make this dynamic.

all: *.py python/venv ../net_protocol/build/python/OpenZapIt/*.py
	ls *.py | xargs -n 1 ./python/venv/bin/ampy --port /dev/ttyACM0 put
	# ./python/venv/bin/ampy --port /dev/ttyACM0 put ../net_protocol/build/python/OpenZapIt
	

python/venv:
	python -m venv python/venv
	cd python/venv && ./bin/pip install adafruit-ampy

list:
	./python/venv/bin/ampy --port /dev/ttyACM0 ls

run:
	./python/venv/bin/ampy --port /dev/ttyACM0 run main.py

clean:
	./python/venv/bin/ampy --port /dev/ttyACM0 ls | grep \.py | xargs -n 1 ./python/venv/bin/ampy --port /dev/ttyACM0 rm
	./python/venv/bin/ampy --port /dev/ttyACM0 ls /OpenZapIt | grep \.py | xargs -n 1 ./python/venv/bin/ampy --port /dev/ttyACM0 rm
	

