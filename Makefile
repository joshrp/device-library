.PHONY: test

export NODE_PATH=./lib

all:
	npm start

test:
	DEV_LIB_CONFIG=test \
	./node_modules/mocha/bin/mocha \
		--recursive

test-coverage:
	DEV_LIB_CONFIG=test \
	./node_modules/mocha/bin/mocha \
		--require blanket \
		--reporter mocha-lcov-reporter \
		--recursive | ./node_modules/coveralls/bin/coveralls.js
