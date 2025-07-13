import { useState } from 'react';
import axios from 'axios';
import { useCtx } from '../../store/Context';
import './TaskRow.css';


const TaskRow = ({ task }) => {
  const { setIsAdmin, isAdmin, fetchTasks, setNotification } = useCtx();
  const [text, setText] = useState(task.text);
  const [completed, setCompleted] = useState(!!task.completed);

  const save = async () => {
    try {
      await axios.put(`http://127.0.0.1:5000/api/tasks/${task.id}`, {
        text, completed
      }, { withCredentials: true });
      fetchTasks();
      setNotification({
        message: 'Изменения сохранены',
        type: 'success'
      })
    } catch{
      setIsAdmin(false);
      setNotification({
        message: 'Необходима повторная авторизация',
        type: 'error'
      });
    }
  };

  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>
        {isAdmin
          ? <input value={text} onChange={e => setText(e.target.value)} />
          : <span>{task.text}</span>
        }
        {task.edited_by_admin ? <span className='change-mark'>Изменено</span> : null}
      </td>
      <td>
        {isAdmin
          ? <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
          : task.completed ? 'Выполнено' : 'Не выполнено'
        }
      </td>
      {isAdmin && <td><button title='Сохранить' className='save-button' onClick={save}>✅</button></td>}
    </tr>
  );
};

export default TaskRow;
