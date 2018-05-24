# openfaas-api
This is a simple API built on OpenFaaS with testing in Travis using Chakram

# Setup

[This](https://github.com/openfaas/faas-cli) is a great place to get some background.

## Docker

If you don't already have docker installed, [install the community edition](https://docs.docker.com/install/).

You're also going to want to sign up and create a docker account. This will allow you to save configurations and store images in [docker hub](https://hub.docker.com/).

$$ OpenFaas

With Brew:

```
$ brew install that faas cli
```

With Curl:

```
$ curl -sSL https://cli.openfaas.com | sudo sh
```

## Using OpenFaas

You're going to need to create a docker swarm:

```
$ docker swarm init
```

And then deploy an alpine image stack to it:

```
$ sh ./deploy_stack.sh
```

To build our function(s) (assuming 4 cores), run:

```
$ faas-cli build --parallel 4 -f stack.yml
```

To push our function(s) to docker hub:

```
$ faas-cli push -f stack.yml
```

To deploy our function(s) to our swarm:

```
$ faas-cli deploy -f stack.yml
```

# Additional Reading

Additional information can be found in following [these labs](https://github.com/openfaas/workshop/blob/master/lab1.md) provided by the openfaas team.

# Contributing

If there are any problems or things that can be improved, please open an issue or create a pull request.
