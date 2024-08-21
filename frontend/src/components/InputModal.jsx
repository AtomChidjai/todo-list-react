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
                    <p className='z-50 fixed text-[30px] sm:text-[50px] hover:cursor-pointer text-white right-[10px] sm:right-[20px] top-[10px] sm:top-[20px]' onClick={closeInputModal}>❌</p>
                    <div className='fixed inset-0 bg-black opacity-50 z-40'></div>
                    <div className='w-[90%] sm:w-[800px] sm:h-[600px] bg-white fixed left-[50%] top-[50%] z-50 opacity-90 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl px-4 py-4 sm:px-2 '>
                        <form onSubmit={TaskUpdateHandler}>
                            <label>Updated Content</label>
                            <input 
                                type="text" 
                                placeholder='Updated Content'
                                value={upContent}
                                onChange={ (e) => setUpContent(e.target.value) }
                            />
                        </form>
                    </div>
                </div>
            }
        </>
    )
}
export default InputModal