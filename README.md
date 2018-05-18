# openfaas-api
This is a simple API built on OpenFaaS

# Installation

https://github.com/openfaas/workshop/blob/master/lab1.md

export OPENFAAS_URL=http://openfaas.endpoint.com:8080

faas-cli new --lang node hello-openfaas --prefix="eolszewski"
The --prefix parameter will update image: value in hello-openfaas.yml with a prefix which should be your Docker Hub account. For OpenFaaS this is image: functions/hello-openfaas and the parameter will be --prefix="functions".

faas-cli build -f ./hello-openfaas.yml
faas-cli push -f ./hello-openfaas.yml
faas-cli deploy -f ./hello-openfaas.yml

http://127.0.0.1:8080/function/hello-openfaas

echo | faas-cli invoke hello-openfaas
docker service logs -f hello-openfaas

managing multiple functions (stacking)

faas-cli new --lang python3 first
faas-cli new --lang python3 second --append=./first.yml
renaming as hygeine 
mv first.yml example.yml

building in parallel
faas-cli build -f ./example.yml --parallel=2

building only one
faas-cli build -f ./example.yml --filter=second

logging with stdout/stderr
sys.stderr.write("This should be an error message.\n")
return json.dumps({"Hello": "OpenFaaS"})

this makes the output invalid, need ot add this to yml to make it not break shit
environment:
  combine_output: false

chaining functions on the client
$ echo -n "" | faas-cli invoke nodeinfo | faas-cli invoke func_markdown

calling function from code
gateway_hostname = os.getenv("gateway_hostname", "gateway") # uses a default of "gateway" for when "gateway_hostname" is not set
test_sentence = "California is great, it's always sunny there."
r = requests.get("http://" + gateway_hostname + ":8080/function/sentimentanalysis", text= test_sentence)

example python file for calling a function from another one
```
import os
import requests
import sys

def handle(req):
    """handle a request to the function
    Args:
        req (str): request body
    """

    gateway_hostname = os.getenv("gateway_hostname", "gateway") # uses a default of "gateway" for when "gateway_hostname" is not set

    test_sentence = req

    r = requests.get("http://" + gateway_hostname + ":8080/function/sentimentanalysis", data= test_sentence)

    if r.status_code != 200:
        sys.exit("Error with sentimentanalysis, expected: %d, got: %d\n" % (200, r.status_code))

    result = r.json()
    if result["polarity"] > 0.45:
        return "That was probably positive"
    else:
        return "That was neutral or negative"
```

async function calling
echo -n "" | faas-cli invoke long-task
vs
echo -n "" | faas-cli invoke long-task --async

timeouts (add these to environment in yml file)
  sleep_duration: 10
  read_timeout: 5
  write_timeout: 5
  exec_timeout: 5

secrets
echo -n <auth_token> | docker secret create auth-token -
check that secret was created
docker secret inspect auth-token
add 'secrets' under environment
  secrets:
    - auth-token

retrieving secrets in python
with open("/run/secrets/auth-token","r") as authToken:  
  g = Github(authToken.read())

