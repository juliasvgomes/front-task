import { useEffect, useState } from 'react';
import './App.css';
import deletaTarefaID from './DeletaTarefa';
import adicionarTarefa from './adiconarTarefas';
import buscaTarefas from './buscaTarefas';

function App() {
  const [lista, setLista] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    const resultado = async () => {
      try {
        const dados = await buscaTarefas();
        setLista(dados);
      } catch (error) {
        console.error('Erro ao buscar tarefas:', error);
      }
    };

    resultado();
  }, []);

  useEffect(() => {
    console.log(lista);
  }, [lista]);

  const handleDeletarTarefa = async (taskId) => {
    try {
      await deletaTarefaID(taskId);
      const novaLista = lista.filter((item) => item.id !== taskId);
      setLista(novaLista);
    } catch (error) {
      console.error('Erro ao deletar tarefa:', error);
    }
  };

  const handleCadastrarTarefa = async () => {
    try {
      await adicionarTarefa(novaTarefa.title, novaTarefa.description, novaTarefa.dueDate);
      const dadosAtualizados = await buscaTarefas();
      setLista(dadosAtualizados);
      // Limpar os campos do formulário após o cadastro
      setNovaTarefa({
        title: '',
        description: '',
        dueDate: '',
      });
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
    }
  };

  return (
    <div>
      <h1 className='titulo'>Gerenciando Minhas Tarefas</h1>
      <h4 className='subtitulo'>Adicione uma nova tarefa:</h4>
      <div className='formulariobody'>
        
        <form >
          <label className='formulario'><b>Nome Tarefa</b></label>
          <input
            className='formulario'
            type='text'
            name='tarefaname'
            value={novaTarefa.title}
            onChange={(e) => setNovaTarefa({ ...novaTarefa, title: e.target.value })}
          />
          <label className='formulario'><b>Descricao</b></label>
          <input
            className='formulario'
            type='text'
            name='tarefadescription'
            value={novaTarefa.description}
            onChange={(e) => setNovaTarefa({ ...novaTarefa, description: e.target.value })}
          />
          <label className='formulario'><b>Data</b></label>
          <input
            className='formulario'
            type='text'
            name='tarefadata'
            value={novaTarefa.dueDate}
            onChange={(e) => setNovaTarefa({ ...novaTarefa, dueDate: e.target.value })}
          />
          <button className='cadastrarButton' onClick={handleCadastrarTarefa}>
            Cadastrar
          </button>
        </form>
      </div>
      <h3 className='subtitulo'>Lista de tarefas</h3>
      <ul className='lista'>
        {lista.map((item) => (
          <div key={item.id} className='divlist'>
            <ul>
              <li><b>Tarefa:</b> {item.title}</li>
              <li><b>Descricao:</b> {item.description}</li>
              <li><b>Data de Cadastro:</b> {item.dueDate}</li>
            </ul>
            <button className='deletarButton' onClick={() => handleDeletarTarefa(item.id)}>
              Apagar
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default App;
