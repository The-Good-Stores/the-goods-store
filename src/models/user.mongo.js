const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        immutable: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 20,
        index: true,
    },
    email: {
        type: String,
        required: true,
        match: /.+\@.+\..+/,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100,
    },
}, {
    collection: "users",
    timestamps: true,
});

export default mongoose.model("User", userSchema)