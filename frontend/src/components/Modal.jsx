import React from 'react';

const Modal = ({ modalToggle, closeModal, desc }) => {
    return (
        <>
            {modalToggle && (
                <div>
                    <p
                        className="z-50 fixed text-[30px] sm:text-[30px] cursor-pointer text-white right-4 sm:right-5 top-24"
                        onClick={closeModal}
                    >
                        ❌
                    </p>
                    <div className="fixed inset-0 bg-black opacity-50 z-40"></div>
                    <div className="fixed left-1/2 top-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl p-4 sm:p-2 bg-white w-[400px] sm:w-[400px] sm:h-[400px] overflow-y-auto opacity-90">
                        <h1 className="text-5xl font-bold pl-6 pt-6 text-blue-400">Todo</h1>
                        <div className="text-center rounded-lg max-w-md">
                            <p className="py-6 px-6">
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
