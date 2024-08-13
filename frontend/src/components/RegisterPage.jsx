import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        if (password !== confPassword) {
            setErrorMessage('password and confirm password is not matching')
            return;
        }
        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password
                }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Username has already been used');
            }

            navigate('/');

        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    return (
        <>
            <div className='flex h-screen'>
                <div className='absolute font-black text-[30px] left-[20px] top-[20px] block hover:cursor-pointer'>TODOLIST ✅</div>
                <div className='w-1/2 flex justify-center'>

                    <div className='w-[50%] my-auto'>

                        <div className='text-center mx-auto text-[30px] text-[#5e5e5e] mb-[30px] font-bold'>Sign Up</div>
                        <form onSubmit={submitHandler}>
                            <label className="input input-bordered flex items-center gap-2 w-[450px] mx-auto my-[30px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                                </svg>
                                <input
                                    type="text"
                                    className="grow"
                                    placeholder="Username"
                                    onChange={(e) => setUsername(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-[450px] mx-auto my-[30px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <input
                                    type="password"
                                    className="grow"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)} />
                            </label>
                            <label className="input input-bordered flex items-center gap-2 w-[450px] mx-auto my-[30px]">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    className="h-4 w-4 opacity-70">
                                    <path
                                        fillRule="evenodd"
                                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                                        clipRule="evenodd" />
                                </svg>
                                <input
                                    type="password"
                                    className="grow"
                                    placeholder="Confirm Password"
                                    onChange={(e) => setConfPassword(e.target.value)} />
                            </label>
                            <button className='flex btn btn-primary w-[450px] mx-auto text-[15px]'>Sign Up</button>
                            { errorMessage && <div className='text-red-400 text-center mt-3'>{errorMessage}</div> }
                        </form>
                        <div className='text-center mx-auto mt-[40px]'>Already have an acocout? <Link to='/' className="link link-info">Sign In</Link> </div>

                    </div>

                </div>
                <div className='w-1/2 bg-blue-400 w-[50%]'>
                    <img
                        src="https://img.freepik.com/free-photo/empty-sea-beach-background_74190-313.jpg?t=st=1723289221~exp=1723292821~hmac=2328f57d9eefbb58343bc3ed32b98c748bb800d72a7a732ea2f156ff5156450d&w=1380"
                        className='w-full h-full object-cover'
                    />
                </div>
            </div>
        </>
    )
}

export default RegisterPage