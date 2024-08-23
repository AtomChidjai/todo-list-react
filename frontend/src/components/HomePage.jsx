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
        const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/auth`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result);

      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchData();
  }, []);

  const taskHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/auth/post`, {
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

  const handleUpdate = (id, updatedContent) => {
    setData(prevData => prevData.map(task => task._id === id ? { ...task, content: updatedContent } : task));
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/auth/logout`, { method: 'POST', credentials: 'include' });
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
      <div className="relative bg-blue-500 w-full h-[90px] flex justify-between items-center px-6">
        <div className="font-black text-[30px] text-white hover:cursor-pointer">
          TODOLIST ✅
        </div>
        <button
          className="btn btn-error text-[15px] text-white hover:cursor-pointer"
          onClick={handleLogout}
        >
          LOGOUT
        </button>
      </div>

      <div className="mx-auto w-full px-6 py-8">
        <div className="text-center">
          <h1 className="font-bold text-[25px] mb-6">Todo-List Dash-Board</h1>
          <form onSubmit={taskHandler} className="flex justify-center items-center">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered input-info w-[600px] mr-3"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button type="submit" className="btn bg-blue-600 text-white">Add Task</button>
          </form>
        </div>

        <div className="mt-8 flex justify-center">
          <div className="flex flex-wrap justify-center gap-4 w-auto">
            {data.length > 0 ? (
              data.map((item) => (
                <Card
                  key={item._id}
                  desc={item.content}
                  id={item._id}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            ) : (
              <p className="text-gray-500 text-lg">No tasks available. 😔</p>
            )}
          </div>
        </div>
      </div>
    </>

  );
};

export default HomePage;
