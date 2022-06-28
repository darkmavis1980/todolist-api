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

## APIs

### REST Endpoints

These are the endpoints you can call via REST requests:

- `GET /todo` - returns the todo list
- `POST /todo` - Add a new task to the todo list
  ```bash
  curl --location --request POST 'localhost:7878/todo' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "task": "hello world"
  }'
  ```
- `DELETE /todo` - Delete a task from the todo list
  ```bash
  curl --location --request DELETE 'localhost:7878/todo/' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "task": "hello world"
  }'
  ```

### GraphQL endpoint

The same functionalities are available via a GraphQL endpoint which is accessible from http://localhost:7878/graphql.

**Fetching todo list**

```graphql
query {
  todo
}
```

Which outputs:

```json
{
  "data": {
    "todo": [
      "hello",
      "helloWorld"
    ]
  }
}
```

**Adding a task**

Variables:

```json
{
  "task": "hello steve"
}
```

Mutation:

```graphql
mutation AddTask($task: String){
  addTask(task: $task) {
    todo
  }
}
```

Output:

```json
{
  "data": {
    "addTask": {
      "todo": [
        "hello",
        "helloWorld",
        "hello steve"
      ]
    }
  }
}
```

**Delete a task**

Variables:

```json
{
  "task": "hello steve"
}
```

Mutation:

```graphql
mutation DeleteTask($task: String){
  deleteTask(task: $task) {
    todo
  }
}
```

Output:

```json
{
  "data": {
    "deleteTask": {
      "todo": [
        "hello",
        "helloWorld"
      ]
    }
  }
}
```