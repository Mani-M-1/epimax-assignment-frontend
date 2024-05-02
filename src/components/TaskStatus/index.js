import './index.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Oval } from 'react-loader-spinner'

const TaskStatus = () => {
    const [tasks, setTasks] = useState([]);


    const [isLoading, setIsLoading] = useState(false);

    const params = useParams()

    const navigate = useNavigate();

    const getAllTasks = async (searchValue) => {
        setIsLoading(true);

        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/task/user/${params.id}/find?search_q=${searchValue}`;
        console.log(apiUrl)
        console.log(searchValue)
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            console.log(data);
            setTasks(data.tasksArr)

            setIsLoading(false);
        }
    } 


    useEffect(() => {
        getAllTasks('');
    }, [])



    const LoadingCard = () => {
        return (
            <div className='task-status-page__loading-card'>
                <Oval
                    visible={true}
                    height="60"
                    width="60"
                    color="#4fa94d"
                    ariaLabel="oval-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>
        )
    }


    const TaskItem = (props) => {
        const {task} = props;
        const {_id, taskTitle, taskStatus} = task;


        const handleOnselectOption = async (taskId, selectedValue) => {
            
           
            setIsLoading(true);

            console.log(taskId, selectedValue)

            // api call
            const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/task/update-task/${taskId}`;
            const options = {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({userId: params.id,taskStatus: selectedValue})
            }


            const response = await fetch(apiUrl, options);
            const data = await response.json();

            if (response.ok) {
                console.log(data)

                setTasks(data.updatedTasksArr);

                setIsLoading(false);
            }

        }

        return (
            <li className='task-status-page__tasks-items'>
                <p className='task-status-page__task-title'>{taskTitle}</p>
                <select name="taskStatus" value={taskStatus} className='task-status-page__select-item' onChange={(event) => handleOnselectOption(_id, event.target.value)}>
                    <option value="todo">todo</option>
                    <option value="inProgress">inProgress</option>
                    <option value="done">done</option>
                </select>
            </li>
        )
    }


    const handleOnclickSubmit = () => {
        navigate('/');
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

            {
                isLoading 
                ? 
                <LoadingCard/>
                :
                
                <ul className='task-status-page__tasks-wrapper'>
                    {tasks.map(task => <TaskItem key={task._id} task={task}/>)}
                </ul>
            }

            <div className='task-status-page__submit-btn-wrapper'>
                <button type='button' className='task-status-page__submit-btn' onClick={handleOnclickSubmit}>
                    Submit 
                </button>
            </div>
        </div>
    )
}


export default TaskStatus;