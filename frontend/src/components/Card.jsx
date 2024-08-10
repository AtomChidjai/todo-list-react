import React from 'react'

const Card = ({ key, desc = 'No description available' }) => {
    return (
      <>
        <div className="card bg-blue-500 text-white w-[400px] mr-5 mt-5">
          <div className="card-body">
            <h2 className="card-title">Todo</h2>
            <p>{desc}</p>
            <div className="card-actions justify-end">
              <button className="btn">Read More</button>
            </div>
          </div>
        </div>
      </>
    );
  };
  

export default Card