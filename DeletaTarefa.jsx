import axios from 'axios';

const deletaTarefaID = async (id) => {
  try {
    const response = await axios.delete(`https://fullstack-ykmk.onrender.com/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default deletaTarefaID;
