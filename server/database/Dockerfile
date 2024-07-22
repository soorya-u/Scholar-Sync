FROM ubuntu:latest

WORKDIR /app/data

RUN apt-get update && apt-get install -y curl 

RUN curl -sSf https://install.surrealdb.com | sh

ENV PATH="/root/.surrealdb/bin:${PATH}"

EXPOSE 8080
VOLUME [ "/data" ]

ENTRYPOINT [ "surreal", "start" ]
CMD [ "--bind", "0.0.0.0:8080", "file:data", "--log", "trace", "--auth", "--user", "root", "--pass", "root" ]