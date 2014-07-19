.PHONY: test

all:
	npm start

test:
	NODE_PATH=./lib \
	DEV_LIB_CONFIG=test \
	./node_modules/mocha/bin/mocha \
		--recursive
