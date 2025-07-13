import { useState } from 'react';
import axios from 'axios';
import { useCtx } from '../../store/Context';


const Login = () => {
  const { closeDialog, setNotification, isAdmin, setIsAdmin, fetchTasks } = useCtx();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const URL = 'https://todo-server-3q69.onrender.com'

  const login = async () => {
    try {
      await axios.post(`${URL}/api/login`, { username, password }, { withCredentials: true });
      setIsAdmin(true);
      fetchTasks();
      setNotification({
        message: 'Вы успешно вошли в систему',
        type: 'success'
      });
    } catch {
      setNotification({
        message: 'Ошибка входа: неверные данные',
        type: 'error'
      });
    }
    finally{
      closeDialog()
    }
  };

  const logout = async () => {
    await axios.post(`${URL}/api/logout`, {}, { withCredentials: true });
    setIsAdmin(false);
    closeDialog();
    setNotification({
      message: 'Вы успешно вышли из системы',
      type: 'success'
    });
  };

  return (
      <div className='flex flex-column gap10'>
        <h3>Личный кабинет</h3>
        {isAdmin ? (
        <button onClick={logout}>Выйти</button>
      ) : (
        <div className='flex flex-column gap15'>
          <input placeholder="Логин" value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder="Пароль" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={login}>Войти</button>
        </div>
      )}
      </div>
  );
};

export default Login;
