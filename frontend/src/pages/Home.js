
import { useDispatch, useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import Posts from '../components/Posts'
import DefaultHome from '../components/DefaultHome';
import axios from 'axios';
import { signin } from '../store/userSlice';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    console.log('home is called');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const loggedUser = useSelector((state) => state.user.loggedUser);

    // api request for fetching the logged-User with cookies
    const getLoggedUser = async () => {
        try {
            console.log('useeffect from home is called');
            const res = await axios.get(`http://localhost:8000/api/v1/auth/getloggeduser`, {
                withCredentials: true
            })
            if (res.status === 200) {
                return res.data;
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const fetchedLoggedUser = await getLoggedUser();
                if (fetchedLoggedUser) {
                    dispatch(signin(fetchedLoggedUser));
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [dispatch, navigate])

    return (
        <div >
            <Navbar />
            {!loggedUser && <DefaultHome />}
            {loggedUser && <Posts />}
        </div>
    )
}

export default Home
