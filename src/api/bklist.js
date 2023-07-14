import axios from "axios";

// get
const getTodos = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/todos`);
  return response.data;
};

// post
const addTodo = async (newTodo) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/todos`, newTodo);
};

// delete
const deleteTodo = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/todos/${id}`);
};

// switch
const switchTodo = async (payload) => {
  await axios.patch(`${process.env.REACT_APP_SERVER_URL}/todos/${payload.id}`, {
    isDone: payload.isDone,
  });
};

// update
const updateTodo = async (newTodo) => {
  await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/todos/${newTodo.id}`,
    newTodo
  );
};

export { getTodos, addTodo, deleteTodo, switchTodo, updateTodo };
