import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const EditPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();

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

    // // api request to edit a POST
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(inputs);
            const res = await axios.put(`https://deployment-backend-1fgj.onrender.com/api/v1/post/${id}`, {
                title: inputs.title,
                description: inputs.description,
            }, {
                withCredentials: true
            });
            if (res.status === 200) {
                navigate('/');
            }
        } catch (error) {
            console.log(error);
        }
    }

    // api to fetch the data and make it available to edit
    useEffect(() => {
        (
            async () => {
                const res = await axios.get(`https://deployment-backend-1fgj.onrender.com/api/v1/post/${id}`, {
                    withCredentials: true
                });
                if (res.status === 200) {
                    console.log(res.data);
                    setInputs({
                        title: res?.data?.title,
                        description: res?.data?.description
                    })
                }
            }
        )()
    }, [id])
    return (
        <>
            <Navbar />
            <div className='w-full bg-gray-200 h-screen flex flex-col items-center'>
                <h2 className='text-3xl my-3 font-bold'>Edit the Post</h2>
                <form onSubmit={handleSubmit} className='w-2/4 flex flex-col items-center justify-center'>
                    <div className='w-full'>
                        <label htmlFor="title" className='block w-2/4 my-2 text-2xl'>Title</label>
                        <input type='text' id='title' name='title' onChange={handleChange} className='block w-full' value={inputs.title} />
                    </div>
                    <div className='w-full'>

                        <label htmlFor="description" className='block  my-2 text-2xl'>Description</label>
                        <textarea rows='5' cols='20' id='description' name='description' onChange={handleChange} className='w-full' value={inputs.description} />
                    </div>
                    <button type='submit' className='block w-2/4 bg-red-500 rounded-r-lg text-xl font-bold text-red-900'>Post</button>
                </form>
            </div>
        </>
    )
}

export default EditPage
