import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      <div className='ml-5 bg-green-100 mr-5'>
        <h1 className='mt-[25px] font-bold text-[25px]'>Dash-Board</h1>
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered input-info w-full max-w-xs mt-5"
        />
        <button className='btn bg-blue-400 ml-3 text-white'>Add</button>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        
      </div>
    </>
  );
};

export default HomePage;
