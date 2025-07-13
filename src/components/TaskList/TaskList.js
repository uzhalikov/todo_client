import { useCtx } from '../../store/Context';
import TaskRow from '../TaskRow/TaskRow';
import './TaskList.css'

const TaskList = () => {
  const { tasks, total, page, setPage, sort, setSort, isAdmin } = useCtx();
  const totalPages = Math.ceil(total / 3);

  const toggleSort = (field) => {
    const order = sort.by === field && sort.order === 'asc' ? 'desc' : 'asc';
    setSort({ by: field, order });

    setPage(order === 'asc' ? totalPages : 1)
  };

  return (
    <div className='flex flex-column gap10'>
      <table>
        <thead>
          <tr>
            <th onClick={() => toggleSort('username')}>Имя</th>
            <th onClick={() => toggleSort('email')}>Email</th>
            <th>Задача</th>
            <th onClick={() => toggleSort('completed')}>Статус</th>
            {isAdmin ? <th>Сохранение</th> : ''}
            
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => <TaskRow key={task.id} task={task} />)}
        </tbody>
      </table>
      <div className='pagination flex gap5'>
        { total > 2 ? Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)} disabled={page === i + 1}>{i + 1}</button>
        )) : null}
      </div>
    </div>
  );
};

export default TaskList;
