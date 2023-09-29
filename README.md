# Galactus Agent

`Galactus Agent` is a child component of the `Galactus` project. The `Galactus Agent` is installed in an environment (Only Docker support at the moment) to export telemetry data to a managing `Galactus` instance. The managing `Galactus` node will also be able to trigger deployments on the remote host via the `Galactus Agent`.

This project consists of two independent components. The `Galactus Agent` written in Go which is a purely headless agent that can talk to the docker engine API in the host. The other is the `Galactus Agent Dashboard` for accessing some if not all capabilities of the `Galactus Agent`.

> This is "purely for fun" project and a WIP. Highly recommend [Portainer](https://www.portainer.io/) if you are after a working solution.
