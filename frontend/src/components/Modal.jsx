import React from 'react'

const Modal = ({ modalToggle, closeModal, desc }) => {
    return (
        <>
            {modalToggle &&
                <div>
                    <p className='z-50 fixed text-[30px] sm:text-[50px] hover:cursor-pointer text-white right-[10px] sm:right-[20px] top-[10px] sm:top-[20px]' onClick={closeModal}>❌</p>
                    <div className='fixed inset-0 bg-black opacity-50 z-40'></div>
                    <div className='w-[90%] sm:w-[800px] sm:h-[600px] bg-white fixed left-[50%] top-[50%] z-50 opacity-90 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl px-4 py-4 sm:px-2 '>
                        <div className='flex flex-col sm:flex-row w-full h-full'>
                            {desc}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default Modal