import { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';

const Context = createContext();

export const Provider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ by: 'id', order: 'asc' });
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState({});
  const [dialogContent, setDialogContent] = useState(null);
  const [dialogTitle, setDialogTitle] = useState("");

  const URL = 'https://todo-server-3q69.onrender.com'

  const dialogRef = useRef(null);
  const openDialog = (title, content) => {
    setDialogTitle(title);
    setDialogContent(content);
    dialogRef.current.showModal();
  };

  const closeDialog = () => {
    dialogRef.current.close();
  };
  const fetchTasks = async (page = 1, sortBy = 'id', order = 'asc') => {
    const res = await axios.get(`${URL}/api/tasks?page=${page}&sort_by=${sortBy}&order=${order}`, { withCredentials: true });
    const count = await axios.get(`${URL}/api/tasks/count`);
    setTasks(res.data);
    setTotal(count.data.total);
  };

  const checkAdmin = async () => {
    const res = await axios.get(`${URL}/api/is_admin`, { withCredentials: true });
    setIsAdmin(res.data.is_admin);
  };

  useEffect(() => {
    fetchTasks(page, sort.by, sort.order);
    checkAdmin();
  }, [page, sort]);

  return (
    <Context.Provider value={{
      tasks, setTasks,
      page, setPage,
      total,
      sort, setSort,
      isAdmin, setIsAdmin,
      fetchTasks, notification, setNotification,
      dialogContent, dialogRef, dialogTitle, closeDialog,
      openDialog
    }}>
      {children}
    </Context.Provider>
  );
};

export const useCtx = () => useContext(Context);
