import axios from 'axios';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signin } from '../store/userSlice';
import Navbar from '../components/Navbar';

const SignIn = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });

    // handling data inputs by the user
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    }

    // api request for signing-in for the registered user
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://deployment-backend-1fgj.onrender.com/api/v1/auth/signin`, inputs, {
                withCredentials: true
            });
            if (res.status === 200) {
                dispatch(signin(res.data.otherDetails));
                navigate('/');
            }
        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <><Navbar />
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="max-w-md w-full bg-white p-8 shadow-lg rounded-lg">
                    <h2 className="text-2xl text-center font-semibold text-gray-800 mb-6">Sign In</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email Address</label>
                            <input type="email" id="email" name="email" onChange={handleChange} className="form-input w-full border-gray-300 focus:outline-none" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input type="password" id="password" name="password" onChange={handleChange} className="form-input w-full border-gray-300 focus:outline-none" />
                        </div>
                        <div className="mt-6">
                            <button type="submit" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700">Sign In</button>
                        </div>
                        <div>
                            <p>Don't have an account?<Link to='/signup'> <span className='text-blue-500'>Register</span></Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SignIn
