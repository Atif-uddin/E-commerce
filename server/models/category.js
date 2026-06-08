import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        default: ""
    },
    images: {
        type: [
            {
                url: { type: String, required: true },
                alt: { type: String, default: "" }
            }
        ],
        default: []
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

const Category = mongoose.model('Category', categorySchema)

export default Category