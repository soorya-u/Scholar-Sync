FROM ubuntu:latest

WORKDIR /app

RUN apt-get update && apt-get install -y \
  curl \
  git \
  build-essential \
  netcat-openbsd

RUN curl -sSf https://install.surrealdb.com | sh

RUN curl -LO https://go.dev/dl/go1.22.3.linux-amd64.tar.gz
RUN tar -C /usr/local -xzf go1.22.3.linux-amd64.tar.gz
RUN rm go1.22.3.linux-amd64.tar.gz

ENV PATH="/root/.surrealdb/bin:${PATH}"
ENV PATH="/usr/local/go/bin:${PATH}"
ENV GOPATH="/go"
ENV GOBIN="${GOPATH}/bin"

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o main .

RUN chmod +x init.sh

EXPOSE 7000

ENTRYPOINT [ "./init.sh" ]
