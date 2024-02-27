import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
    const navigate = useNavigate();
    const loggedUser = useSelector((state) => state.user.loggedUser);

    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    });

    // handling data inputs by the user
    const handleChange = (e) => {
        setInputs((prev) => ({
            ...prev, [e.target.name]: e.target.value
        }))
    };

    // api request to create a POST
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`https://deployment-backend-1fgj.onrender.com/api/v1/post/create`, {
                title: inputs.title,
                description: inputs.description,
                createdBy: loggedUser._id
            }, {
                withCredentials: true
            });
            if (res.status === 201) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Navbar />
            <div className='w-full bg-gray-200 h-screen flex flex-col items-center'>
                <h2 className='text-3xl my-3 font-bold'>Create a Post</h2>
                <form onSubmit={handleSubmit} className='w-2/4 flex flex-col items-center justify-center'>
                    <div className='w-full'>
                        <label htmlFor="title" className='block w-2/4 my-2 text-2xl'>Title</label>
                        <input type='text' id='title' name='title' onChange={handleChange} className='block w-full' />
                    </div>
                    <div className='w-full'>

                        <label htmlFor="description" className='block  my-2 text-2xl'>Description</label>
                        <textarea rows='5' cols='20' id='description' name='description' onChange={handleChange} className='w-full' />
                    </div>
                    <button type='submit' className='block w-2/4 bg-red-500 rounded-r-lg text-xl font-bold text-red-900'>Post</button>
                </form>
            </div>
        </>
    )
}

export default CreatePost
