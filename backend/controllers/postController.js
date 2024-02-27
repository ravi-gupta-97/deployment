import postModel from "../models/postModel.js";


// Api for creating a post for logged-In User

export const createPost = async (req, res, next) => {
    const { title, description } = req.body;
    try {
        if (!title || !description) {
            return res.status(400).json({ message: "All field are Required" });
        }
        const newPost = new postModel({ title, description, createdBy: req.user.id });

        const post = await newPost.save();
        if (post) {
            return res.status(201).json({ message: "post created successful" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}

//  Api for fetching all the post 

export const getAllPosts = async (req, res, next) => {
    try {
        let posts;
        posts = await postModel.find({}).sort({ createdAt: -1 }).populate('createdBy');
        if (posts) {
            return res.status(200).json(posts);
        }
    } catch (error) {
        console.log(error);
    }
}

// Api for deleting a post for Logged-In User

export const deletePost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const stats = await postModel.findByIdAndDelete(id);
        if (stats) {
            return res.status(200).json({ message: "post deleted successful" });
        } else {
            return res.status(400).json({ message: "unable to delete post" });
        }

    } catch (error) {
        console.log(error);
    }
}

// Api for fetch a post by its Id

export const getPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const post = await postModel.findById(id);
        if (post) {
            return res.status(200).json(post);
        } else {
            return res.status(404).json({ message: "post not available" });
        }

    } catch (error) {
        return res.status(500).json(error);
    }
}


// Api to edit a post by its Id

export const editPost = async (req, res, next) => {
    try {
        const id = req.params.id;
        const { title, description } = req.body;
        const editedPost = await postModel.findByIdAndUpdate(id, {
            $set: { title, description }
        }, {
            new: true
        });
        if (editedPost) {
            return res.status(200).json(editedPost);
        } else {
            return res.status(400).json({ message: "unable to save edited post" });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}