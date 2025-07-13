import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import Login from './components/Login/Login';
import Dialog from './components/Dialog/Dialog';
import Notification from './components/Notification/Notification';
import { useCtx } from './store/Context';

function App() {
  const { notification, setNotification, dialogRef, dialogTitle, closeDialog, dialogContent, openDialog } = useCtx();

  return (
    <div className='container flex flex-column gap15'>
      <h1>ToDo List</h1>
      <Notification message={notification.message} type={notification.type} onHide={() => setNotification({})}/>
      <Dialog ref={dialogRef} title={dialogTitle} onClose={closeDialog}>{dialogContent}</Dialog>
      <section className='flex flex-columm gap15'>
        <button onClick={() => openDialog('', <Login/>)}>Личный кабинет</button>
        <button onClick={() => openDialog('Добавление задачи', <TaskForm/>)}>Добавить задачу</button>
      </section>
      <TaskList/>
    </div>
  );
}

export default App;