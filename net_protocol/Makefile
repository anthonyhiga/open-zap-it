
all: build/typescript/OpenZapIt/*.ts build/python/OpenZapIt build/typescript/OpenZapIt/*.js

build/typescript/OpenZapIt/*.ts: fbs/*.fbs
	flatc --ts -o build/typescript/OpenZapIt fbs/*.fbs

build/python/OpenZapIt: fbs/*.fbs src/client/*.py
	flatc -p -o build/python fbs/*.fbs
	cp -Rf src/client/* build/python/OpenZapIt

build/typescript/OpenZapIt/*.js: build/typescript/OpenZapIt/*.ts
	./node_modules/.bin/tsc build/typescript/OpenZapIt/*.ts

clean:
	rm -rf build

