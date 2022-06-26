# Todo Backend API

This is a simple API to run a simple Todo list backend, it uses Redis as a database an a Node.js server to handle the request.

## Prerequisites

You must have installed docker to run this application.

## Run it

The backend API is a simple [Express.js](https://expressjs.com/) application with [Redis](https://redis.io/) as a database, code is stored in the `server` folder.
To run it you will need [docker](https://www.docker.com/products/docker-desktop/), once docker is installed just run the following command:

```bash
# Running in background
docker-compose up -d

# Or in verbose mode
docker-compose up
```

To stop the backend API simply run `docker-compose down`.

### Services

- `server`: the backend API available at `http://localhost:7878`
- `redis`: Redis database available at `redis://localhost:6379`
- `redis-commander`: A Redis web GUI to view the data in the Redis container, available at `http://localhost:8081`