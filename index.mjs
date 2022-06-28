import express from 'express';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { getData, addTask, removeTask } from './lib/redis.mjs';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/todo', async (req, res) => {
  // await delay(3000);// artificially add a delay to show the loading
  const todo = await getData();
  res.status(200).json({todo});
});

app.post('/todo', async (req, res) => {
  const { task } = req.body;
  try {
    if (!task) {
      throw new Error('you did not pass any task');
    }

    const todo = await addTask(task);

    res.status(200).json({todo});
  } catch (error) {
    console.log(error.message);
    res.status(500).end('something went wrong!');
  }
});

app.delete('/todo/', async (req, res) => {
  const { task } = req.body;
  try {
    if (!task) {
      throw new Error('you did not pass any task');
    }

    const todo = await removeTask(task);

    res.status(200).json({todo});
  } catch (error) {
    console.log(error.message);
    res.status(500).end('something went wrong!');
  }
});

/**
 * GraphQL Endpoint
 */
const schema = buildSchema(`
  type TodoList {
    todo: [String]
  }

  type Mutation {
    addTask(task: String): TodoList
    deleteTask(task: String): TodoList
  }
  type Query {
    todo(task: String): [String]
  }
`);

const rootValue = {
  todo: async () => {
    const todo = await getData();
    return todo;
  },
  addTask: async({task}) => {
    const todo = await addTask(task);
    console.log(todo);
    return {todo};
  },
  deleteTask: async ({task}) => {
    const todo = await removeTask(task);
    return {todo};
  }
};

app.use(
 '/graphql',
 graphqlHTTP({
   schema,
   rootValue,
   graphiql: true
 })
);

const { SERVER_PORT: port = 7878 } = process.env;

app.listen({ port }, () => {
  console.log(`🚀 Server ready at http://0.0.0.0:${port}`);
});
