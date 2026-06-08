import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [
        {
            url: { type: String, required: true },
            alt: { type: String, default: "" }
        }
    ],
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    brand: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    rating: { 
        type: Number, 
        default: 0
     },
    isActive: {
        type: Boolean,
        default: true
    },
    slug: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product', productSchema)

export default Product