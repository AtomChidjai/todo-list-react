import React from 'react';
import Modal from './Modal';
import InputModal from './InputModal';
import { useState } from 'react';

const Card = ({ desc, id, onDelete, onUpdate }) => {

  const [modalToggle, setModalToggle] = useState(false);

  const openModal = () => {
    setModalToggle(true);
  };

  const closeModal = () => {
    setModalToggle(false);
  };

  const [InputModalToggle, setInputModalToggle] = useState(false);

  const openInputModal = () => {
    setInputModalToggle(true);
  };

  const closeInputModal = () => {
    setInputModalToggle(false);
  };

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

  return (
    <>
      <Modal modalToggle={modalToggle} closeModal={closeModal} desc={desc}/>
      <InputModal InputModalToggle={InputModalToggle} closeInputModal={closeInputModal} onUpdate={onUpdate} id={id}/>
      <div className="card bg-blue-500 text-white w-[400px] h-[200px] mr-5 mt-5 rounded-lg shadow-lg">
        <div className="card-body flex flex-col justify-between">
          <div className='flex justify-between items-center'>
            <h2 className="card-title text-lg font-bold">Todo</h2>
            <button
              className='btn btn-circle btn-sm text-red-500 bg-white hover:bg-red-500 hover:text-white border-none'
              onClick={TaskDeleteHandler}>
              ❌
            </button>
          </div>
          <p className='w-[280px] truncate mt-2 text-sm'>
            {desc}
          </p>
          <div className="card-actions justify-between mt-4">
            <button
              className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-blue-500 rounded-full"
              onClick={openModal}
              >
              Read more
            </button>
            <button
              className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-blue-500 rounded-full w-[75px]"
              onClick={openInputModal}
              >
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;
