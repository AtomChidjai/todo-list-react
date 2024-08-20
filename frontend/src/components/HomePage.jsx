import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [task, setTask] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/auth', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);
        console.log('Response:', result);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const taskHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/auth/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: task }),
        credentials: 'include',
      });

      if (response.ok) {
        const newTask = await response.json();
        setData(prevData => [...prevData, newTask]);
        setTask('');
      } else {
        console.error('Failed to add task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDelete = (id) => {
    setData(prevData => prevData.filter(task => task._id !== id));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('/auth/logout', { method: 'POST', credentials: 'include' });
      if (response.ok) {
        navigate('/');
      } else {
        console.error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <div className='absolute font-black text-[30px] text-white left-[20px] top-[20px] block hover:cursor-pointer'>
        TODOLIST ✅
      </div>
      <div
        className='btn btn-error absolute text-[15px] text-white right-[20px] top-[20px] hover:cursor-pointer'
        onClick={handleLogout}
      >
        LOGOUT
      </div>
      <div className='bg-blue-500 w-full h-[90px]'></div>
      <div className='mx-auto w-full'>
        <div className='text-center'>
          <h1 className='mt-[25px] font-bold text-[25px]'>Dash-Board</h1>
          <form onSubmit={taskHandler}>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-[600px] mt-5"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit" className='btn bg-blue-600 ml-3 text-white'>Add</button>
          </form>
        </div>

        <div className='mt-5 flex justify-center'> 
          <div className='flex flex-wrap w-auto'>
            {data.length > 0 ? (
              data.map((item) => (
                <Card 
                  key={item._id} 
                  desc={item.content} 
                  id={item._id} 
                  onDelete={handleDelete} 
                />
              ))
            ) : (
              <p>No task available. 😔</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
