import React from 'react';

const Modal = ({ modalToggle, closeModal, desc }) => {
    return (
        <>
            {modalToggle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <div
                        className="absolute inset-0 bg-black opacity-50"
                        onClick={closeModal}
                    ></div>
                    <div className="relative z-50 w-[400px] sm:w-[400px] sm:h-[400px] bg-white rounded-2xl p-6 shadow-lg overflow-y-auto">
                        <p
                            className="absolute top-4 right-4 text-[30px] cursor-pointer text-white"
                            onClick={closeModal}
                        >
                            ❌
                        </p>
                        <h1 className="text-5xl font-bold text-blue-400 mb-4">Todo</h1>
                        <div className="max-h-[calc(100%-80px)] overflow-y-auto">
                            <p className="py-4 px-6 break-words">
                                {desc}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
