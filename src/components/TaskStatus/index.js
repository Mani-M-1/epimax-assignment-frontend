import './index.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TaskStatus = () => {
    const [tasks, setTasks] = useState([]);

    const params = useParams()

    const navigate = useNavigate();

    const getAllTasks = async (searchValue) => {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/task/user/${params.id}/find?search_q=${searchValue}`;
        console.log(apiUrl)
        console.log(searchValue)
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
            setTasks(data.tasksArr)
        }
    } 


    useEffect(() => {
        getAllTasks('');
    }, [])


    const TaskItem = (props) => {
        const {task} = props;
        const {taskTitle, taskStatus} = task;

        return (
            <li className='task-status-page__tasks-items'>
                <p>{taskTitle}</p>
                <p>{taskStatus}</p>
            </li>
        )
    }

    return (
        <div className='task-status-page__bg-container'>
            <h2 className='task-status-page__main-heading'>
                My Tasks 
            </h2>

            <div>
                 <div className='task-list-page__search-and-add-btn-wrapper'>
                    <input className='task-list-page__search-input' type='search' placeholder='Search by Task Title' onChange={(event) => getAllTasks(event.target.value)} /> 
                </div>
            </div>

            <ul className='task-status-page__tasks-wrapper'>
                {tasks.map(task => <TaskItem key={task._id} task={task}/>)}
            </ul>
        </div>
    )
}


export default TaskStatus;