import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from './Card';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [task, setTask] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

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
        setError(error.message);
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered input-info w-[600px] mt-5"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className='btn bg-blue-600 ml-3 text-white'>Add</button>
        </div>

        <div className='mt-5 flex justify-center'> 
          <div className='flex flex-wrap w-auto'>
            

            {data.length > 0 ? (
              data.map((item, index) => (
                <Card key={index} desc={item.content} />
              ))
            ) : (
              <p>No data available. 😔</p>
            )}

            
          </div>
        </div>

      </div>
    </>
  );
};

export default HomePage;
