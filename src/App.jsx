import './App.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CssBaseline from '@mui/material/CssBaseline';
import AddTask from './components/addTask/AddTask';
import TaskList from './components/taskList/TaskList';
import Container from '@mui/material/Container';
import Task from './components/task/Task';
import { useReducer } from 'react';
import { TasksContext, TasksDispatchContext } from './utils/tasksContext';
import useLocalStorage from './utils/useLocalStorage';

export default function App() {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    JSON.parse(localStorage.getItem('tasks')) || []
  );
  const plannedTasks = tasks.filter(task => !task.done).sort((a, b) => a.date - b.date);
  const doneTasks = tasks.filter(task => task.done).sort((a, b) => b.date - a.date);

  useLocalStorage('tasks', tasks);

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        <CssBaseline />
        <Container
          sx={{
            p: '12px',
            pl: '0',
            ml: 'auto',
            mr: 'auto',
            width: '450px',
            height: '100vh',
            backgroundColor: 'white',
          }}
        >
          <AddTask />
          {
            plannedTasks.length > 0 &&
            <TaskList
              tasks={plannedTasks}
              status={'план'}
            >
              {plannedTasks.map(task => <Task
                key={task.id}
                task={task}
              />)}
            </TaskList>
          }
          {doneTasks.length > 0 &&
            <TaskList
              tasks={doneTasks}
              status={'готово'}
            >
              {doneTasks.map(task => <Task
                key={task.id}
                task={task}
              />)}
            </TaskList>
          }
        </Container>
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'added': {
      return [
        ...tasks,
        {
          id: action.id,
          text: action.text,
          done: false,
          date: Date.now()
        },
      ];
    }
    case 'changed': {
      return tasks.map(task => {
        if (task.id === action.task.id) {
          return action.task
        }
        else {
          return task;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(task => task.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
} 