import axios from 'axios';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom';
import { signout } from '../store/userSlice';

const Navbar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loggedUser = useSelector((state) => state.user.loggedUser);

    // api request for Signing-Out for logged-user
    const handleLogout = async () => {
        const res = await axios.get(`http://localhost:8000/api/v1/auth/signout`, {
            withCredentials: true
        });
        if (res.status === 200) {
            dispatch(signout());
            navigate('/');
        }
    }
    return (
        <div className='bg-gray-100 sticky top-0 z-10'>
            <div className='flex items-center justify-between mx-20'>
                <NavLink to='/' > <span className='text-2xl text-red-700'>HomePage</span></NavLink>
                {loggedUser ? <>
                    <span className='text-2xl text-rose-900 font-bold'>hello {loggedUser.name}</span>
                    <NavLink to='/createpost'><button className='text-xl text-red-700'>Create Post</button></NavLink>
                    <button onClick={handleLogout} className='text-xl text-red-700'>SignOut</button> </>
                    : <NavLink to='/signin'><button className='text-xl text-red-700'>Sign In</button></NavLink>}
            </div>
        </div>
    )
}

export default Navbar
