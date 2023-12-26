# Galactus Agent

`Galactus Agent` is a child component of the `Galactus` project. The `Galactus Agent` is installed in an environment (Only Docker support at the moment) to export telemetry data to a managing `Galactus` instance. The managing `Galactus` node will also be able to trigger deployments on the remote host via the `Galactus Agent`.

This project consists of two independent components. The `Galactus Agent` written in Go which is a purely headless agent that can talk to the docker engine API in the host. The other is the `Galactus Agent Dashboard` for accessing some if not all capabilities of the `Galactus Agent`.


## Running the Galactus Agent and Dashboard Using Docker Compose


```yaml
version: "3.8"
services:
  agent:
    image: mubashiro/galactus-agent:main
    container_name: agent
    restart: unless-stopped
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock
    ports:
      - "7867:7867"
        #  if using windows use the one below
      # - //var/run/docker.sock:/var/run/docker.sock
  agent-dashboard:
    image: mubashiro/galactus-agent-dashboard:main
    container_name: dashboard
    restart: unless-stopped
    environment:
      GALACTUS_AGENT_API: "http://agent:7867"
    ports:
      - "3000:3000"
```

> This is "purely for fun" project and a WIP. Highly recommend [Portainer](https://www.portainer.io/) if you are after a working solution.
