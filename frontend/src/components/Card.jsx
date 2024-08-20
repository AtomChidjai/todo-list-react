import React from 'react';

const Card = ({ desc, id, onDelete }) => {

  const TaskDeleteHandler = async () => {
    try {
      const response = await fetch(`/auth/del/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        onDelete(id);
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const TaskUpdateHandler = async () => {
    try {
      const response = await fetch(`/auth/update/${id}`, {
        method : 'PUT',
        headers : {
          'Content-Type' : 'application/json',
        }, 
        credentials : 'include',
      });
      if (response.ok) {
        
      }
    } catch (error) {
      console.log('Update Error : ', error)
    }
  };

  return (
    <div className="card bg-blue-500 text-white w-[400px] mr-5 mt-5">
      <div className="card-body">
        <div className='flex justify-between'>
          <h2 className="card-title">Todo</h2>
          <button className='btn btn-circle right-[30px]' onClick={TaskDeleteHandler}>❌</button>
        </div>
        <p>{desc}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-rounded">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
