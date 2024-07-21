import React from 'react'

const LoginPage = () => {
  return (
    <>
        <div className='w-[500px] h-[500px] bg-blue-100 mx-auto my-auto'>
            <h1>Login Page</h1>
            <form>
                <label>Username</label>
                <input type="text" />
                <label>Password</label>
                <input type="password" />
            </form>
        </div>
    </>
  )
}

export default LoginPage