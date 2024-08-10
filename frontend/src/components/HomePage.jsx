import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/auth', {
        method: 'GET',
        credentials: 'include',
      });
      console.log(response)
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

  return (
    <>
      <div className='absolute font-black text-[30px] text-white left-[20px] top-[20px] block hover:cursor-pointer'>TODOLIST ✅</div>
      <div className='btn btn-error absolute text-[15px] text-white right-[20px] top-[20px] hover:cursor-pointer'>LOGOUT</div>
      <div className='bg-blue-500 w-full h-[90px]'></div>

      <h1 className='mt-[50px] font-black'>Dash-Board</h1>

      <button onClick={fetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Fetch Data'}
      </button>

      {error && <p>Error: {error}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}

    </>
  );
};

export default HomePage;
