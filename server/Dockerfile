FROM golang:1.23 AS builder

WORKDIR /app

ENV CGO_ENABLED=0 GOOS=linux

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -a -installsuffix cgo -o dist/main .

FROM alpine:3.20 AS prod

WORKDIR /app

RUN apk add --no-cache bash coreutils

COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /app/dist/main .
COPY --from=builder /app/database/init.surql ./database/init.surql

EXPOSE 7000

ENTRYPOINT ["/app/main"]