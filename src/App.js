import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import TaskList from './components/TaskList'
import CreateTask from './components/CreateTask'
import TaskStatus from './components/TaskStatus'



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<TaskList/>} />
          <Route path='/add-task' element={<CreateTask/>} />
          <Route path='/user/:id' element={<TaskStatus/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
