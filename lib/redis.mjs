import { createClient } from 'redis';
import { validateList, delay } from './utils.mjs';

const client = createClient({
  url: `redis://redis:6379`
});

client.on('error', (err) => console.log('Redis Client Error', err));

await client.connect();

export const getData = async () => {
  const data = await client.get('list');
  return validateList(JSON.parse(data));
}

export const addTask = async (task) => {
  const list = await getData();
  const todoList = new Set(list);
  todoList.add(task);
  const response = await client.set('list', JSON.stringify(Array.from(todoList)));

  if (response !== 'OK') {
    throw new Error(`we couldn't add it to the list!`);
  }

  return Array.from(todoList);
}

export const removeTask = async (task) => {
  const list = await getData();
  const todoList = new Set(list);
  todoList.delete(task);

  const response = await client.set('list', JSON.stringify(Array.from(todoList)));

  if (response !== 'OK') {
    throw new Error(`we couldn't deleted it from the list!`);
  }

  return  Array.from(todoList);
}

export default client;