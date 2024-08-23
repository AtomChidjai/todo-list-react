import React from 'react'
import { useState } from 'react';

const InputModal = ({ InputModalToggle, closeInputModal, onUpdate, id }) => {
    const [upContent, setUpContent] = useState('');

    const TaskUpdateHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_BACKEND_URL}/auth/update/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ content: upContent }),
                credentials: 'include',
            });
            if (response.ok) {
                onUpdate(id, upContent);
                closeInputModal();
            }

        } catch (error) {
            console.log('Update Error : ', error)
        }
    };

    return (
        <>
            {InputModalToggle &&
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={closeInputModal}
                    ></div>
                    <div className="relative z-50 w-[90%] sm:w-[600px] h-auto sm:h-[370px] bg-white rounded-2xl p-6 shadow-lg">
                        <p
                            className="absolute top-4 right-4 text-[30px] cursor-pointer text-gray-500"
                            onClick={closeInputModal}
                        >
                            ❌
                        </p>
                        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-blue-400">Edit Task</h2>
                        <form onSubmit={TaskUpdateHandler} className="flex flex-col items-center space-y-4">
                            <textarea
                                placeholder="Updated Content"
                                value={upContent}
                                onChange={(e) => setUpContent(e.target.value)}
                                className="textarea w-full sm:w-[500px] p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 h-[150px] sm:h-[200px] resize-none"
                            />
                            <button className="btn btn-primary mt-4 w-[150px] sm:w-[200px] text-[18px]">Edit</button>
                        </form>
                    </div>
                </div>

            }
        </>
    )
}
export default InputModal