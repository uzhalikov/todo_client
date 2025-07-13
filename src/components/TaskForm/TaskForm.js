import { useState } from 'react';
import axios from 'axios';
import { useCtx } from '../../store/Context';

const TaskForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [text, setText] = useState('');
  const { fetchTasks, setNotification, closeDialog } = useCtx();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:5000/api/tasks', { username, email, text });
      setUsername('');
      setEmail('');
      setText('');
      fetchTasks();
      setNotification({
        message: 'Задача добавлена',
        type: 'success'
      });
    } catch (e) {
      setNotification({
        message: e.response?.data?.error || 'Ошибка',
        type: 'error'
      });
    }
    finally{
      closeDialog();
    }
  };

  return (
      <div>
        <form onSubmit={submit} className='flex flex-column gap10'>
          <input 
            placeholder="Имя" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            required
          />
          <input 
            placeholder="Email" 
            type="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
          <input 
            placeholder="Задача" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
            required
          />
          <button type="submit">Добавить</button>
        </form>
      </div>
  );
};

export default TaskForm;
