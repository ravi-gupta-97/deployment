
import axios from 'axios';
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom';

const Post = ({ post, fetchPosts }) => {
    const loggedUser = useSelector((state) => state.user.loggedUser);
    const auth = ((loggedUser._id === post.createdBy._id) ? true : false);

    // api request for deleting a post by its Id
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:8000/api/v1/post/delete/${post._id}`, {
                withCredentials: true
            });
            if (res.status === 200) {
                fetchPosts();
            }
        } catch (error) {
            console.log(error);
        }

    }
    return (
        <div className='w-2/4 h-60 relative m-2 border border-gray-600'>
            <div className='text-2xl text-center'>{post?.title}</div>
            <div className='text-xl m-2 h-36 overflow-y-scroll no-scrollbar'>{post?.description}</div>
            <div className='gont-bold mx-4 text-gray-500'>Posted By : {post?.createdBy.name}</div>
            {auth && <div className='absolute bottom-1 right-2'>
                <Link to={`/edit/${post._id}`}>
                    <button className='m-2 text-red-700'>edit</button>
                </Link>
                <button onClick={handleDelete} className='m-2 text-red-700'>delete</button>
            </div>}
        </div >
    )
}

export default Post
