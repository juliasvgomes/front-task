import axios from 'axios';

const buscaTarefas = async () => {
  try {
    const response = await axios.get('https://fullstack-ykmk.onrender.com/tasks/');
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default buscaTarefas;
