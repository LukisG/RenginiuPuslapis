import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="container">
        <div className="app-wrapper mt-5">
          <h1 className='form-success'>Prisijungta sekmingai!</h1>
          <button type="submit" className="btn btn-primary" onClick={() => navigate("/")}>Grizti atgal</button>
        </div>
      </div>
    </div>
  )
}

export default LoginSuccess