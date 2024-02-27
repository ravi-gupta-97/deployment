import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);

    // api request to fetch all the posts for logged-in User
    const fetchPosts = async () => {
        try {
            const res = await axios.get(`http://localhost:8000/api/v1/post/posts`, {
                withCredentials: true
            });
            if (res.status === 200) {
                setPosts(res.data);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, [])


    return (
        <div className='w-full mt-4 p-2 flex flex-col items-center justify-center z-0'>
            {posts && posts.map((post, index) => (
                <Post key={index} post={post} fetchPosts={fetchPosts} />
            ))}
        </div>
    )
}

export default Posts
