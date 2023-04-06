
import { postModel } from './../../../databases/models/post.model.js';

const addPost = async (req, res, next) => {
    const { authorId, title, content } = req.body;
    await postModel.insertMany({ authorId, title, content });
    res.json({ message: 'success' });
};

const getPost = async (req, res, next) => {
    const id = req.userId;
    let posts = await postModel.find({ authorId: id });
    res.json({ message: 'success', posts });
};
const getAllPost = async (req, res, next) => {
    let posts = await postModel.find();
    res.json({ message: 'success', posts });
};

const deletePost = async (req, res, next) => {
    const { id } = req.body;
    let deleted = await postModel.findByIdAndDelete({
        id: id,
        authorId: req.authorId
    });
    res.json({ message: 'success', deleted });
};

export {
    addPost,
    getPost,
    deletePost,
    getAllPost
};