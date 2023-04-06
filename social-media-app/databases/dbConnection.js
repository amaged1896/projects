import mongoose from "mongoose";

export const dbConnection = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/social-media')
        .then(() => console.log('Database connection established'))
        .catch(err => console.error('Database Error!', err.message));
};

