FROM golang:1.21 AS build-stage

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .


RUN CGO_ENABLED=0 GOOS=linux go build /app/cmd/agent/agent.go

FROM gcr.io/distroless/base-debian11 AS build-release-stage

WORKDIR /app

COPY --from=build-stage /app/agent ./agent
COPY --from=build-stage /app/config.yaml ./config.yaml
EXPOSE 7867

ENTRYPOINT ["./agent"]
