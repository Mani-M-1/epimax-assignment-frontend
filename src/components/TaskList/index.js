import './index.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const TaskList = () => {

    const [task, setTask] = useState({todoTasks: [], inProgressTasks: [], doneTasks: []});


    const navigate = useNavigate();

    const handleOnclickAddTaskBtn = () => {
        navigate('/add-task');
    }


    const getAllTasks = async (searchValue) => {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/task/find?search_q=${searchValue}`;
        console.log(apiUrl)
        console.log(searchValue)
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            console.log(data);

            const todoArr = data.tasksArr.filter(task => task.taskStatus === 'todo');
            const inProgressArr = data.tasksArr.filter(task => task.taskStatus === 'inProgress');
            const doneArr = data.tasksArr.filter(task => task.taskStatus === 'done');

            setTask({
                todoTasks: todoArr,
                inProgressTasks: inProgressArr,
                doneTasks: doneArr
            })
        }
    } 


    useEffect(() => {
        getAllTasks('');
    }, [])

    const TaskItem = (props) => {

        const {task} = props;
        const {taskTitle, taskStatus, assigneeDetails} = task;

        return (
            <li className='task-list-page__task-items'>
                <p className='task-list-page__task-title'>{taskTitle}</p>
                {assigneeDetails && <Link to={`/user/${assigneeDetails._id}`} className='task-list-page__task-assignee'>{assigneeDetails.username}</Link>}
                <p className='task-list-page__task-status'>{taskStatus}</p>
            </li>
        )
    } 


    return (
        <div className='task-list-page__bg-container'>
            <h1 className='task-list-page__main-heading'>Tasks</h1>

            <div className='task-list-page__search-and-add-btn-wrapper'>
                <input className='task-list-page__search-input' type='search' placeholder='Search by Task Title' onChange={(event) => getAllTasks(event.target.value)} /> 
                <button type='button' className='task-list-page__add-btn' onClick={handleOnclickAddTaskBtn}>
                    Add +
                </button>
            </div>

            <div className='task-list-page__columns-wrapper'>
                {/* todo column  */}
                <div className='task-list-page__column-cards'>
                    <div className='task-list-page__task-count-and-column-title-wrapper todo-column'>
                        <p className='task-list-page__tasks-count'>
                            {task.todoTasks.length}
                        </p>
                        <h2 className='task-list-page__column-titles'>Todo</h2>
                    </div>

                    <ul className='task-list-page__task-wrappers'>
                        {task.todoTasks.map(task => <TaskItem key={task._id} task={task}/>)}
                    </ul>
                </div>


                {/* in-progress column  */}
                <div className='task-list-page__column-cards'>
                    <div className='task-list-page__task-count-and-column-title-wrapper in-progress-column'>
                        <p className='task-list-page__tasks-count'>
                            {task.inProgressTasks.length}
                        </p>
                        <h2 className='task-list-page__column-titles'>In Progress</h2>
                    </div>

                    <ul className='task-list-page__task-wrappers'>
                        {task.inProgressTasks.map(task => <TaskItem key={task._id} task={task}/>)}
                    </ul>
                </div>


                {/* done column  */}
                <div className='task-list-page__column-cards'>
                    <div className='task-list-page__task-count-and-column-title-wrapper done-column'>
                        <p className='task-list-page__tasks-count'>
                            {task.doneTasks.length}
                        </p>
                        <h2 className='task-list-page__column-titles'>Done</h2>
                    </div>

                    <ul className='task-list-page__task-wrappers'>
                        {task.doneTasks.map(task => <TaskItem key={task._id} task={task}/>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}


export default TaskList;