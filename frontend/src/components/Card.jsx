import React from 'react'

const Card = ({ key, desc = 'No description available', id }) => {

    const TaskDeleteHandler = async () => {
      try {
        const response = await fetch(`/auth/del/${taskId}`, {
            method : 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              taskId : id,
            }),
            credentials : 'include',
          }
        );

      } catch (error) {
        console.log(error.message);
      }
    }; 

    return (
      <>
        <div className="card bg-blue-500 text-white w-[400px] mr-5 mt-5">
          <div className="card-body">
            <div className='flex justify-between'>
              <h2 className="card-title">Todo</h2>
              <button className='btn btn-circle right-[30px]' onClick={TaskDeleteHandler}>❌</button>
            </div>
            <p>{desc} / {id}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-circle">✍️</button>
            </div>
          </div>
        </div>
      </>
    );
  };
  

export default Card