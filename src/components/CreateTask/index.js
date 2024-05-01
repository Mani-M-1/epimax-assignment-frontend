import { useEffect, useState } from 'react';
import './index.css';
import { useNavigate } from 'react-router-dom';


const CreateTask = () => {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);


    const [taskTitle, setTaskTitle] = useState("");
    const [assignee, setAssignee] = useState("");


    const [isErr, setIsErr] = useState(false);


    const getAllUsers = async () => {
        const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        if (response.ok) {
            setUsers(data.usersArr);
        }
    }


    useEffect(() => {
        getAllUsers();
    }, [])

    const UserItem = (props) => {
        const {user} = props;
        const {_id, username} = user;

        return (
            <option value={_id} className='create-task-page__option-item'>
                {username}
            </option>
        )
    }

    const handleOnchange = (event) => {
        setTaskTitle(event.target.value);
    }
    
    const handleOnselect = (event) => {
        setAssignee(event.target.value);
    }


    const handleOnsubmit = async (event) => {
        event.preventDefault();

        console.log(taskTitle, assignee);

        if (taskTitle !== "" && assignee !== "") {
            const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/task/add-task`;
            const options = {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                // body: JSON.stringify(form)
                body: JSON.stringify({taskTitle, assigneeDetails: assignee})
            }

            const response = await fetch(apiUrl, options);
            const data = await response.json();

            if (response.ok) {
                console.log(data);

                navigate('/')
            }
        }
        else {
            setIsErr(true);

            setTimeout(() => {
                setIsErr(false);
            }, 2000)
        }

    }

    return (
        <div className='create-task-page__bg-container'>
            <h2 className='create-task-page__main-heading'>Enter Task Details</h2>
            {/* {console.log(form)} */}
            {console.log(taskTitle, assignee)}
            <form className='create-task-page__form-card' onSubmit={handleOnsubmit}>
                <label htmlFor='taskTitle' className='create-task-page__label-items'>
                    Task Title 
                </label>
                <input type='text' id='taskTitle' className='create-task-page__input-items' placeholder='Enter Task Title' name='taskTitle' value={taskTitle} onChange={handleOnchange}/>


                <label htmlFor='assignee' className='create-task-page__label-items'>
                    Assignee 
                </label>
                <select id="assignee" className='create-task-page__input-items' value={assignee}  onChange={handleOnselect}>
                    <option value="" className='create-task-page__option-item'>--Select User--</option>
                    {users.map(user => <UserItem key={user._id} user={user}/>)}
                </select>

                {
                    isErr 
                    && 
                    <p className='create-task-page__err-msg'>*Please Enter all fields!</p>
                }


                <button type='submit' className='create-task-page__submit-btn'>
                    Submit
                </button>
            </form>
        </div>
    )
}


export default CreateTask;