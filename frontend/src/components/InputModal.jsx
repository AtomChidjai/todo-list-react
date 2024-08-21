import React from 'react'
import { useState } from 'react';

const InputModal = ({ InputModalToggle, closeInputModal, onUpdate, id }) => {
    const [upContent, setUpContent] = useState('');
    
    const TaskUpdateHandler = async () => {
        try {
          const response = await fetch(`/auth/update/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: upContent }),
            credentials: 'include',
          });
          if (response.ok) {
            onUpdate(id, upContent);
          }
        } catch (error) {
          console.log('Update Error : ', error)
        }
      };
    
    return (
        <>
            {InputModalToggle &&
                <div>
                <p
                    className="z-50 fixed text-[30px] sm:text-[30px] cursor-pointer text-white right-4 sm:right-5 top-24"
                    onClick={closeInputModal}
                >
                    ❌
                </p>
                <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                <div className="fixed left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white w-[90%] sm:w-[700px] sm:h-[400px] rounded-2xl p-4 sm:p-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">Edit Task</h2>
                    <form onSubmit={TaskUpdateHandler} className="flex flex-col items-center space-y-4">
                        <textarea
                            type="text"
                            placeholder="Updated Content"
                            value={upContent}
                            onChange={(e) => setUpContent(e.target.value)}
                            className="textarea w-full sm:w-[600px] w-[600px] p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[200px] sm:w-[200px]"
                        />
                        <button className="btn btn-primary mt-4 w-[200px] text-[20px]">Edit</button>
                    </form>
                </div>
            </div>
            }
        </>
    )
}
export default InputModal