TMPDIR=./tmp
DYNAMO_URL=http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest
DYNAMO_TGZ=${TMPDIR}/dynamodb.tar.gz
DYNAMO_PID=${TMPDIR}/dynamodb.pid

all:
	npm start

test: dynamodb-start mocha dynamodb-stop

clean:
	rm -rf ${TMPDIR}

${TMPDIR}:
	mkdir ${TMPDIR}

${DYNAMO_TGZ}: 
	curl ${DYNAMO_URL} -L -o ${DYNAMO_TGZ}

dynamodb-start: ${TMPDIR} ${DYNAMO_TGZ}
ifeq (,$(wildcard $(DYNAMO_PID)))
	tar zxf ${DYNAMO_TGZ}	-C ${TMPDIR}
	java 	-Djava.library.path=${TMPDIR}/DynamoDBLocal_lib \
				-jar ${TMPDIR}/DynamoDBLocal.jar & \
				echo "$$!" > "${DYNAMO_PID}"
endif

dynamodb-stop: ${TMPDIR}
ifneq (, $(wildcard ${DYNAMO_PID}))
	pkill -F ${DYNAMO_PID}
	rm ${DYNAMO_PID}
endif

mocha:
	NODE_PATH=./lib ./node_modules/mocha/bin/mocha ./lib/test/routes \
    --recursive \
    --require should
