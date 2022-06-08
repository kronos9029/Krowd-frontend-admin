import axios from 'axios';
import { useQuery } from 'react-query';
import { Todo } from '../@types/todo';

const getTodos = async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const { data } = await axios.get<Todo[]>(url);
  return data;
};

const useGetTodos = () => useQuery('get', getTodos);
export default useGetTodos;
